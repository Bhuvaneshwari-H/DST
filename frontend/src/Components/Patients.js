import React, { useState, useEffect } from 'react';
import './Patient.css';
import { Button, Drawer, Table, TableHead, TableRow, TableCell, TableBody, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Popover, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddPatientForm from './AddPatientForm'; // Import AddPatientForm component
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SeverePatientsPopup from './SeverePatientsPopup'; // Import SeverePatientsPopup component


function Patients() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [patients, setpatients] = useState([]);
  const [editingpatient, setEditingpatient] = useState(null); // State to hold the data of the patient being edited
  const [showSeverePopup, setShowSeverePopup] = useState(false); // State to show the severe condition popup
  const [severePatients, setSeverePatients] = useState(""); // State to store the name of the severe patient
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false); // State to control delete confirmation dialog
  const [selectedPatient1, setSelectedPatient1] = useState(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isUpdateSuccessOpen, setIsUpdateSuccessOpen] = useState(false);
  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');

  //For Debugging Purpose
  const [doctorName, setDoctorName] = useState(""); 
  const [severePatientDescription, setSeverePatientDescription] = useState(""); // State to store the name of the severe patient
  const [severePatientName, setSeverePatientName] = useState(""); // State to store the name of the severe patient
  const [showDoctorField, setShowDoctorField] = useState(false); // State to manage the visibility of the doctor field
  const [patientName, setPatientName] = useState(""); 
  const [disease, setDisease] = useState(""); 
  const [showPatientNameField, setShowPatientNameField] = useState(false); 
  const [showDiseaseField, setShowDiseaseField] = useState(false);
  
  useEffect(() => {
    // Fetch data from the backend when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Make GET request to your backend API endpoint to fetch patients data
      const response = await axios.get('http://localhost:1337/patients');
      setpatients(response.data); // Set the fetched data to the state
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDeleteConfirmationOpen = (patient) => {
    setSelectedPatient1(patient);
    setIsDeleteConfirmationOpen(true);
  };

  //For debugging
  const handleUpdateSuccessClose = () => {
    setIsUpdateSuccessOpen(false);
  };

  //For debugging
  const handleDoctorFieldToggle = () => {
    setShowDoctorField(!showDoctorField);
  };

  //For debugging
  const handleDoctorNameChange = (event) => {
    setDoctorName(event.target.value);
  };

  //For debugging
  const handleSubmitDoctorName = async () => {
    try {
      if (doctorName.trim() === "") {
        // If doctorName is empty, fetch all patients
        await fetchData();
      } else {
        // Call the endpoint with the entered doctor's name
        const response = await axios.get(`http://localhost:1337/patients/getByDoctor?doctorName=${doctorName}`);
        setpatients(response.data);
      }
      // Reset the doctorName state after submitting
      setDoctorName("");
      // Hide the doctor field after submission
      setShowDoctorField(false);
    } catch (error) {
      console.error('Error fetching patients by doctor name:', error);
    }
  };
  

  // Function to handle closing confirmation dialog
  const handleDeleteConfirmationClose = () => {
    setSelectedPatient1(null);
    setIsDeleteConfirmationOpen(false);
  };

  const handleCloseSeverePopup = () => {
    setShowSeverePopup(false);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
    // Reset the editingpatient state when closing the drawer
    setEditingpatient(null);
  };

  const handleSubmitFilter = async () => {
    try {
      const endpoint = 'getByFilter';
      let queryParams = '';

      // Check if filterValue is not empty before adding it to queryParams
      if (filterValue) {
        queryParams = `filterType=${filterType}&filterValue=${filterValue}`;
      }

      const response = await axios.get(`http://localhost:1337/patients/${endpoint}?${queryParams}`);
      setpatients(response.data);
     
    } catch (error) {
      console.error('Error fetching patients by filter:', error);
    }
};

  

  const handleUpdateSubmit = async (data) => {
    try {
      console.log('Editing patient:', editingpatient);
      console.log('Updated data:', data);
  
      // If editingpatient exists, it means we're updating an existing patient
      const updatedpatient = { ...editingpatient, ...data };
  
      // Make PUT request to backend API to update the patient
      await axios.put(`http://localhost:1337/update1/${editingpatient.id}`, updatedpatient);
  
      // Update the patient object in the state with the new data
      setpatients(prevpatients =>
        prevpatients.map(patient =>
          patient.id === editingpatient.id ? updatedpatient : patient
        )
      );
      setIsUpdateSuccessOpen(true);
  
      toggleDrawer(); // Close the drawer after submission
    } catch (error) {
      console.error('Error updating patient:', error);
      // Handle error gracefully (e.g., display error message)
    }
  };
  
  const handleAddSubmit = async (data) => {
    try {
      // Make POST request to backend API to add a new patient
      const response = await axios.post('http://localhost:1337/add', data);
      setpatients([...patients, response.data]);
      
      setIsPopoverOpen(true);
      setTimeout(() => setIsPopoverOpen(false), 2000);
      toggleDrawer(); // Close the drawer after submission
    } catch (error) {
      console.error('Error adding patient:', error);
      alert('Error')
      // Handle error gracefully (e.g., display error message)
    }
  };


  const handleSeverePatientsClick = async () => {
    try {
      // Make GET request to your backend API endpoint to fetch severe patients
      const response = await axios.get('http://localhost:1337/patients/getSeverePatients');
      setShowSeverePopup(true); // Show the severe condition popup with severe patients data
      setSeverePatients(response.data); // Set severe patients data
    } catch (error) {
      console.error('Error fetching severe patients:', error);
    }
  };

  const handleFormSubmit = async (data) => {
    if (editingpatient) {
      await handleUpdateSubmit(data);
    } else {
      await handleAddSubmit(data);
    }
  };
  
  const handleEditClick = async (id) => {
    try {
      // Make a GET request to fetch the details of the patient with the given ID
      const response = await axios.get(`http://localhost:1337/patients/${id}`);
      const patientData = response.data;
      
      setEditingpatient(patientData);
      // Open the drawer
      setIsDrawerOpen(true);
      
      console.log('Editing patient with ID:', id);
      console.log('patient details:', patientData); // Print the entire row's data
    } catch (error) {
      console.error('Error fetching patient details:', error);
    }
  };
  
  const handleDeleteClick = async (id) => {
    try {
      // Make DELETE request to backend API to delete the patient
      await axios.delete(`http://localhost:1337/deletepatient/${id}`);
      // Update the patients state by filtering out the deleted patient
      setpatients(patients.filter((patient) => patient.id !== id));
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  const handleProfileClick = async (patient) => {
    // Set the selected patient
    setSelectedPatient(patient);
  };

  // Function to handle closing the profile dialog box
  const handleCloseProfileDialog = () => {
    setSelectedPatient(null);
  };

  const renderProfileViewDialog = () => {
    if (selectedPatient) {
      return (
        <Dialog open={!!selectedPatient} onClose={handleCloseProfileDialog}>
          <DialogTitle>{`${selectedPatient.name}'s Profile`}</DialogTitle>
          <DialogContent>
            {/* Display patient's details */}
            <p>{`Name: ${selectedPatient.name}`}</p>
            <p>{`Disease: ${selectedPatient.disease}`}</p>
            {/* Add more patient details here */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseProfileDialog} color="primary">Close</Button>
          </DialogActions>
        </Dialog>
      );
    }
    return null;
  };
 

  return (
    <div className="page-container" style={{position:'relative',fontWeight:'600',top:'-70px'}}>
      <div className="top-border"></div>
      <p style={{fontFamily: 'playfair-display-uniquifier', fontWeight: '500', fontSize: '25px',marginTop:'-90px'}}>PATIENTS</p>
      <hr className="horizontal-line"/>
      <div className="button-container">
  {/* Render doctor name field alongside the buttons */}
  <div style={{ marginRight: '350px',position:'relative' }}> {/* Adjust margin as needed */}
  <FormControl variant="outlined" style={{ marginRight: '10px' }}>
  <InputLabel id="filter-type-label">Select Filter Type</InputLabel>
  <Select
    labelId="filter-type-label"
    id="filter-type"
    value={filterType}
    onChange={(e) => setFilterType(e.target.value)}
    label="Select Filter Type"
    style={{ marginTop: '-15px', marginLeft: '-200px', position: 'fixed', marginBottom: '50px' }}
  >
    <MenuItem value="patientName">Patients Name</MenuItem>
    <MenuItem value="disease">disease</MenuItem>
    <MenuItem value="doctorName">Familydoctor</MenuItem>
  </Select>
</FormControl>

        <TextField
          label={`Search by ${filterType}`}
          variant="outlined"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          style={{ marginRight: '10px',marginTop:'-15px' ,marginLeft:'-50px',position:'fixed',marginBottom:'50px'}}
        />
        
        </div>


  {/* Render other buttons */}
  <Button
          type="button"
          variant="contained"
          color="primary"
          disableElevation
          onClick={handleSubmitFilter} style={{marginTop:'3px' ,marginLeft:'10px'}}
        >
          Submit
        </Button>
  <Button
    type='button'
    variant="contained"
    color='primary'
    disableElevation
    style={{ textTransform: 'none', marginLeft: '10px' }} // Adjust margin as needed
    onClick={handleSeverePatientsClick}
  >
    <PersonAddIcon style={{ marginRight: '10px' }} /> {/* Adjust margin as needed */}
    Severe patients
  </Button>

  <Button
    type='button'
    variant="contained"
    color='primary'
    disableElevation
    style={{ textTransform: 'none', marginLeft: '10px' }} // Adjust margin as needed
    onClick={toggleDrawer}
  >
    <PersonAddIcon style={{ marginRight: '8px' }} /> {/* Adjust margin as needed */}
    Add Patient
  </Button>
</div>
      {/* Display the fetched data in a table */}
      <div className="table-container" style={{ maxHeight: 'calc(100vh - 250px)', overflowY: 'auto',overflowX:'auto', position: 'relative' }}>

      <Table > 
        <TableHead>
          <TableRow>
            <TableCell style={{ fontFamily: 'playfair-display-uniquifier', fontSize: '22px', fontWeight: 'bolder' }}>Profile</TableCell>
            <TableCell style={{ fontFamily: 'playfair-display-uniquifier', fontSize: '22px', fontWeight: 'bolder' }}>Name</TableCell>
            <TableCell style={{ fontFamily: 'playfair-display-uniquifier', fontSize: '22px', fontWeight: 'bolder' }}>Disease</TableCell>
            <TableCell style={{ fontFamily: 'playfair-display-uniquifier', fontSize: '22px', fontWeight: 'bolder' }}>Family Doctor</TableCell>
            <TableCell style={{ fontFamily: 'playfair-display-uniquifier', fontSize: '22px', fontWeight: 'bolder' }}>Gender</TableCell>
            <TableCell style={{ fontFamily: 'playfair-display-uniquifier', fontSize: '22px', fontWeight: 'bolder' }}>City</TableCell>
            <TableCell style={{ fontFamily: 'playfair-display-uniquifier', fontSize: '22px', fontWeight: 'bolder' }}>Country</TableCell>
            <TableCell style={{ fontFamily: 'playfair-display-uniquifier', fontSize: '22px', fontWeight: 'bolder' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell style={{ textAlign: 'center' }}>
                <Button onClick={() => handleProfileClick(patient)}>
                  <AccountCircleIcon style={{ fontSize: 32 }} />
                </Button>
              </TableCell>
              <TableCell style={{ fontFamily: 'playfair-display-uniquifier', fontSize: '20px',fontWeight:'bolder'}}>{patient.name}</TableCell>
              <TableCell style={{ fontFamily: 'playfair-display-uniquifier', fontSize: '20px' ,fontWeight:'bolder'}}>{patient.disease}</TableCell>
              <TableCell style={{ fontFamily: 'playfair-display-uniquifier', fontSize: '20px',fontWeight:'bolder' }}>{patient.familydoctor}</TableCell>
              <TableCell style={{ fontFamily: 'playfair-display-uniquifier', fontSize: '20px',fontWeight:'bolder' }}>{patient.gender}</TableCell>
              <TableCell style={{ fontFamily: 'playfair-display-uniquifier', fontSize: '20px',fontWeight:'bolder' }}>{patient.city}</TableCell>
              <TableCell style={{ fontFamily: 'playfair-display-uniquifier', fontSize: '20px' ,fontWeight:'bolder'}}>{patient.country}</TableCell>
              <TableCell>
                <Button onClick={() => handleEditClick(patient.id)}><EditIcon /></Button>
                <Button onClick={() => handleDeleteConfirmationOpen(patient)}><DeleteIcon /></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
      {/* Your patients component content goes here */}
      <Drawer
        anchor='right'
        open={isDrawerOpen}
        onClose={toggleDrawer}
        PaperProps={{ sx: { width: '50vw',backgroundColor: '#d6def5' } }} // Set width to 50% of the viewport width
      >
        <div className="drawer-content">
          {/* Pass editingpatient data to AddPatientForm */}
          <AddPatientForm onSubmit={handleFormSubmit} patient={editingpatient} isEditing={!!editingpatient} />
        </div>
      </Drawer>

      {/* Severe condition popup */}
     <Dialog open={!!selectedPatient} onClose={handleCloseProfileDialog}>
    <div className="dialog-content-with-image1">
  <DialogTitle style={{ fontFamily: 'playfair-display-uniquifier', fontSize: '25px', fontWeight: 'bolder',color:'#333333' ,textDecoration:'underline'}}>{`${selectedPatient && selectedPatient.name}'s Profile`}</DialogTitle>
  <DialogContent>
    {selectedPatient && (
      <>
        <p style={{ fontFamily: 'playfair-display-uniquifier', fontSize: '25px', fontWeight: 'bolder',color:'#333333' }}>{`Name: ${selectedPatient.name}`}</p>
        <p style={{ fontFamily: 'playfair-display-uniquifier', fontSize: '25px', fontWeight: 'bolder',color:'#333333' }}>{`Disease: ${selectedPatient.disease}`}</p>
        <p style={{ fontFamily: 'playfair-display-uniquifier', fontSize: '25px', fontWeight: 'bolder',color:'#333333' }}>{`Description: ${selectedPatient.description}`}</p>
        {/* Add more patient details here */}
      </>
    )}
  </DialogContent>
  <DialogActions>
    <Button style={{ fontFamily: 'playfair-display-uniquifier', fontSize: '25px', fontWeight: 'bolder',color:'blue' }} onClick={handleCloseProfileDialog} color="primary">Close</Button>
  </DialogActions>
  </div>
</Dialog>

<Dialog open={showSeverePopup} onClose={handleCloseSeverePopup}>
<div className="dialog-content-with-image1">
  <DialogTitle style={{ fontFamily: 'playfair-display-uniquifier', fontSize: '25px', fontWeight: 'bolder', color: '#333333',textDecoration:'underline'}}>{`Severe Patients List`}</DialogTitle>
  <DialogContent style={{ fontFamily: 'playfair-display-uniquifier', fontSize: '22px', fontWeight: 'bolder', color: '#333333' }}>
  {severePatients && (
    <ul>
      {severePatients.map(patient => (
        <li key={patient.id}>{`${patient.name}: ${patient.description}`}</li>
      ))}
    </ul>
  )}
</DialogContent>

  <DialogActions>
    <Button style={{ fontFamily: 'playfair-display-uniquifier', fontSize: '25px', fontWeight: 'bolder', color: 'blue' }} onClick={handleCloseSeverePopup} color="primary">Close</Button>
  </DialogActions>
  </div>
</Dialog>

<Dialog open={isDeleteConfirmationOpen} onClose={handleDeleteConfirmationClose}>
        <DialogTitle>Delete Patient</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this Patient?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirmationClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => {
            handleDeleteClick(selectedPatient1.id);
            handleDeleteConfirmationClose();
          }} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>


      <Popover
  open={isPopoverOpen}
  onClose={() => setIsPopoverOpen(false)}
  anchorOrigin={{
    vertical: 'top',
    horizontal: 'center',
  }}
  transformOrigin={{
    vertical: 'bottom',
    horizontal: 'center',
  }}
  PaperProps={{
    sx: {
      backgroundColor: '#CCFFCC', // Light green color
    },
  }}
>
  <Typography sx={{ p: 2 }}>Inserted Successfully</Typography>
</Popover>

<Popover
  open={isUpdateSuccessOpen}
  onClose={() => setIsUpdateSuccessOpen(false)}
  anchorOrigin={{
    vertical: 'top',
    horizontal: 'center',
  }}
  transformOrigin={{
    vertical: 'bottom',
    horizontal: 'center',
  }}
  PaperProps={{
    sx: {
      backgroundColor: '#CCFFCC', // Light green color
    },
  }}
>
  <Typography sx={{ p: 2 }}>Updated Successfully</Typography>
</Popover>

    </div>
  );
}

export default Patients;

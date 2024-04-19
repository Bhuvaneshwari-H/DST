import React, { useState, useEffect } from 'react';
import './Doctor.css';
import { Button, Drawer, Table, TableHead, TableRow, TableCell, TableBody,Popover,Typography,Tooltip} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddDoctorForm from './AddDoctorForm';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'; // Import Dialog components from Material-UI

function Doctors() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [editingDoctor, setEditingDoctor] = useState(null); // State to hold the data of the doctor being edited
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false); // Define setDialogOpen state
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false); // State to control delete confirmation dialog
  const [isUpdateSuccessOpen, setIsUpdateSuccessOpen] = useState(false); // State to control update success message
  const dialogBackgroundImage = 'url("doctor.jpeg")';

  const [availability, setAvailability] = useState('Loading...');


  useEffect(() => {
    fetchDoctorAvailability(doctors.id);
    // Fetch data from the backend when the component mounts
    fetchData();
  }, [doctors.id]);

  const fetchData = async () => {
    try {
      // Make GET request to your backend API endpoint to fetch doctors data
      const response = await axios.get('http://localhost:1337/doctors');
      setDoctors(response.data); // Set the fetched data to the state
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleUpdateSuccessClose = () => {
    setIsUpdateSuccessOpen(false);
  };

  const handleDialogOpen = (doctorData) => {
    setSelectedDoctor(doctorData);
    setDialogOpen(true);
  };
  
  const handleDialogClose = () => {
    setSelectedDoctor(null);
    setDialogOpen(false);
  };

  const handleDeleteConfirmationOpen = (doctor) => {
    setSelectedDoctor(doctor);
    setIsDeleteConfirmationOpen(true);
  };
  

  // Function to handle closing confirmation dialog
  const handleDeleteConfirmationClose = () => {
    setSelectedDoctor(null);
    setIsDeleteConfirmationOpen(false);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
    // Reset the editingDoctor state when closing the drawer
    setEditingDoctor(null);
  };

  const handleUpdateSubmit = async (data) => {
    try {
      console.log('Editing doctor:', editingDoctor);
      console.log('Updated data:', data);

      // If editingDoctor exists, it means we're updating an existing doctor
      const updatedDoctor = { ...editingDoctor, ...data };

      // Make PUT request to backend API to update the doctor
      await axios.put(`http://localhost:1337/update/${editingDoctor.id}`, updatedDoctor);

      // Update the doctor object in the state with the new data
      setDoctors(prevDoctors =>
        prevDoctors.map(doctor =>
          doctor.id === editingDoctor.id ? updatedDoctor : doctor
        )
      );
      setIsUpdateSuccessOpen(true);

      toggleDrawer(); // Close the drawer after submission
    } catch (error) {
      console.error('Error updating doctor:', error);
      // Handle error gracefully (e.g., display error message)
    }
  };

  const handleProfileClick = async (id) => {
    try {
      
      const response = await axios.get(`http://localhost:1337/doctors/${id}`);
      const doctorData = response.data;
      handleDialogOpen(doctorData);
    } catch (error) {
      console.error('Error fetching doctor details:', error);
    }
  };

  const handleAddSubmit = async (data) => {
    console.log('Adding new doctor:', data);
  
    try {
      const response = await axios.post('http://localhost:1337/plus', data);
      console.log('New doctor added:', response.data);
  
      // Update the doctors state by adding the newly created doctor
      setDoctors(prevDoctors => [...prevDoctors, response.data]);
  
      setIsPopoverOpen(true);
      setTimeout(() => setIsPopoverOpen(false), 2000);
      toggleDrawer();
    } catch (error) {
      console.error('Error adding doctor:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Server responded with status code:', error.response.status);
        console.error('Response data:', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received from server');
      } else {
        // Something happened in setting up the request that triggered an error
        console.error('Error setting up the request:', error.message);
      }
      // You can add additional error handling logic here, such as displaying an error message to the user
    }
  };
  
  
  


  // Other functions...

  
  

  const handleFormSubmit = async (data) => {
    if (editingDoctor) {
      await handleUpdateSubmit(data);
    } else {
      await handleAddSubmit(data);
    }
  };

  const handleEditClick = async (id) => {
    try {
      // Make a GET request to fetch the details of the doctor with the given ID
      const response = await axios.get(`http://localhost:1337/doctors/${id}`);
      const doctorData = response.data;

      setEditingDoctor(doctorData);
      // Open the drawer
      setIsDrawerOpen(true);

      console.log('Editing doctor with ID:', id);
      console.log('Doctor details:', doctorData); // Print the entire row's data
    } catch (error) {
      console.error('Error fetching doctor details:', error);
    }
  };

  const handleDeleteClick = async (id) => {
    console.log('Deleting doctor with ID:', id); // Add this line
    try {
      
      // Make DELETE request to backend API to delete the doctor
      await axios.delete(`http://localhost:1337/deleteDoctor/${id}`);
      // Update the doctors state by filtering out the deleted doctor
      setDoctors(doctors.filter((doctor) => doctor.id !== id));
    } catch (error) {
      console.error('Error deleting doctor:', error);
    }
  };
  
  const fetchExperiencedDoctors = async () => {
    try {
      // Make a GET request to your backend API endpoint to fetch experienced doctors
      const response = await axios.get('http://localhost:1337/doctors/fetchExperiencedDoctors');
      setDoctors(response.data); // Update the doctors state with the fetched experienced doctors
    } catch (error) {
      console.error('Error fetching experienced doctors:', error);
    }
  };
  
  const handleProfileHover = async (id) => {
    try {
      const response = await axios.get(`http://localhost:1337/doctors/fetchDoctorAvailability/${id}`);
      const doctorData = response.data;
      // Show availability status in tooltip
      return `${doctorData.name} is ${doctorData.available ? 'available' : 'not available'}`;
    } catch (error) {
      console.error('Error fetching doctor details:', error);
      return 'Error fetching details';
    }
  };

  const fetchDoctorAvailability = async (doctorId) => {
    try {
      const response = await axios.get(`http://localhost:1337/doctors/fetchDoctorAvailability/${doctorId}`);
      const doctorData = response.data;
      console.log(doctorData);
      // Check if the doctor is available based on the 'doctoravailable' attribute
      let status;
      if (doctorData.doctoravailable==='available') {
        status = 'available';
      } else {
        status = 'not available';
      }
            console.log(status);
      // Display the doctor's availability status along with their name
      setAvailability(`${doctorData.doctor} is ${status}`);
    } catch (error) {
      console.error('Error fetching doctor availability:', error);
      setAvailability('Error fetching availability');
    }
  };
  

  return (
    <div className="page-container" style={{ top:'-70px',marginBottom: '30px' ,display:'flex',alignItems:'flex-start',border: '15px solid #4365CF',borderRadius:'10px', height: '100vh', marginBottom:'0px',
    paddingLeft: '0px',
    overflowY:'auto',
    zIndex: '1',position:'relative'}}>
      <div className="top-header" style={{ width: '100%', overflowY: 'hidden', overflowX: 'hidden', position: 'sticky', marginTop: '-120px' }}>
        {/* Header content here */}
        <p style={{ paddingLeft: '20px', marginTop: '3px', fontFamily: 'playfair-display-uniquifier', fontWeight: '600', fontSize: '25px', textAlign: 'center' ,paddingTop:'10px'}}>DOCTORS</p>
        <hr className="horizontal-line" style={{ borderColor: '#4365CF', width: '800%' }} />
      </div>

      <div className="button-container">
      <Button
    type='button'
    variant="contained"
    color='primary'
    disableElevation
    style={{ textTransform: 'none',marginRight:'10px' }}
    onClick={fetchExperiencedDoctors} // Define the function to fetch experienced doctors
  >
    Experienced Doctors
  </Button>
        <Button
          type='button'
          variant="contained"
          color='primary'
          disableElevation
          style={{ textTransform: 'none' }}
          onClick={toggleDrawer}
        >
          <PersonAddIcon style={{ marginRight: '8px' }} />
          Add Doctor
        </Button>
      </div>
      {/* Display the fetched data in a table */}
      <div className="table-container" style={{ maxHeight: 'calc(100vh - 250px)',overflowX:'auto', overflowY: 'auto', position: 'relative' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontFamily: 'playfair-display-uniquifier', fontSize: '22px', fontWeight: 'bolder' }}>Profile</TableCell>
              <TableCell style={{ fontFamily: 'playfair-display-uniquifier', fontSize: '22px', fontWeight: 'bolder' }}>Name</TableCell>
              <TableCell style={{ fontFamily: 'playfair-display-uniquifier', fontSize: '22px', fontWeight: 'bolder' }}>Department</TableCell>
              <TableCell style={{ fontFamily: 'playfair-display-uniquifier', fontSize: '22px', fontWeight: 'bolder' }}>Experience</TableCell>
              <TableCell style={{ fontFamily: 'playfair-display-uniquifier', fontSize: '22px', fontWeight: 'bolder' }}>Gender</TableCell>
              <TableCell style={{ fontFamily: 'playfair-display-uniquifier', fontSize: '22px', fontWeight: 'bolder' }}>City</TableCell>
              <TableCell style={{ fontFamily: 'playfair-display-uniquifier', fontSize: '22px', fontWeight: 'bolder' }}>Country</TableCell>
              <TableCell style={{ fontFamily: 'playfair-display-uniquifier', fontSize: '22px', fontWeight: 'bolder' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doctors.map((doctor) => (
              <TableRow key={doctor.id} >
           <TableCell style={{ textAlign: 'center' }}>
  <Tooltip title={availability} >
    <Button 
      onMouseEnter={() => fetchDoctorAvailability(doctor.id)} // Call fetchDoctorAvailability when mouse enters the button
      onClick={() => handleProfileClick(doctor.id)}
    >
      <AccountCircleIcon style={{ fontSize: 32 }} />
    </Button>
  </Tooltip>
</TableCell>


                <TableCell style={{ fontFamily: 'playfair-display-uniquifier',fontSize: '20px', fontWeight: 'bolder' }}>{doctor.name}</TableCell>
                <TableCell style={{ fontFamily: 'playfair-display-uniquifier', fontSize: '20px', fontWeight: 'bolder' }}>{doctor.department}</TableCell>
                <TableCell style={{ fontFamily: 'playfair-display-uniquifier',fontSize: '20px', fontWeight: 'bolder' }}>{doctor.experience}</TableCell>
                <TableCell style={{ fontFamily: 'playfair-display-uniquifier', fontSize: '20px', fontWeight: 'bolder'}}>{doctor.gender}</TableCell>
                <TableCell style={{ fontFamily: 'playfair-display-uniquifier',fontSize: '20px', fontWeight: 'bolder' }}>{doctor.city}</TableCell>
                <TableCell style={{ fontFamily: 'playfair-display-uniquifier', fontSize: '20px', fontWeight: 'bolder' }}>{doctor.country}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEditClick(doctor.id)}><EditIcon /></Button>
                  <Button onClick={() => handleDeleteConfirmationOpen(doctor)}><DeleteIcon /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Your Doctors component content goes here */}
      <Drawer
        anchor='right'
        open={isDrawerOpen}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            width: '50vw',
            backgroundColor: '#d6def5' ,
            backgroundImage:`url(doctor4.jpg)`
          }
        }}
      >
        {/* Drawer content */}


        <div className="drawer-content">
          {/* Pass editingDoctor data to AddDoctorForm */}
          <AddDoctorForm onSubmit={handleFormSubmit} doctor={editingDoctor} isEditing={!!editingDoctor} />
        </div>
      </Drawer>


      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <div className="dialog-content-with-image">
  <DialogTitle style={{ fontFamily: 'playfair-display-uniquifier', fontSize: '25px', fontWeight: 'bold',marginBottom:'10px' }}>Doctor Details</DialogTitle>
  <DialogContent >
    {/* Render doctor details here */}
    {selectedDoctor && (
      <>
        <p style={{ fontFamily: 'playfair-display-uniquifier', fontSize: '25px', fontWeight: 'bolder',color:'#333333' }}>Name: {selectedDoctor.name}</p>
        <p style={{ fontFamily: 'playfair-display-uniquifier', fontSize: '25px', fontWeight: 'bolder' ,color:'#333333'}}>Specialization In: {selectedDoctor.specialization}</p>
        <p style={{ fontFamily: 'playfair-display-uniquifier', fontSize: '25px', fontWeight: 'bolder' ,color:'#333333'}}>Number Of Patients Served: {selectedDoctor.patientsServed}</p>
        <p style={{ fontFamily: 'playfair-display-uniquifier', fontSize: '25px', fontWeight: 'bolder',color:'#333333' }}>Experience: {selectedDoctor.experience}</p>
      </>
    )}
  </DialogContent>
  <DialogActions>
    <Button onClick={handleDialogClose} color="primary" style={{ fontFamily: 'playfair-display-uniquifier', fontSize: '25px', fontWeight: 'bolder',color:'black' }}>Close</Button>
  </DialogActions>
  </div>
</Dialog>




<Dialog open={isDeleteConfirmationOpen} onClose={handleDeleteConfirmationClose}>
        <DialogTitle>Delete Doctor</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this doctor?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirmationClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => {
            handleDeleteClick(selectedDoctor.id);
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

export default Doctors;
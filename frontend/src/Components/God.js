import React, { useState, useEffect } from 'react';
import './Doctor.css';
import { Button, Drawer, Table, TableHead, TableRow, TableCell, TableBody, TextField } from '@mui/material';
import AddDoctorForm from './AddDoctorForm'; // Import AddDoctorForm component
import axios from 'axios';

function God() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    department: '',
    experience: '',
    gender: '',
    city: '',
    country: '',
    specialization:'',
    severe:'',
    description:'',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:1337/doctors');
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAddDoctor = async () => {
    try {
      const response = await axios.post('http://localhost:1337/plus', newDoctor);
      setDoctors([...doctors, response.data]);
      setIsDrawerOpen(false);
      setNewDoctor({
        name: '',
        department: '',
        experience: '',
        gender: '',
        city: '',
        country: ''
      });
    } catch (error) {
      console.error('Error adding doctor:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="page-container">
      <div className="button-container">
        <Button
          type='button'
          variant="contained"
          color='primary'
          disableElevation
          onClick={() => setIsDrawerOpen(true)}
        >
          Add Patient
        </Button>
      </div>

      <Drawer
        anchor='right'
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <div className="drawer-content">
          <AddDoctorForm
            newDoctor={newDoctor}
            handleChange={handleChange}
            handleAddDoctor={handleAddDoctor}
          />
        </div>
      </Drawer>

      <div className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Disease</TableCell>
              <TableCell>Family Doctor</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Country</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doctors.map((doctor) => (
              <TableRow key={doctor.id}>
                <TableCell>{doctor.name}</TableCell>
                <TableCell>{doctor.disease}</TableCell>
                <TableCell>{doctor.familydoctor}</TableCell>
                <TableCell>{doctor.gender}</TableCell>
                <TableCell>{doctor.city}</TableCell>
                <TableCell>{doctor.country}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default God;

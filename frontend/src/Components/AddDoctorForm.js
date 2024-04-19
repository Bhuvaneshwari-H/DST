import React from 'react';
import { useFormik } from 'formik';
import { TextField, Button, Grid, Paper,FormControlLabel,Checkbox } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup'; // Import Yup for form validation
import axios from 'axios';

const paperStyle = { padding: '30px 20px', width: 500, margin: '20px auto', border: '2px solid #4365CF' }; // Adjust the width here

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  department: Yup.string()
    .required('Department is required'),
  gender: Yup.string().required('Gender is required').oneOf(['Male', 'Female'], 'Invalid gender'),
  experience: Yup.number().typeError('Experience must be a number').required('Experience is required'),
  city: Yup.string().required('City is required'),
  country: Yup.string().required('Country is required'),
  specialization: Yup.string().required('Specialization is required'),
  patientsServed: Yup.number().typeError('Patients Served must be a number').required('Patients Served is required'),
});

function AddDoctorForm({ doctor, isEditing, onSubmit }) {
  const initialValues = doctor
    ? { ...doctor }
    : {
      name: '',
      department: '',
      gender: '',
      experience: '',
      city: '',
      country: '',
      specialization: '',
      patientsServed: '',
      doctoravailable: false,
    };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (!isEditing) {
          // Call the onSubmit function only if not editing
          await onSubmit(values);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Axios Error');
      }
      setSubmitting(false); // Reset submitting state
    },
    validateOnChange: true, // Validate on change
    validateOnFocus: true, // Validate on blur
  });

  return (
    <div style={{ margin: 'px' }}>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {(props) => (
          <Form>
            <h3 style={{ textAlign: 'center', fontFamily: 'playfair-display-uniquifier', fontWeight: '600' }}>{doctor ? 'UPDATE DOCTOR' : 'ADD DOCTOR'}</h3>
            <Grid container spacing={2}>
            <Paper elevation={20} style={{ ...paperStyle, boxShadow: '0px 2px 4px rgba(67, 101, 207, 0.4)' }}>          
                    <Grid item xs={12}> {/* This Grid item will take up the full width on extra-small screens */}
      <Grid container spacing={2}> {/* This container will contain the fields */}
        <Grid item xs={6}> {/* Displayed as half width on extra-small screens and above */}
          <Field as={TextField} fullWidth label='Name' name='name' placeholder='Enter Your Name' error={props.errors.name && props.touched.name} // Set error prop based on formik error and touched state
                        helperText={(props.errors.name && props.touched.name) && props.errors.name}/>
        </Grid>
        <Grid item xs={6}> {/* Displayed as half width on extra-small screens and above */}
          <Field as={TextField} fullWidth label='Department' name='department' error={props.errors.department && props.touched.department} // Set error prop based on formik error and touched state
                        helperText={(props.errors.department && props.touched.department) && props.errors.department}/>
        </Grid>
        <Grid item xs={6}> {/* Displayed as half width on extra-small screens and above */}
          <Field as={TextField} fullWidth label='Experience' name='experience' error={props.errors.experience && props.touched.experience} // Set error prop based on formik error and touched state
                        helperText={(props.errors.experience && props.touched.experience) && props.errors.experience}/>
        </Grid>
        <Grid item xs={6}> {/* Displayed as half width on extra-small screens and above */}
          <Field as={TextField} fullWidth label='Gender' name='gender' error={props.errors.gender && props.touched.gender} // Set error prop based on formik error and touched state
                        helperText={(props.errors.gender && props.touched.gender) && props.errors.gender} />
        </Grid>
        <Grid item xs={6}> {/* Displayed as half width on extra-small screens and above */}
          <Field as={TextField} fullWidth label='City' name='city' type='city' error={props.errors.city && props.touched.city} // Set error prop based on formik error and touched state
                        helperText={(props.errors.city && props.touched.city) && props.errors.city}/>
        </Grid>
        <Grid item xs={6}> {/* Displayed as half width on extra-small screens and above */}
          <Field as={TextField} fullWidth label='Country' name='country' type='city' error={props.errors.country && props.touched.country} // Set error prop based on formik error and touched state
                        helperText={(props.errors.country && props.touched.country) && props.errors.country}/>
        </Grid>
        <Grid item xs={6}>
                      {/* Displayed as half width on extra-small screens and above */}
                      <Field as={TextField} fullWidth label='Specialization' name='specialization' error={props.errors.specialization && props.touched.specialization} // Set error prop based on formik error and touched state
                        helperText={(props.errors.specialization && props.touched.specialization) && props.errors.specialization} />
                    </Grid>
                    <Grid item xs={6}>
                      {/* Displayed as half width on extra-small screens and above */}
                      <Field as={TextField} fullWidth label='Patients Served' name='patientsServed' error={props.errors.patientsServed && props.touched.patientsServed} // Set error prop based on formik error and touched state
                        helperText={(props.errors.patientsServed && props.touched.patientsServed) && props.errors.patientsServed} />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={<Checkbox
                          checked={props.values.severe}
                          onChange={props.handleChange}
                          name="doctoravailable"
                          title={props.values.severe ? `The condition of the patient ${props.values.name} is severe` : ''}
                        />}
                        label="Doctor Available"
                      />

                    </Grid>
      </Grid>
    </Grid>
  </Paper>
</Grid>



            <Button
              type='submit'
              variant='contained'
              color='primary'
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 'auto' // Add margin auto to center horizontally
              }}
            >
              {doctor ? 'Update' : 'Add +'}
            </Button>

            
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddDoctorForm;

import React from 'react';
import { useFormik } from 'formik';
import { TextField, Button, Grid, Paper, FormControlLabel, Checkbox } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup'; // Import Yup for form validation
import axios from 'axios';

const paperStyle = { padding: '30px 20px', width: 500, margin: '20px auto', border: '2px solid #4365CF' }; // Adjust the width here

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  disease: Yup.string()
    .required('Disease is required'),
  gender: Yup.string().required('Gender is required').oneOf(['Male', 'Female'], 'Invalid gender'),
  familydoctor: Yup.string().required('Familydoctor is required'),
  city: Yup.string().required('City is required'),
  country: Yup.string().required('Country is required'),
  description: Yup.string().required('Description is required'), // New description field validation

  severe: Yup.boolean(), // New checkbox field
});

function AddPatientForm({ patient, isEditing, onSubmit }) {
  const initialValues = patient
    ? { ...patient }
    : {
      name: '',
      disease: '',
      gender: '',
      familydoctor: '',
      city: '',
      country: '',
      description: '',
      severe: false, // Initialize emergency field to false
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
            <h3 style={{ textAlign: 'center', fontFamily: 'playfair-display-uniquifier', fontWeight: '600' }}>{patient ? 'UPDATE PATIENT' : 'ADD PATIENT'}</h3>
            <Grid container spacing={2}>
              <Paper elevation={20} style={{ ...paperStyle, boxShadow: '0px 2px 4px rgba(67, 101, 207, 0.4)' }}>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Field as={TextField} fullWidth label='Name' name='name' placeholder='Enter Your Name' error={props.errors.name && props.touched.name} // Set error prop based on formik error and touched state
                        helperText={(props.errors.name && props.touched.name) && props.errors.name} InputProps={{ style: { color: '#000' } }} />
                    </Grid>
                    <Grid item xs={6}>
                      <Field as={TextField} fullWidth label='Disease' name='disease' error={props.errors.disease && props.touched.disease} // Set error prop based on formik error and touched state
                        helperText={(props.errors.disease && props.touched.disease) && props.errors.disease} InputProps={{ style: { color: '#000' } }} />
                    </Grid>
                    <Grid item xs={6}>
                      <Field as={TextField} fullWidth label='Family Doctor' name='familydoctor' error={props.errors.familydoctor && props.touched.familydoctor} // Set error prop based on formik error and touched state
                        helperText={(props.errors.familydoctor && props.touched.familydoctor) && props.errors.familydoctor} InputProps={{ style: { color: '#000' } }} />
                    </Grid>
                    <Grid item xs={6}>
                      <Field as={TextField} fullWidth label='Gender' name='gender' error={props.errors.gender && props.touched.gender} // Set error prop based on formik error and touched state
                        helperText={(props.errors.gender && props.touched.gender) && props.errors.gender} InputProps={{ style: { color: '#000' } }} />
                    </Grid>
                    <Grid item xs={6}>
                      <Field as={TextField} fullWidth label='City' name='city' type='city' error={props.errors.city && props.touched.city} // Set error prop based on formik error and touched state
                        helperText={(props.errors.city && props.touched.city) && props.errors.city} InputProps={{ style: { color: '#000' } }} />
                    </Grid>
                    <Grid item xs={6}>
                      <Field as={TextField} fullWidth label='Country' name='country' type='city' error={props.errors.country && props.touched.country} // Set error prop based on formik error and touched state
                        helperText={(props.errors.country && props.touched.country) && props.errors.country} InputProps={{ style: { color: '#000' } }} />
                    </Grid>
                    <Grid item xs={12}>
                      <Field as={TextField} fullWidth label='Description' name='description' type='text' error={props.errors.description && props.touched.description} // Set error prop based on formik error and touched state
                        helperText={(props.errors.description && props.touched.description) && props.errors.description} InputProps={{ style: { color: '#000' } }} />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={<Checkbox
                          checked={props.values.severe}
                          onChange={props.handleChange}
                          name="severe"
                          title={props.values.severe ? `The condition of the patient ${props.values.name} is severe` : ''}
                        />}
                        label="Severe"
                      />

                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Button type='submit' variant='contained' color='primary' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 'auto' }}>
              {patient ? 'Update' : 'Add +'}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddPatientForm;

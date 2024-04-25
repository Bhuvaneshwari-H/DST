import React from "react";
import { Avatar, Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, Paper, TextField, Typography } from "@material-ui/core";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Radio from '@mui/material/Radio';
import FormHelperText from "@material-ui/core/FormHelperText";
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import axios from 'axios';



const Signup = () => {
    const paperStyle = { padding: '30px 20px', width: 300, margin: "20px auto" }
    const headerStyle = { margin: 0 }
    const marginTop = { marginTop: 18 }
    const avatarStyle = { backgroundColor: 'blueviolet' }
    const initialValues = {
        username: '',
        email: '',
        gender: '',
        phoneNumber: '',
        password: '',
        confirmpassword: '',
        termsAndConditions: false // Set initial value to false
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3, "It's Too Short").required("Required"),
        email: Yup.string().email("Enter Valid Email").required("Required"),
        gender: Yup.string().oneOf(["male", "female"], "Required").required("Required"),
        phoneNumber: Yup.number().typeError("Enter Valid Phone Number").required("Required"),
        password: Yup.string()
            .min(8, "Password Minimum Length should be 8")
            .matches(/^(?=.*[!@#$%^&*])/, "Password must contain at least one special character")
            .required("Required"),
        confirmpassword: Yup.string().oneOf([Yup.ref('password')], "Password not Matched").required("Required"),
        termsAndConditions: Yup.boolean().oneOf([true], "Accept Terms And Conditions") // Updated for boolean type
    })

    const navigate=useNavigate();

    const onSubmit = async (values, { resetForm, setSubmitting, setFieldError }) => {
        try {
            // Make a POST request to your Sails backend
            const response = await axios.post('http://ec2-13-60-54-245.eu-north-1.compute.amazonaws.com:27017/User', values);
    
            // Reset the form and navigate to the login page if successful
            resetForm();
            setSubmitting(false);
            navigate('/login');
        } catch (error) {
            // Handle errors if the request fails
            console.error('Error:', error.response ? error.response.data : error.message);
    
            if (error.response && error.response.data && error.response.data.error === "Username or email already exists") {
                // If the error message is specific to username or email conflict, display it
                const errorMessage = 'Username or Email already exists.';
                alert(errorMessage);
            } else {
                // For other error cases, display a generic error message
                alert('An error occurred while signing up. Please try again later.');
            }
        }
    };
    
    

    return (
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineIcon></AddCircleOutlineIcon>
                    </Avatar>
                    <h2 style={headerStyle}>Sign Up</h2>
                    <Typography variant="caption" gutterBottom>Please fill this form to create an Account</Typography>
                </Grid>
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    {(props) => (
                        <Form>
                            <Field as={TextField} fullWidth label='UserName' name='username' placeholder="Enter Your UserName" helperText={<ErrorMessage name="username" />} />
                            <Field as={TextField} fullWidth label='Email' name='email' helperText={<ErrorMessage name="email" />} />
                            <FormControl style={marginTop}> 
                                <FormLabel id="demo-radio-buttons-group-label" name="gender" style={{ marginBottom: '10px' }}>Gender</FormLabel>
                                <Field as={RadioGroup}
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="gender"
                                    style={{ display: 'initial' }}>
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                </Field>
                            </FormControl>
                            <FormHelperText><ErrorMessage name="gender" /></FormHelperText>
                            <Field as={TextField} fullWidth name="phoneNumber" label='Phone Number' helperText={<ErrorMessage name="phoneNumber" />} />
                            <Field as={TextField} fullWidth name="password" label='Password' type="password" helperText={<ErrorMessage name="password" />} />
                            <Field as={TextField} fullWidth name="confirmpassword" label='Confirm Password' type="password" helperText={<ErrorMessage name="confirmpassword" />} />

                            {/* Display label for the checkbox field */}
                            <FormControlLabel
                                control={<Checkbox color="primary" checked={props.values.termsAndConditions} onChange={props.handleChange} />} // Provide color prop for the checkbox
                                label="I accept the terms and Conditions" // Label text
                                name="termsAndConditions"
                            />

                            <FormHelperText><ErrorMessage name="termsAndConditions" /></FormHelperText>

                            <Button type='submit' variant="contained" color='primary' disabled={props.isSubmitting}>{props.isSubmitting ? "Loading" : "Sign Up"}</Button>
                        </Form>
                    )}
                </Formik>
                <Typography>
                    Already have an account? <span style={{ cursor: 'pointer', color: 'blue' }} onClick={() => navigate('/login')}>Login</span>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Signup;

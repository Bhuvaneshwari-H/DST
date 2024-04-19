import React from 'react'
import { Grid, Paper, Avatar, TextField, Checkbox, Button, Typography, Link } from '@material-ui/core';
import FormControlLabel from '@mui/material/FormControlLabel';
import LockIcon from '@mui/icons-material/Lock';
import { Formik, Form, Field,ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import { Navigate,useNavigate} from 'react-router-dom/dist/umd/react-router-dom.development';

const Login = () => {
    const navigate = useNavigate();
    const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" }
    const avatarStyle = { backgroundColor: 'blueviolet' }
    const btnStyle = { margin: '8px 0' }
    const initialValues = {
        email: '',
        password: '',
        remember: false
    }
    // Define validation schema
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Please Enter Valid Email').required("Required"),
        password:Yup.string().required('Required')
    })
    const onSubmit = async (values, props) => {
        try {
            // Make a POST request to your backend for authentication
            const response = await axios.post('http://localhost:1337/login', {
                email: values.email,
                password: values.password
            });
    
            // Check if authentication is successful
            if (response.status === 200) {
                // Navigate to the thank you page
                navigate('/thank');
            } else {
                // Display an error message if authentication fails
                alert(response.data.message);
            }
        } catch (error) {
            console.error('Error:', error.message);
            // Check if the error response contains specific error message for invalid credentials
            if (error.response && error.response.data && error.response.data.message === 'Invalid credentials') {
                // Display specific error message for invalid credentials
                alert('Invalid credentials');
            } else {
                // Display a generic error message for other errors
                alert('An error occurred while logging in. Please try again later.');
            }
        }
    };
    
    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockIcon /></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    {(props) => (
                        <Form>
                            {console.log(props)}
                            <Field as={TextField} label='Email' 
                            placeholder='Enter Youe Email' name="email" 
                            helperText={<ErrorMessage name="email"/>} fullWidth required />
                            <Field as={TextField} label='Password' placeholder='Enter Password' type='password' name="password" 
                            helperText={<ErrorMessage name="password"/>}
                            fullWidth required />
                            <Field as={FormControlLabel}
                                name="remember"
                                control={
                                    <Checkbox
                                        color="primary"
                                    />
                                }
                                label="Remember Me"
                            />
                            <Button type='submit' color='primary' variant='contained' style={btnStyle} disabled={props.isSubmitting} fullWidth>{props.isSubmitting?"Loading":"Sign In"}</Button>
                        </Form>
                    )}
                </Formik>
                <Typography>
                    <Link href='#'>
                        Forgot Password?
                    </Link>
                </Typography>
                <Typography>Do you have an Account?
                <span style={{ cursor: 'pointer', color: 'blue' }} onClick={() => navigate('/')}>Signup</span>
                </Typography>

                
            </Paper>
        </Grid>
    )
}

export default Login


//Paper: Component used to create a simple container with a shadow effect,
//visual separation and elevation to content, such as cards or panels, within a layout.


//Grid: Layout Structure
//It helps in organizing content into rows and columns, making it easier to design responsive layouts. You can specify the layout of your components using the container, item, xs, sm, md, lg, and xl props to control how they appear at different screen sizes.


//<Typography>: This component is used for displaying text with predefined styles according to Material Design guidelines. It allows you to apply various typography styles such as headings, paragraphs, captions, etc., to your text content.
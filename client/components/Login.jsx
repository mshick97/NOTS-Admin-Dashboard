import React, { useState, useRef } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CustomSnackbar from './CustomSnackbar.jsx'
import { useNavigate } from "react-router-dom";

const Login = ({ onSuccess }) => {
  const navigate = useNavigate();


  // Hooks and functions below for invoking snackbar functionality on login error/ incorrect credentials
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const openSnackbar = () => {
    setOpen(true);
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };


  // Below hooks and function are for login request to server
  const loginForm = useRef(null);

  function loginAttempt() {
    const url = '/client/admin-login';

    const loginAttempt = loginForm.current;
    const email = loginAttempt["outlined-email-required"].value;
    const password = loginAttempt["outlined-password-input"].value;

    axios.post(url, { email: email, password: password })
      .then(res => {
        if (res.data.validLogin === true) {
          onSuccess(res.data.adminName.firstName);
          return navigate('/customers');
        }

        if (res.data === false) {
          setSnackbarMessage('Invalid email or password');
          return openSnackbar();
        }

      }).catch((err) => {
        setSnackbarMessage('Error while trying to login, please wait and try again');
        openSnackbar();
        return console.log(err);
      });
  }


  return (
    <div id="loginContainer">
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        id="loginForm"
        ref={loginForm}
      >
        <img src={'https://uploads-ssl.webflow.com/6093315d74407812c0b3270c/61574b48f3de49d46e8ab2ff_NOTS%20%26%20Crest%20(BlackFont)-04.svg'} id='crestLogo' />
        <div id='subheadingContainer'>
          <h2 id="loginHeading">Login</h2>
          <h5 id='loginSubheading'>Please provide your NOTS admin email and password, below</h5>
        </div>
        <TextField
          required
          id="outlined-email-required"
          defaultValue=""
          label='emailField'
        />

        <TextField
          required
          id="outlined-password-input"
          type="password"
          autoComplete="current-password"
          label='passwordField'
        />

        <Button
          id='loginButton'
          variant="contained"
          size="medium"
          onClick={() => {
            loginAttempt();
          }}
        >
          Login
        </Button>
      </Box >

      {open ? <CustomSnackbar
        openSnackbar={openSnackbar}
        handleSnackbarClose={handleSnackbarClose}
        message={snackbarMessage}
        severity="error"
      /> : null}

    </div>
  );
}

export default Login;
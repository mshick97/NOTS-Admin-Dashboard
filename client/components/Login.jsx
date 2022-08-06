import React, { Component } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";


const Login = (props) => {
  let emailValue = '';
  let passwordValue = '';
  const { onSuccess } = props;
  const navigate = useNavigate();

  function loginAttempt() {
    const url = 'http://localhost:3000/client/admin-login';
    axios.post(url, { email: emailValue, password: passwordValue })
      .then(res => {
        if (res.data.validLogin === true) {
          onSuccess(res.data.adminName.firstName);
          navigate('/customers');
        }
      });
  }

  function grabCredential(event, type) {
    if (type === 'email') {
      emailValue = event.target.value;
    }
    if (type === 'password') {
      passwordValue = event.target.value;
    }
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
      >
        <img src={'https://uploads-ssl.webflow.com/6093315d74407812c0b3270c/61574b48f3de49d46e8ab2ff_NOTS%20%26%20Crest%20(BlackFont)-04.svg'} id='crestLogo' />
        <div id='subheadingContainer'>
          <h2 id="loginHeading">Login</h2>
          <h5 id='loginSubheading'>Please provide your NOTS admin email and password, below</h5>
        </div>
        <TextField
          required
          id="outlined-required"
          label="Email"
          defaultValue=""
          onChange={(e) => grabCredential(e, "email")} />
        <TextField
          required
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={(e) => grabCredential(e, "password")} />
        <Button variant="contained" size="medium" onClick={loginAttempt} id='loginButton'>
          Login
        </Button>
      </Box >
    </div>
  );
}

export default Login;
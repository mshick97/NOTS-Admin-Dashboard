import React, { useState, useRef, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { axiosPublic } from '../api/axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CustomSnackbar from './CustomSnackbar';

const Login = () => {
  document.title = 'NOTS Admin | Login';

  const navigate = useNavigate();
  const location = useNavigate();
  const from = location.state?.from?.pathname || '/orders';

  // Hooks and functions below for invoking snackbar functionality on login error/ incorrect credentials
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('');

  const [fetching, setFetching] = useState(false); // for loading UI on login

  const openSnackbar = () => {
    setOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    setOpen(false);
  };

  // Below hook and function are for login request to server
  const { setAuth } = useAuth();
  const loginForm = useRef(null);

  function loginAttempt() {
    const LOGIN_URL = '/api/auth';

    // grabs form in current state and pulls values for each field
    const loginAttempt = loginForm.current;
    const email = loginAttempt['outlined-email-required'].value;
    const password = loginAttempt['outlined-password-input'].value;

    if (!email || !password) {
      // if either field are null
      setSnackbarMessage('Please enter your email and password');
      setSnackbarSeverity('warning');
      return openSnackbar();
    }

    setFetching(true); // to toggle loading spinning icon when logging in

    axiosPublic
      .post(LOGIN_URL, { email: email, password: password }, { withCredentials: true })
      .then((res) => {
        if (res.data.validLogin === true) {
          const validLogin = res?.data?.validLogin;
          const accessToken = res?.data?.accessToken;
          const firstName = res?.data?.adminName?.firstName;
          const lastName = res?.data?.adminName?.lastName;

          setAuth({ validLogin, accessToken, firstName, lastName });
          setFetching(false);
          return navigate(from, { replace: true });
        }

        if (res.data === false) {
          setFetching(false);
          setSnackbarMessage('Invalid email or password');
          setSnackbarSeverity('error');
          return openSnackbar();
        }
      })
      .catch((err) => {
        setSnackbarMessage('Error while trying to login, please wait and try again');
        setSnackbarSeverity('error');
        openSnackbar();
        setFetching(false);
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
        ref={loginForm}>
        <img
          src={'https://uploads-ssl.webflow.com/6093315d74407812c0b3270c/61574b48f3de49d46e8ab2ff_NOTS%20%26%20Crest%20(BlackFont)-04.svg'}
          id="crestLogo"
        />
        <div id="subheadingContainer">
          <h2 id="loginHeading">Login</h2>
          <h5 id="loginSubheading">Please provide your NOTS admin email and password, below</h5>
        </div>
        <TextField required id="outlined-email-required" defaultValue="" label="Email" />
        <TextField required id="outlined-password-input" type="password" autoComplete="current-password" label="Password" />

        {fetching ? (
          <div style={{ margin: '6px 0 1px 0' }}>
            <Box sx={{ display: 'flex' }} id="loadingBox">
              <CircularProgress />
            </Box>
          </div>
        ) : (
          <Button
            id="loginButton"
            variant="contained"
            size="medium"
            onClick={() => {
              loginAttempt();
            }}>
            Login
          </Button>
        )}
      </Box>

      {open ? <CustomSnackbar handleSnackbarClose={handleSnackbarClose} message={snackbarMessage} severity={snackbarSeverity} /> : null}
    </div>
  );
};

export default Login;

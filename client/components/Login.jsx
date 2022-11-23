import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ORDERS_ROUTE } from '../constants';
import useAuth from '../hooks/useAuth';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CustomSnackbar from './CustomSnackbar';
import useLogin from '../api/useLogin';

const Login = () => {
  document.title = 'NOTS Admin | Login';

  const navigate = useNavigate();
  const location = useNavigate();
  const from = location.state?.from?.pathname || ORDERS_ROUTE;

  // Hooks and functions below for invoking snackbar functionality on login error/ incorrect credentials
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('');

  const loginAttempt = useLogin();

  const openSnackbar = () => {
    setOpen(true);
  };

  const handleSnackbarClose = () => {
    setOpen(false);
  };

  // Below hook and function are for login request to server
  const { setAuth, auth } = useAuth();
  const loginForm = useRef(null);

  const handleClick = async () => {
    const email = loginForm.current['outlined-email-required'].value;
    const password = loginForm.current['outlined-password-input'].value;

    if (!email || !password) {
      // if either field are null
      setSnackbarMessage('Please enter your email and password');
      setSnackbarSeverity('warning');
      return openSnackbar();
    }

    const loginCreds = { email, password };
    const loginResults = await loginAttempt.mutateAsync(loginCreds);

    if (loginResults.validLogin === true) {
      const validLogin = loginResults.validLogin;
      const accessToken = loginResults.accessToken;
      const firstName = loginResults.adminName?.firstName;
      const lastName = loginResults.adminName?.lastName;

      return setAuth({ validLogin, accessToken, firstName, lastName });
    }

    if (loginResults.validLogin === false) {
      setSnackbarMessage('Invalid email or password');
      setSnackbarSeverity('error');
      return openSnackbar();
    }

    if (loginAttempt.isError) {
      setSnackbarMessage('Error while trying to login, please wait and try again');
      setSnackbarSeverity('error');
      return openSnackbar();
    }
  };

  useEffect(() => {
    if (auth.validLogin === true) navigate(from, { replace: true });
  }, [auth]);

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

        {loginAttempt.isLoading ? (
          <div style={{ margin: '6px 0 1px 0' }}>
            <Box sx={{ display: 'flex' }} id="loadingBox">
              <CircularProgress />
            </Box>
          </div>
        ) : (
          <Button id="loginButton" variant="contained" size="medium" onClick={handleClick}>
            Login
          </Button>
        )}
      </Box>

      {open ? <CustomSnackbar handleSnackbarClose={handleSnackbarClose} message={snackbarMessage} severity={snackbarSeverity} /> : null}
    </div>
  );
};

export default Login;

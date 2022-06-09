import React, { Component } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CustomizedSnackbars() {
  const [open, setOpen] = React.useState(false);

  function handleClick() {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <img src='https://www.svgrepo.com/show/21045/delete-button.svg' className='deleteIcon' variant="outlined" onClick={handleClick} />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
          User successfully deleted from database!
        </Alert>
      </Snackbar>
      {/* <Alert severity="error">This is an error message!</Alert> */}
      {/* <Alert severity="warning">This is a warning message!</Alert> */}
      {/* <Alert severity="info">User successfully deleted from database!</Alert> */}
      {/* <Alert severity="success">This is a success message!</Alert> */}
    </Stack>
  );
}

export default CustomizedSnackbars;
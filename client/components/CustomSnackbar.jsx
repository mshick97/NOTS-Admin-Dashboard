import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// Note: severity levels for snackbar are "error"(red), "warning"(orange), "info"(blue), "success"(green)
export default function CustomSnackbar(props) {
  const {
    handleSnackbarClose,
    message,
    severity,
  } = props;

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>

      <Snackbar open={true} autoHideDuration={5000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>

    </Stack>
  );
}
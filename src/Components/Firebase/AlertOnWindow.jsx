import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


export default function AlertOnWindow(props) {
  const { openState, message, alertType  } = props;
  const [open, setOpen] = openState;

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    // https://mui.com/material-ui/react-snackbar/
    <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
      <MuiAlert
        elevation={5}
        variant="filled"
        onClose={handleClose}
        severity={alertType}
        sx={{ width: '100%' }}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
}



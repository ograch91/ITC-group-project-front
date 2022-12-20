import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useEffect, useState } from 'react';

export default function AlertOnWindow(props) {
  const { openState, message, alertType, timeToDisp } = props;
  const [open, setOpen] = openState;

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  // https://stackoverflow.com/a/74437078/18308054

  const [timer, setTimer] = useState();
  useEffect(() => {
    clearTimeout(timer);
    const timeout = setTimeout(() => {
      setOpen(false);
    },timeToDisp || 5000);
    setTimer(timeout);
    // Cleanup function
    return () => clearTimeout(timeout);
  }, [message]);

  return (
    // https://mui.com/material-ui/react-snackbar/
    <Snackbar open={open} onClose={handleClose}>
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

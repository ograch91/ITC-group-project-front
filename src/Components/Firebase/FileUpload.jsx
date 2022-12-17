import { useState } from 'react';
import { storage } from './MyApp';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import Button from '@mui/material/Button';
import * as React from 'react';
import { green } from '@mui/material/colors';
import UploadButton from './UploadButton';
import AlertOnWindow from './AlertOnWindow';
import { UserAuthContext } from '../../Context/UserAuthContext';
// import { UserAuthContext } from '../Context/UserAuthContext';
const { v4: uuidv4 } = require('uuid');

export const FileUpload = props => {
  const [auth, setAuth] = React.useContext(UserAuthContext);
  const loadingState = React.useState(false);
  const successState = React.useState(false);
  const openState = React.useState(false);
  const [message, setMessage] = useState('');
  const [alertType, setAlertType] = useState('info');

  // const [auth, setAuth] = useContext(UserAuthContext);

  // State to store uploaded file
  const [file, setFile] = useState(null);

  // progress
  const [loading, setLoading] = loadingState;
  const [success, setSuccess] = successState;
  const [open, setOpen] = openState;
  const isButtonDisabled = !file || loading || success;

  // Handle file upload event and update state
  function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) {
      setFile(null);
      return;
    }
    if (file.size > 1000000) {
      setFile(null);
      alert('File size is too big - please select a file less than 1MB');
      return;
    }
    setFile(file);
    updateUploadStatus('fileSelected');
  }

  const updateUploadStatus = status => {
    switch (status) {
      case 'loading':
        setLoading(true);
        setSuccess(false);
        break;
      case 'success':
        setLoading(false);
        setSuccess(true);
        break;
      case 'error':
        setLoading(false);
        setSuccess(false);
        break;
      case 'fileSelected':
        setLoading(false);
        setSuccess(false);
        setOpen(false);  // close alert when file is selected
        break;
      default:
        break;
    }
    updateAlert(status);
  };

  const updateAlert = status => {
    switch (status) {
      case 'success':
        setMessage('Image uploaded successfully');
        setAlertType('success');
        break;
      case 'error':
        setMessage('Error uploading image');
        setAlertType('error');
        break;
      case 'loading':
        setMessage('Uploading image... Please wait');
        setAlertType('info');
        break;
      default:
        // irelevant status do  nothing
        return;
    }
    setOpen(true);
  };

  const updateToBackend = async imgurl => {
    const url = `http://localhost:4000/users/setphoto`;
     // const token = auth?.token; todo:
    const token = auth?.token;
 
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token|| '',
      },
      body: JSON.stringify({ photo: imgurl }),
    };
    const resp = await fetch(url, options);
    return resp.ok;
  };

  const handleUpload = () => {
    // if (!file) {
    //   alert('Please upload an image first!');
    // }
    const storageRef = ref(
      storage,
      //use user uuid as filename
      `/user/profile-pic/${props.filename || uuidv4()}`
    );

    const uploadTask = uploadBytesResumable(storageRef, file);
    updateUploadStatus('loading');

    uploadTask.on(
      'state_changed',
      snapshot => {},
      err => {
        updateUploadStatus('error');
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        console.log(url);
        const ok = await updateToBackend(url);
        if (!ok) {
        updateUploadStatus('error');
          alert('Image upload failed');
          return;
        }
        // setAuth({ ...auth, user: { ...auth.user, photo: url } });
        updateUploadStatus('success');
        setAuth({ ...auth, user: { ...auth.user, photo: url } });
      }
    );
  };

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <Button variant="contained" component="label" disabled={loading}>
        Choose File
        <input
          hidden
          accept="image/*"
          multiple={false}
          type="file"
          onChange={handleFileSelect}
        />
      </Button>

      <UploadButton
        handleButtonClick={handleUpload}
        loadingState={loadingState}
        successState={successState}
        isButtonDisabled={isButtonDisabled}
      />
      <AlertOnWindow
        openState={openState}
        message={message}
        alertType={alertType}
      />
    </div>
  );
};

import './Profile.css';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
// import { AuthModalContext } from '../../Context/AuthModalContext';
import { useContext, useEffect, useState } from 'react';
import { ImageUploadModal } from './ImageUploadModal';
import { useApi } from '../../Hooks/UseApi';
import { FileUpload } from '../Firebase/FileUpload';
// import { EditProfileModal } from './EditProfileModal';

export const ProfileDetails = props => {
  const { user, userId, isOtherUser } = props;
  console.log(props);
  const [edit, setEdit] = useState(false);
  const [upload, setUpload] = useState(false);
  // const handeOpenUpload = () => console.log("upload");;
  const handeOpenUpload = () => !isOtherUser && setUpload(true);

  const handleOpenEdit = () => setEdit(true);

  // let data, isLoading, err;
  // useEffect(() => {
    
  //   const {data_, isLoading_, err_} =  useApi('get', `users/${userId}`, 'user')
  //   data = data_;
  //   isLoading = isLoading_;
  //   err = err_;
  // }, []);
  // console.log(isLoading);
  return (
    <div>
      <div className="container">
        <div>
          {/* https://stackoverflow.com/questions/67104652/hover-effect-change-your-picture-with-icon-on-profile-picture */}
          <a onClick={handeOpenUpload}>
          <img src={user.photo || './profile.png'} />
            
            {!isOtherUser && <div>Edit Photo</div>}
          </a>
          
        </div>
        <div>
          {isOtherUser ? (
            <p>{user.name}'s Profile</p>
          ) : (
            <p>Your Profile ({user.name})</p>
          )}
          <div>Name: {user.name}</div>
          <div>Email: {user.email}</div>
          <div>Phone: {user.phone}</div>
        </div>
      </div>
      {!isOtherUser && (
        <Button
          className="submit-button"
          color="primary"
          variant="contained"
          type="submit"
          size="large"
          endIcon={<LoginIcon />}
          onClick={handleOpenEdit}
          // disabled={isOtherUser}
        >
          Edit Profile
        </Button>
        
      )}
      {/* <EditProfileModal openState={[edit, setEdit]} user={user}/> */}
      <ImageUploadModal open={upload} setOpen={setUpload} />
    </div>
  );
};

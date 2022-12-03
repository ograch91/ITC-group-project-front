import './Profile.css';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
// import { AuthModalContext } from '../../Context/AuthModalContext';
import { useContext, useState } from 'react';
import { ImageUploadModal } from './ImageUploadModal';

export const ProfileDetails = props => {
  const { user, userId, isOtherUser } = props;
  // const [edit, setEdit] = useContext(AuthModalContext);
  const [upload, setUpload] = useState(false);
  const handeOpenUpload = () => !isOtherUser && setUpload(true);

  // const handleOpenEdit = () => setEdit(true);

  return (
    <div>
      <div className="container">
        <div>
          {/* https://stackoverflow.com/questions/67104652/hover-effect-change-your-picture-with-icon-on-profile-picture */}
          <a onClick={handeOpenUpload}>
            <img src={user.image || './profile.png'} />
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
          // onClick={handleOpenEdit}
          // disabled={isOtherUser}
        >
          Edit Profile
        </Button>
      )}

      {/* <ImageUploadModal open={upload} setOpen={setUpload} /> */}
    </div>
  );
};

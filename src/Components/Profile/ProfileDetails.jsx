import { useContext, useEffect, useState } from 'react';
import { ImageUploadModal } from './ImageUploadModal';
import { EditProfileModal } from './EditProfileModal';
import PhotoIcon from '@mui/icons-material/MonochromePhotos';
import EditHuman from '@mui/icons-material/ManageAccounts';
import LargePhoto from '@mui/icons-material/ZoomOutMap';
import { IconButton, Tooltip } from '@mui/material';
import { AlertOnAppContext } from '../../Context/AlertOnAppContext';
import { Modal } from '../Modal/Modal';
import './Profile.css';

export const ProfileDetails = props => {
  const [openModal, setOpenModal] = useState(false);
  const { showAppAlert } = useContext(AlertOnAppContext);

  const { user, userId, isOtherUser } = props;
  const editState = useState(false);
  const [edit, setEdit] = editState;
  const [upload, setUpload] = useState(false);
  const handeOpenUpload = () => !isOtherUser && setUpload(true);

  const handleOpenEdit = () => setEdit(true);

  useEffect(() => {}, []);

  const ToClipboard = ({ text }) => {
    const handleClick = () => {
      navigator.clipboard.writeText(text);
      showAppAlert('Copied to clipboard: ' + text, 'success');
    };

    return (
      <span onClick={handleClick} className="hover">
        {text}
      </span>
    );
  };

  return (
    <div>
      <div className="container">
        <div>
          <img src={user.photo || './profile.png'} />
        </div>
        <div>
          {isOtherUser ? (
            <p>{user.name}'s Profile</p>
          ) : (
            <p>{`Your Profile ${user.name}`}</p>
          )}
          <div>
            Name: <ToClipboard text={user.name} />
          </div>
          <div>
            Email: <ToClipboard text={user.email} />{' '}
          </div>
          <div>
            Phone: <ToClipboard text={user.phone} />
          </div>
        </div>
      </div>
      <div className="edit-profile">
        <Tooltip title="Full Size Photo">
          <IconButton onClick={() => setOpenModal(true)}>
            <LargePhoto />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit Photo">
          <IconButton onClick={handeOpenUpload}>
            <PhotoIcon />
          </IconButton>
        </Tooltip>

        {!isOtherUser && (
          <Tooltip title="Edit Profile">
            <IconButton onClick={handleOpenEdit}>
              <EditHuman />
            </IconButton>
          </Tooltip>
        )}

        <EditProfileModal openState={editState} user={user} />
        <ImageUploadModal open={upload} setOpen={setUpload} />
      </div>
      <Modal
        image={user.photo}
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
};

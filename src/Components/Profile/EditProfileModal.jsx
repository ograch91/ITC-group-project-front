import { useContext } from 'react';
import { Modal } from '@mui/material';
// import { BeforeAuthTabs } from './BeforeAuthTabs';
import { EditAuthTabs } from './EditAuthTabs';
// import { UserAuthContext } from '../../Context/UserAuthContext';
import { useState } from 'react';
// import { AuthModalContext } from '../../Context/AuthModalContext';
export const EditProfileModal = (props) => {
  // const [auth, setAuth] = useContext(UserAuthContext);
  // const isUser = auth.isAuth;

  const [open, setOpen] = props.openState;
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        keepMounted
      >
         <EditAuthTabs user={props.user}/>
      </Modal>
    </div>
  );
};

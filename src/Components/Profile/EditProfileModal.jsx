import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Modal } from '@mui/material';
import { useState } from 'react';
import { Signup } from '../Auth/Signup';
export const EditProfileModal = props => {
  // const [auth, setAuth] = useContext(UserAuthContext);
  // const isUser = auth.isAuth;

  const [open, setOpen] = props.openState;
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = useState('1');

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        keepMounted
      >
        <Box sx={style}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Edit Profile" value="1" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Signup userDetails={props.user} openState={props.openState} />
            </TabPanel>
          </TabContext>
        </Box>
      </Modal>
    </div>
  );
};

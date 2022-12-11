import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
// import { SignupUpdateForm } from './SignupUpdateForm';
import { useContext, useState } from 'react';
// import { UserAuthContext } from '../../Context/UserAuthContext';
import { Signup } from '../Auth/Signup';
export const EditAuthTabs = (props) => {
  // const [auth, setAuth] = useContext(UserAuthContext);

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

  const [value, setValue] = useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={style}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Edit Profile" value="1" />
          </TabList>
        </Box>
        <TabPanel value="1">
            <Signup userDetail={props.userw}/>
          {/* <SignupUpdateForm userDetails={auth.user} />{' '} */}
        </TabPanel>
      </TabContext>
    </Box>
  );
};

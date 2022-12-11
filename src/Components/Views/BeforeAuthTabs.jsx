import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState ,useContext} from 'react';
import { Signup } from '../Auth/Signup';
import { Login } from '../Auth/Login';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { NavigationStateContext } from '../../Context/NavigationStateContext';

export const BeforeAuthTabs = () => {
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

  //Routing for testing purposes
  const{setIsAuth}= useContext(NavigationStateContext);
  const navigate = useNavigate();

  const handleSubmit =()=>{
    setIsAuth(true);
    return navigate("/home", { replace: true });
  }

  return (
    // add welcome message bla bla
    <Box sx={style}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Login" value="1" />
            <Tab label="SignUp" value="2" />
            <Tab label="TestAuth" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Login />
        </TabPanel>
        <TabPanel value="2">
          <Signup />
        </TabPanel>
        <TabPanel value="3">
          <Button  onClick={() => handleSubmit()}>SetLogin</Button>
        </TabPanel>
      </TabContext>
    </Box>
  );
};

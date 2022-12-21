import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useContext, useState } from 'react';
import { Signup } from '../Auth/Signup';
import { Login } from '../Auth/Login';
import { UserAuthContext } from '../../Context/UserAuthContext';
import { useNavigate } from 'react-router-dom';
import { Header } from '../StaticElements/Header/Header';
import logo from '../../Assets/NewLogo.png';
import styles from '../Views/BeforeAuthTabs.module.css';

export const BeforeAuthTabs = () => {
  const [auth, setAuth] = useContext(UserAuthContext);
  const navigate = useNavigate();

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
  };

  const [value, setValue] = useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (auth.isAuth) {
    navigate('/home', { replace: true });
  }
  return (
    <>
      {value === '1' ? (
        <>
          {' '}
          <div className={styles.AppHeader}>
            <Header title="Welcome to Messaging App" />
            <img src={logo} alt="logo" />
          </div>{' '}
        </>
      ) : (
        ''
      )}
      <Box sx={style}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Login" value="1" />
              <Tab label="SignUp" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Login />
          </TabPanel>
          <TabPanel value="2">
            <Signup setValue={setValue} />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

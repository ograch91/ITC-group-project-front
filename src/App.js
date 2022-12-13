import * as React from 'react';
import { useContext } from 'react';
import { Navbar } from './Components/Layout/Navbar/Navbar';
import { HomePage } from './Components/Views/HomePage/HomePage';
import { BeforeAuthTabs } from './Components/Views/BeforeAuthTabs';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { ProfilePage } from './Components/Views/ProfilePage/ProfilePage';
import { GlobalAppAlert } from './Components/StaticElements/GlobalAppAlert';
import './App.css';
import { UserAuthContext } from './Context/UserAuthContext';
import localforage from 'localforage';
import { Backdrop, CircularProgress } from '@mui/material';
import { AlertOnAppContext } from './Context/AlertOnAppContext';

function App() {
  const { showAppAlert } = useContext(AlertOnAppContext);

  const [auth, setAuth] = useContext(UserAuthContext);
  const location = useLocation();

  const isAuth = auth?.isAuth;
  const navigate = useNavigate();

  React.useEffect(() => {
    const loadAuth = async () => {
      const savedAuth = await localforage.getItem('auth');
      if (!savedAuth || !savedAuth.token) {
        setAuth({ ...auth, loadingDone: true });
        navigate('/welcome', { replace: true });
        return;
      }
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: savedAuth.token,
        },
      };
      const resp = await fetch('http://localhost:4000/users/ping', options);
      if (!resp.ok) {
        setAuth({ ...auth, loadingDone: true });
        navigate('/welcome', { replace: true });
        return;
      }
      setAuth(savedAuth);
      if (savedAuth.isAuth && location.pathname === '/welcome') {
        // showAppAlert(`Welcome back ${auth.user.name}!`, 'success')
        navigate('/home', { replace: true });
      }
      if (!savedAuth.isAuth && location.pathname !== '/welcome') {
        navigate('/welcome', { replace: true });
      }
    };
    loadAuth();
  }, []);

  if (!auth.loadingDone) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
  return (
    <div className="App">
      {isAuth && <Navbar />}
      <Routes>

        <Route path="/welcome" element={<BeforeAuthTabs />} />
        <Route
          path="/home"
          element={isAuth ? <HomePage /> : <Navigate to="/welcome" />}
        />
        <Route
          path="/profile"
          element={isAuth ? <ProfilePage /> : <Navigate to="/welcome" />}
        />
        <Route
          path="/"
          element={
            isAuth ? <Navigate to="/home" /> : <Navigate to="/welcome" />
          }
        />
        {/* 👇️ redirect to default or possible 404 page when user goes to */}
        {/* <Route path="/*" element={isAuth?  <h2>404 page directing to HomePage</h2> :  <h2>404 page directing to to welcome Signin</h2>  } /> */}
      </Routes>
      <GlobalAppAlert />
    </div>
  );
}

export default App;

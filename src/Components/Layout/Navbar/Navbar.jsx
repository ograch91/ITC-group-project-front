import { Button } from '@mui/material';
import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserAuthContext } from '../../../Context/UserAuthContext';
import { currentPageContext } from '../../../Context/CurrentPageContext';
import localforage from 'localforage';
import logo from '../../../Assets/NewLogo.png';
import styles from './Navbar.module.css';

export const Navbar = () => {
  const { currentPage } = useContext(currentPageContext);
  const [auth, setAuth] = useContext(UserAuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({ ...auth, user: null, isAuth: false, token: null });
    localforage.removeItem('auth');
    return navigate('/welcome', { replace: true });
  };

  return (
    <div className={styles.placeholder}>
      <div className={styles.HoverArea}>
        <div className={styles.Navbar}>
          <div className={styles.between}>
            <img src={logo} alt="logo" />
            {currentPage.Chat && <Link to="/profile">Profile</Link>}
            {currentPage.Profile && <Link to="/home">Chats</Link>}
            <Button onClick={() => handleLogout()} variant="text">
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

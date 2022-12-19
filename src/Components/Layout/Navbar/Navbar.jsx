import { Button } from "@mui/material";
import { useContext, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserAuthContext } from "../../../Context/UserAuthContext";
import localforage from "localforage";
import logo from "../../../Assets/logo.png";
import styles from "./Navbar.module.css";

export const Navbar = () => {
  const [auth, setAuth] = useContext(UserAuthContext);
  const navigate = useNavigate();

  const isHover = useRef();

  const handleLogout = () => {
    setAuth({ ...auth, user: null, isAuth: false, token: null });
    localforage.removeItem("auth");
    return navigate("/welcome", { replace: true });
  };

  return (
    <div className={styles.placeholder}>
      <div className={styles.HoverArea}>
        <div className={styles.Navbar}>
          <div className={styles.between}>
            <img src={logo} alt="logo" />
            <Link to="/profile">Profile</Link>
            <Link to="/home">Home</Link>
            <Button onClick={() => handleLogout()} variant="text">
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

import { Button } from "@mui/material";
import logo from "../../../Assets/logo.png";
import styles from "./Navbar.module.css";

export const Navbar = () => {
  return (
    <div className={styles.HoverArea}>
    <div className={styles.Navbar}>
      <div className={styles.between}>
        <img src={logo} alt="logo" />
        <Button>Profile</Button>
        <Button>Home</Button>
        <Button>Search</Button>
      </div>
    </div>
    </div>
  );
};

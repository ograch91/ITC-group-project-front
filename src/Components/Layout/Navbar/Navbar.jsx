import { Button } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../Assets/logo.png";
import { NavigationStateContext } from "../../../Context/NavigationStateContext";
import styles from "./Navbar.module.css";

export const Navbar = () => {

  const{setIsAuth}=useContext(NavigationStateContext);
  const navigate = useNavigate();

  const handeClick=()=>{
    setIsAuth(false);
    return navigate("/", { replace: true });
  }

  return (
    <div className={styles.HoverArea}>
    <div className={styles.Navbar}>
      <div className={styles.between}>
        <img src={logo} alt="logo" />
        <Button>Profile</Button>
        <Button>Home</Button>
        <Button>Search</Button>
        <Button onClick={()=>handeClick()}>Logout</Button>
      </div>
    </div>
    </div>
  );
};

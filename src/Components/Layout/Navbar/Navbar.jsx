import { Button } from "@mui/material";
import { useContext } from "react";
import { useNavigate,Link } from "react-router-dom";
import logo from "../../../Assets/logo.png";
import { NavigationStateContext } from "../../../ContextProviders/NavigationStateContext";
import styles from "./Navbar.module.css";

export const Navbar = () => {

  const{setIsAuth}=useContext(NavigationStateContext);
  const navigate = useNavigate();

  const handleClick=()=>{
    setIsAuth(false);
    return navigate("/welcome", { replace: true });
  }

  return (
    <div className={styles.HoverArea}>
    <div className={styles.Navbar}>
      <div className={styles.between}>
        <img src={logo} alt="logo" />
        {/* when profile implement create new route */}
        <Link to="/Setting">Profile</Link>
        <Link to="/home">Home</Link>
        <Button onClick={()=>handleClick()} variant="text">Logout</Button>
      </div>
    </div>
    </div>
  );
};

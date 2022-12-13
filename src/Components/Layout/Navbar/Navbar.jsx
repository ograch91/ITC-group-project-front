import { Button } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { NavigationStateContext } from "../../../ContextProviders/NavigationStateContext";
import logo from "../../../Assets/logo.png";
import styles from "./Navbar.module.css";

export const Navbar = () => {

  const{setIsAuth}=useContext(NavigationStateContext);
  const navigate = useNavigate();

  // const [isOver,setIsOver] = useState(false);
  

  const handleClick=()=>{
    setIsAuth(false);
    return navigate("/welcome", { replace: true });
  }

  const handleNav = ()=>{
  //  return setIsOver(!isOver);
  }

  return (
    <div className={styles.HoverArea}>
    <div className={styles.Navbar}>
      <div className={styles.between}>
        <img src={logo} alt="logo" />
        <Link to="/profile">Profile</Link>
        <Link to="/home">Home</Link>
        <Button onClick={()=>handleClick()} variant="text">Logout</Button>
      </div>
    </div>
    </div>
  );
};

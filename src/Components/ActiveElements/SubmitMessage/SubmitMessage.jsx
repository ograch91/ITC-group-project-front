import { Button } from "@mui/material";
import React, { useState }  from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./SubmitMessage.module.css";


export const SubmitMessage = () => {
  
  const[message,setMessage]=useState({
    id:uuidv4(),
    sender:'mosh',
    chatid:43534,
    datesent:"",
    content:""
  });
  
  const handleSubmit =(e)=>{
    e.preventDefault();


  }

  return (
    <div className={styles.SubmitMessage}>
      <textarea
        className={styles.form}
        placeholder="What you have in mind..."
        value={message.content}
        onChange={(e)=>setMessage((message)=>{return {...message,content:e.target.value}})}
      />
      <Button onClick={(e)=>handleSubmit(e)}>Send</Button>
    </div>
  );
};

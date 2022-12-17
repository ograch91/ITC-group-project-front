import { Button } from "@mui/material";
import React, { useContext, useState }  from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { baseUrl } from "../../../Hooks/UseApi";
import styles from "./SubmitMessage.module.css";
import { currentChatContext } from "../../../Context/CurrentChatContext";


export const SubmitMessage = () => {

  const {currentChat} = useContext(currentChatContext);
  
  const[message,setMessage]=useState({
    id:uuidv4(),
    sender:'mosh',
    chatid:currentChat,
    datesent:"",
    content:""
  });
  
  const handleSubmit =(e,message)=>{
    e.preventDefault();
    let date = new Date();
    date = date.toLocaleString();
    const newMessage = {...message, datesent: date};
    axios.post(`${baseUrl}/messages/`,newMessage).
    catch(function (error) {
      console.log(error);
    });
    setMessage({...message,datesent:"",content:""});
  }

  //add disable feature to button if no chatid 

  return (
    <div className={styles.SubmitMessage}>
      <textarea
        className={styles.form}
        placeholder="What you have in mind..."
        value={message.content}
        onChange={(e) =>
          setMessage((message) => {
              return { ...message, content: e.target.value };
            })
            }
       
      />
      <Button onClick={(e)=>handleSubmit(e,message)}>Send Message</Button>
    </div>
  );
};

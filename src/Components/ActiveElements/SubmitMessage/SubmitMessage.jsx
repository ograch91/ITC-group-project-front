import { Button } from "@mui/material";
import React, { useContext, useEffect, useRef, useState }  from "react";
import { v4 as uuidv4 } from "uuid";
import { baseUrl } from "../../../Hooks/UseApi";
import { currentChatContext } from "../../../Context/CurrentChatContext";
import axios from "axios";
import styles from "./SubmitMessage.module.css";



export const SubmitMessage = () => {

  const {currentChat} = useContext(currentChatContext);
  const{isDisable}=useRef(false);
  
  useEffect(()=>{
    if(currentChat.length>0){
      isDisable.current=false;
    }
    isDisable.current=true;

    return (()=>{
      isDisable.current=true;
    })
  },[currentChat])


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
      <Button onClick={(e)=>handleSubmit(e,message)} disable={isDisable.current? true:false }>Send Message</Button>
    </div>
  );
};

import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Message } from "../../StaticElements/Message/Message";
import { v4 as uuidv4 } from "uuid";
import { SubHeader } from "../../StaticElements/SubHeader/SubHeader";
import { baseUrl } from "../../../Hooks/UseApi";
import axios from "axios";
import styles from "./ChatWindow.module.css";

export const ChatWindow = () => {

  
  const [messageList, setMessageList] = useState([]);
  const [currentChat,setCurrentChat] =useState("cfa29b17-4079-4fbb-a050-428bb2af5c12");
  // const [currentChat,setCurrentChat] =useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(`${baseUrl}/messages/getChat/${currentChat}`);

      const newMessages = data.data.data;

      setMessageList(newMessages);
    };
    fetchData();

    return (()=>{
      setMessageList([]);
    })
  }, []);

  const handleClick = () => {
    console.log("Modal pop up");
  };

  return (
    <div className={styles.ChatWindow}>
        <SubHeader func={handleClick}>
          <img></img>UserName
        </SubHeader>
      <div className={styles.MessageContainer}>
        {messageList? 
           messageList.map((message) => {
              return <Message key={uuidv4()} {...message} />;
            })
          : ( <h3>No Messages</h3>)}
      </div>
    </div>
  );
};

import { useState } from "react";
import { Button } from "@mui/material";
import styles from "./ChatWindow.module.css";

export const ChatWindow = () => {

  const [chatList,setChatList ] = useState([]);
  let id =0;
  console.log(chatList);

  return (
    <div className={styles.ChatWindow}>
    <div className={styles.MessageContainer}>
      {chatList.length>0? (chatList.map((chat) => {
       
          {/* return <Messagge key={id} {...chat} />; */}
         return <h3 id={id++}>test msg</h3>
        })
      ) : (<Button>Search For Users</Button>   
      )}
    </div>
    </div>
  );
};

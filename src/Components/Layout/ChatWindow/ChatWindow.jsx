import { useState } from "react";
import { Button } from "@mui/material";
import { Message } from "../../StaticElements/Message/Message";
import { v4 as uuidv4 } from "uuid";
import styles from "./ChatWindow.module.css";
import { SubHeader } from "../../StaticElements/SubHeader/SubHeader";


export const ChatWindow = () => {

  const [chatList,setChatList ] = useState([{
    id:uuidv4(),
    sender:'mosh',
    dateSent:"03.02.01",
    content:"blah blah",
  },{
    id:uuidv4(),
    sender:'moshJunior',
    dateSent:"03.05.21",
    content:"Yada Yada",
  },{
    id:uuidv4(),
    sender:'zitisn',
    dateSent:"33.55.42",
    content:"Illum Ipsum...",
  }]);

  let id =0;

  return (
    <div className={styles.ChatWindow}>
    <div className={styles.MessageContainer}>
    <SubHeader text="Current Chat"/>
      {chatList.length>0? (chatList.map((chat) => {
          return <Message key={chat.id} {...chat} />;
        })
      ) : (<Button>Search For Users</Button>   
      )}
    </div>
    </div>
  );
};

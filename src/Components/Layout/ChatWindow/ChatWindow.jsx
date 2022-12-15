import { useState } from "react";
import { Button } from "@mui/material";
import { Message } from "../../StaticElements/Message/Message";
import { v4 as uuidv4 } from "uuid";
import { SubHeader } from "../../StaticElements/SubHeader/SubHeader";
import { LoadAndRender } from "../../APILoaded/LoadAndRender";
import styles from "./ChatWindow.module.css";

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

  <LoadAndRender  />

  return (
    <div className={styles.ChatWindow}>
    <div className={styles.MessageContainer}>
    <SubHeader><img></img>UserName</SubHeader>
    <LoadAndRender method="get"  />
      {chatList.length>0? (chatList.map((chat) => {
          return <Message key={chat.id} {...chat} />;
        })
      ) : (<Button>Search For Users</Button>   
      )}
    </div>
    </div>
  );
};

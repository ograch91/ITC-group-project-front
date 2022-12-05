import { useState } from "react";
import styles from "./ChatWindow.module.css";

export const ChatWindow = () => {

  const [chatList,setChatList ] = useState(['a','b','c']);
  let id = 0;

  return (
    <div className={styles.ChatWindow}>
      {chatList ? 
        chatList.map((chat) => {
          id++;
          {/* return <ChatMsg key={chat.id} {...chat} />; */}
          return <h3 key={id}>{chat}</h3>
        })
      : <h3>Loading Chats...</h3>}
    </div>
  );
};

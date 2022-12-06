
import { useState } from "react";
import { SubHeader } from "../../StaticElements/SubHeader/SubHeader";
import { v4 as uuidv4 } from "uuid";
import styles from "../ChatList/ChatList.module.css";


export const ChatList = ({ header, list, type }) => {

  const[chatList,setChatList]=useState(['s','a','c']);

  return (
    <div className={styles.ChatList}>
      <ul className={styles.ChatList}>
      <SubHeader text="Current Chats"/>
        {chatList.length>0?
          (
            chatList.map((listItem) => {
            const id = uuidv4();
            return (
              <div className={styles.chatItem} key={id} >
              <li>User blah blah</li>
              <p>lastDate</p>
              </div>
            );
          })
        ) :(
            <h3>loading...</h3>
        )}
      </ul>
    </div>
  );
};

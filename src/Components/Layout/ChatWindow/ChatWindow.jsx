import { useContext, useRef } from "react";
import { Message } from "../../StaticElements/Message/Message";
import { SubHeader } from "../../StaticElements/SubHeader/SubHeader";
import { currentChatContext } from "../../../Context/CurrentChatContext";
import styles from "./ChatWindow.module.css";
import { MainDataContext } from "../../../Context/MainDataContext";

export const ChatWindow = () => {
  const { currentChat } = useContext(currentChatContext);
  const mainData = useContext(MainDataContext);
  const messageList = mainData?.data.messagesPerChat;
  const otherUsers = mainData?.data.otherUsers;
  const isChat = useRef(false);

  const nestedMessages = [];

  messageList.forEach((messages) => {
    if (messages.chatId === currentChat.chatid) {
      messages.messages.forEach((message) => {
        nestedMessages.push(message);
      });
    }
  });

  const handleClick = () => {
    console.log("Modal pop up");
  };

  return (
    <div className={styles.ChatWindow}>
      <SubHeader func={handleClick}>
        {isChat.current ? (
          <>
            <img src={currentChat.userPhoto} alt="user photo"></img>
            {currentChat.userName}{" "}
          </>
        ) : (
          <div className={styles.noimage}>Welcome!</div>
        )}
      </SubHeader>
      <div className={styles.MessageContainer}>
        {currentChat.chatid ? (
          nestedMessages.map((message) => {
            let sender = "";
            otherUsers.map((user) => {
              if (user.id === message.sender) {
                return (sender = user.name);
              }
            });
            isChat.current = true;
            return <Message key={message._id} userName={sender} {...message} />;
          })
        ) : (
          <h3>No Messages</h3>
        )}
      </div>
    </div>
  );
};

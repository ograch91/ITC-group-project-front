import { useContext, useEffect, useRef } from 'react';
import { Message } from '../../StaticElements/Message/Message';
import { SubHeader } from '../../StaticElements/SubHeader/SubHeader';
import { currentChatContext } from '../../../Context/CurrentChatContext';
import styles from './ChatWindow.module.css';
import { MainDataContext } from '../../../Context/MainDataContext';
import { ScrollToBottom } from './ScrollToHere';

export const ChatWindow = () => {
  const { currentChat } = useContext(currentChatContext);
  const mainData = useContext(MainDataContext);
  const messageList = mainData?.data.messagesPerChat;
  const messagesPerChat = mainData?.data.messagesPerChat;
  const otherUsers = mainData?.data.otherUsers;

  useEffect(() => {}, []);
  const chatId = currentChat.chatid;
  const headerId = mainData.getters.getOtherUserId(chatId);
  const headerDetails = mainData.getters.getOtherUserDetails(headerId);

  const messagesForCurrentChat = messagesPerChat?.find(
    chat => chat.chatId === chatId
  )?.messages;

  const handleClick = () => {
    console.log('Modal pop up');
  };

  const messagesEnd = useRef();

  const scrollToBottom = () => {
    messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className={styles.ChatWindow}>
      <SubHeader func={handleClick}>
        {chatId ? (
          <>
            <img src={headerDetails.photo} alt="user photo"></img>
            <span>{headerDetails.name}</span>
          </>
        ) : (
          <div className={styles.noimage}>Welcome!</div>
        )}
      </SubHeader>
      <div className={styles.MessageContainer}>
        {
          !messagesForCurrentChat
            ? <h3 key={0}>No messages yet - start a conversation!</h3>
            :
          messagesForCurrentChat?.map(message => {
            return <Message key={message.id} {...message} />;
          })
        }
        <ScrollToBottom />
      </div>
    </div>
  );
};

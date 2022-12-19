import { useContext, useEffect } from 'react';
import { Message } from '../../StaticElements/Message/Message';
import { SubHeader } from '../../StaticElements/SubHeader/SubHeader';
import { currentChatContext } from '../../../Context/CurrentChatContext';
import styles from './ChatWindow.module.css';
import { MainDataContext } from '../../../Context/MainDataContext';

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

  return (
    <div className={styles.ChatWindow}>
      <SubHeader func={handleClick}>
        {headerDetails ? (
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
            ? 'No messages yet - start a conversation!'
            :
          messagesForCurrentChat?.map(message => {
            return <Message key={message._id} {...message} />;
          })
        }
      </div>
    </div>
  );
};

import { useContext } from 'react';
import { Message } from '../../StaticElements/Message/Message';
import { SubHeader } from '../../StaticElements/SubHeader/SubHeader';
import { currentChatContext } from '../../../Context/CurrentChatContext';
import { v4 as uuidv4 } from 'uuid';
import styles from './ChatWindow.module.css';
import { MainDataContext } from '../../../Context/MainDataContext';

export const ChatWindow = () => {
  const { currentChat } = useContext(currentChatContext);
  const mainData = useContext(MainDataContext)

  const messageList = mainData?.data.messagesPerChat;

  
  console.log("currentChat",currentChat);
  console.log('messageList',messageList);
  console.log('mainData',mainData);

  const handleClick = () => {
    console.log('Modal pop up');
  };

  return (
    <div className={styles.ChatWindow}>
      <SubHeader func={handleClick}>
        <img></img>UserName
      </SubHeader>
      <div className={styles.MessageContainer}>
        { 
           messageList.map((messages) => {
            const currentMsg = mainData.getters.getMessagesForChat(messages.id);
           return currentMsg.map((message)=>{
            console.log(message);
              return <Message key={message._id} sender={message.sender} datesent={message.datesent} content={message.content}  />;
            })
            })
         }
      </div>
    </div>
  );
};

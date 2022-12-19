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
  const messageList = mainData?.getters.getMessagesForChat(currentChat);
  
  const handleClick = () => {
    console.log('Modal pop up');
  };

  return (
    <div className={styles.ChatWindow}>
      <SubHeader func={handleClick}>
        <img></img>UserName
      </SubHeader>
      {/* <div className={styles.MessageContainer}>
         <Message
          key={uuidv4()}
           content="bla2" 
          datesent="2424234"
          sender="mosh"
        /> 
      </div> */}
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

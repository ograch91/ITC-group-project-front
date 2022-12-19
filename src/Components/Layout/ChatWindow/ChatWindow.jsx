import { useContext } from 'react';
import { Message } from '../../StaticElements/Message/Message';
import { SubHeader } from '../../StaticElements/SubHeader/SubHeader';
import { currentChatContext } from '../../../Context/CurrentChatContext';
import styles from './ChatWindow.module.css';
import { MainDataContext } from '../../../Context/MainDataContext';

export const ChatWindow = () => {
  const { currentChat } = useContext(currentChatContext);
  const mainData = useContext(MainDataContext)  
  // console.log(mainData,'mainData');
  const messageList = mainData?.data.messagesPerChat;
  // console.log('messageList',messageList);
  const otherUsers = mainData?.data.otherUsers;
  // console.log('otherUsers',otherUsers);
  
  // console.log("currentChat",currentChat);
  // console.log('messageList',messageList);
  // console.log('mainData',mainData);

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
            if(messages.chatId === currentChat){
            {/* console.log('messages',messages); */}
            let index = 0;
            const currentMsg = mainData.getters.getMessagesForChat(messages.id);
           return currentMsg.map((message)=>{
            index++;
            {/* console.log('message',index,message); */}
            let sender = "";
            {/* console.log('message sender',index,message.sender);
            console.log('message chatid',index,message.chatid); */}
            otherUsers.map((user)=>{
              {/* console.log('user',index,user); */}
              {/* console.log('user chatid',index,user.chatid); */}
              if(user.id === message.sender){
               return sender = user.name;
              }
            });
              return <Message key={message._id} userName={sender} {...message}  />;
            })
            } }
            )}
      </div>
    </div>
  );
};

import { useContext, useEffect, useRef } from 'react';
import { Message } from '../../StaticElements/Message/Message';
import { SubHeader } from '../../StaticElements/SubHeader/SubHeader';
import { currentChatContext } from '../../../Context/CurrentChatContext';
import styles from './ChatWindow.module.css';
import { MainDataContext } from '../../../Context/MainDataContext';

export const ChatWindow = () => {
  const { currentChat } = useContext(currentChatContext);
  const mainData = useContext(MainDataContext);
  // //console.log(mainData,'mainData');
  const messageList = mainData?.data.messagesPerChat;
  const messagesPerChat = mainData?.data.messagesPerChat;
  //console.log('messagesPerChat', messagesPerChat);
  // //console.log('messageList',messageList);
  const otherUsers = mainData?.data.otherUsers;
  // //console.log('otherUsers',otherUsers);
  // const isChat = useRef(false);
  // console.log("currentChat", currentChat);
  // //console.log('messageList',messageList);
  // //console.log('mainData',mainData);
  // //console.log('currentChat', currentChat);

  useEffect(() => {}, []);
  const chatId = currentChat.chatid;
  const headerId = mainData.getters.getOtherUserId(chatId)
  const headerDetails = mainData.getters.getOtherUserDetails(headerId)
  
  // //console.log(chatId, 'chatId');
  // const bla = messagesPerChat?.find(chat => chat.chatId === chatId);
  // //console.log(bla, 'bla');
  // const messagesForCurrentChatbl = bla?.messages;

  console.log('haaaaaaaaaaaaaaa',mainData.getters.getMessagesForChat(chatId));
  const messagesForCurrentChat = messagesPerChat?.find(
    chat => chat.chatId === chatId
  )?.messages;
  // console.log(
  //   chatId,
  //   'chatId',
  //   messagesForCurrentChat,
  //   'messagesForCurrentChat'
  // );

  const handleClick = () => {
    //console.log('Modal pop up');
  };
  //console.log(currentChat.chatid);
  return (
    <div className={styles.ChatWindow}>
      <SubHeader func={handleClick}>
        {headerDetails ? (
          <>
            <img src={headerDetails.photo} alt="user photo"></img>
            {headerDetails.name}{' '}
          </>
        ) : (
          <div className={styles.noimage}>Welcome!</div>
        )}
      </SubHeader>
      <div className={styles.MessageContainer}>
        {
        // !messagesForCurrentChat
        //   ? 'No messages yet'
        //   :
          messagesForCurrentChat?.map(message => {
            // console.log(message, 'message');
              return (<Message key={message._id} {...message} />);
            })
            }
      </div>
    </div>
  );
};

import { ChatWindow } from '../../Layout/ChatWindow/ChatWindow';
import { ChatList } from '../../Layout/ChatList/ChatList';
import { SubmitMessage } from '../../ActiveElements/SubmitMessage/SubmitMessage';
import styles from './HomePage.module.css';
import { CurrentChatProvider } from '../../../Context/CurrentChatContext';
import { useContext, useEffect, useRef, useState } from 'react';
import { UserAuthContext } from '../../../Context/UserAuthContext';
import { AlertOnAppContext } from '../../../Context/AlertOnAppContext';
import {
  MainDataContext,
  MainDataProvider,
} from '../../../Context/MainDataContext';

export const HomePage = () => {
  const { showAppAlert } = useContext(AlertOnAppContext);
  const [auth, setAuth] = useContext(UserAuthContext);
  const mainData = useContext(MainDataContext);

  const ws = useState();

  const connectToSocket = () => {
    if (!auth?.token) {
      console.log('No token');
      return;
    }
    // Setting the token in the cookie
    document.cookie = `token=${auth?.token}` || '';
    ws.current = new WebSocket('ws://localhost:4000');
    // Opening the ws connection
    ws.current.onopen = () => {
      console.log('Connection opened');
      showAppAlert('Connected to messaging server', 'success');
      // setConnectionOpen(true);
    };
    // Listening on ws new added messages
    ws.current.onmessage = event => {
      console.log(event.data, auth);
      const data = JSON.parse(event.data);
      console.log("WSSSS", mainData.data?.messagesPerChat, data, )
      updateChatMessages(data);
      // setMessages((_messages) => [..._messages, data]);
    };
    ws.current.onclose = () => {
      showAppAlert('Disconnected from messaging server', 'info');
      console.log('Connection closed');
      // setConnectionOpen(false);
    };
    console.log('ws.current', ws
    );
  };

  const updateChatMessages = (newMessage) => {
    // const [messagesPerChat, setMessagesPerChat] = mainData.data?.messagesPerChat.current;
    // console.log(newMessage);
    const messagesPerChat = mainData.refs?.messagesPerChat_valRef?.current;
    const setMessagesPerChat = mainData.setters?.setMessagesPerChat;

    const current = messagesPerChat || [];
    // console.log(current);
    // console.log(current,newMessage, mainData.data?.messagesPerChat);
    const chatIndex = current.findIndex(chat => chat.chatId === newMessage?.chatid);
    const chatMessagesObj = current?.[chatIndex] || null;
    if (!chatMessagesObj) {
      console.warn('chat not found, cannot add msg', newMessage);
      return;
    }

    const currentMessageListForChat = messagesPerChat[chatIndex].messages;
    // console.log(currentMessageListForChat);

    const udpatedMessageList = [...currentMessageListForChat, newMessage];
    udpatedMessageList.sort((a, b) => a.id - b.id);
    // console.log(udpatedMessageList);

    messagesPerChat[chatIndex].messages = udpatedMessageList;

    const updated = [...messagesPerChat]
    // console.log(current,updated);
    setMessagesPerChat(updated);
    mainData.refs.messagesPerChat_valRef.current = updated;
  }


  const disconnectFromSocket = () => {
    console.log('Cleaning up...');
    ws.current.close();
  };

  useEffect(() => {
    connectToSocket();
    return disconnectFromSocket;
  }, []);

  return (
    <div className={styles.HomePage}>
      <div className={styles.ChatWrapper}>
        <div className={styles.ChatSection}>
          <ChatWindow />
          <SubmitMessage />
        </div>
        <ChatList />
      </div>
    </div>
  );
};

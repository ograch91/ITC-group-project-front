import { ChatWindow } from '../../Layout/ChatWindow/ChatWindow';
import { ChatList } from '../../Layout/ChatList/ChatList';
import { SubmitMessage } from '../../ActiveElements/SubmitMessage/SubmitMessage';
import styles from './HomePage.module.css';
import { CurrentChatProvider } from '../../../Context/CurrentChatContext';
import { useContext, useEffect, useRef } from 'react';
import { UserAuthContext } from '../../../Context/UserAuthContext';
import { AlertOnAppContext } from '../../../Context/AlertOnAppContext';
import { MainDataProvider } from '../../../Context/MainDataContext';

export const HomePage = () => {
  const { showAppAlert } = useContext(AlertOnAppContext);
  const [auth, setAuth] = useContext(UserAuthContext);

  const ws = useRef();

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
      console.log(event.data);
      const data = JSON.parse(event.data);
      // setMessages((_messages) => [..._messages, data]);
    };
    ws.current.onclose = () => {
      showAppAlert('Disconnected from messaging server', 'info');
      console.log('Connection closed');
      // setConnectionOpen(false);
    };
  };

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
      <CurrentChatProvider>
        <MainDataProvider>
              <div className={styles.ChatWrapper}>
                <div className={styles.ChatSection}>
                  <ChatWindow />
                  <SubmitMessage />
                </div>
                <ChatList />
              </div>
        </MainDataProvider>
      </CurrentChatProvider>
    </div>
  );
};

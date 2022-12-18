
import { ChatWindow } from '../../Layout/ChatWindow/ChatWindow';
import { ChatList } from '../../Layout/ChatList/ChatList';
import { SubmitMessage } from '../../ActiveElements/SubmitMessage/SubmitMessage';
import styles from './HomePage.module.css';
import { CurrentChatProvider } from '../../../Context/CurrentChatContext';
import { useContext, useEffect, useRef } from 'react';
import { UserAuthContext } from '../../../Context/UserAuthContext';
import { AlertOnAppContext } from '../../../Context/AlertOnAppContext';
import { StarterPackChatsProvider } from "../../../Context/StarterPackChatsContext";
import { StarterPackOtherUsersProvider } from "../../../Context/StarterPackOtherUsersContext";
import { StaStarterPackMessagesPerChatProvider } from "../../../Context/StarterPackMessagesPerChatContext";


export const HomePage = () => {

  const { showAppAlert } = useContext(AlertOnAppContext);
  const [auth, setAuth] = useContext(UserAuthContext);
  const ws = useRef();
  const wsUrl = 'ws://localhost:8080';

  useEffect(() => {
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
      showAppAlert('Connected to messaging server', 'success')
      // setConnectionOpen(true);
    };
    // Listening on ws new added messages
    ws.current.onmessage = event => {
      console.log(event.data);
      const data = JSON.parse(event.data);
      // setMessages((_messages) => [..._messages, data]);
    };

    ws.current.onclose = () => {
      showAppAlert('Disconnected from messaging server', 'info')
      console.log('Connection closed');
      // setConnectionOpen(false);
    }

    return () => {
      console.log('Cleaning up...');

      ws.current.close();
    };
  }, []);

  return (
    <div className={styles.HomePage}>
      <CurrentChatProvider>

      <StarterPackChatsProvider>
      <StaStarterPackMessagesPerChatProvider>
      <StarterPackOtherUsersProvider>
      <div className={styles.ChatWrapper}>
      <div className={styles.ChatSection}>
        <ChatWindow/>
        <SubmitMessage/>
        </div>
        <ChatList/>
      </div>
      </StarterPackOtherUsersProvider>
      </StaStarterPackMessagesPerChatProvider>
      </StarterPackChatsProvider>

      </CurrentChatProvider>
    </div>
  );
};

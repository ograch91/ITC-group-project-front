import { createContext, useState, useEffect, useContext, useRef } from 'react';
import { baseUrl } from '../Hooks/UseApi';
import { UserAuthContext } from './UserAuthContext';
import { AlertOnAppContext } from './AlertOnAppContext';
import { currentChatContext } from './CurrentChatContext';

export const MainDataContext = createContext();

export const MainDataProvider = ({ children }) => {
  const [auth, setAuth] = useContext(UserAuthContext);
  const { showAppAlert } = useContext(AlertOnAppContext);
  const { currentChat, setCurrentChat } = useContext(currentChatContext);

  const [chats, setChats] = useState([]);
  const chats_valRef = useRef(chats);

  const [otherUsers, setOtherUsers] = useState([]);
  const users_valRef = useRef(otherUsers);

  const [messagesPerChat, setMessagesPerChat] = useState([]);
  const messagesPerChat_valRef = useRef(messagesPerChat);

  // const [groups , setGroups] = useState([]);
  // const groups_valRef = useRef(groups);

  useEffect(() => {
    const fetchData = async () => {
      if (!auth?.isAuth || !auth.loadingDone) {
        console.log('not authed, not fetching data');
        return;
      }

      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: auth?.token || '',
        },
      };

      const resp = await fetch(`${baseUrl}/chats/starterpack/`, options);
      if (!resp.ok) {
        showAppAlert(
          'Error Initialising data try refreshing the page',
          'error'
        );
        return;
      }
      const data = (await resp.json())?.data;
      setChats(data?.chats);
      setOtherUsers(data?.otherUsers);
      setMessagesPerChat(data?.messagesPerChat);
      
      messagesPerChat_valRef.current = data?.messagesPerChat;
      chats_valRef.current = data?.chats;
      users_valRef.current = data?.otherUsers;
      // console.log('data.messagesPerChat', data?.messagesPerChat);

      if(data?.messagesPerChat && data?.messagesPerChat.length > 0){
        setCurrentChat(currentChat => {
          return {
            ...currentChat,
            chatid: data?.messagesPerChat[0].chatId,
            chatDisplaying: true,
          };
        });
  
      }
    };
    fetchData();
  }, [auth]);

  const getMessagesForChat = chatId => {
    const result = messagesPerChat?.find(chat => chat.chatId === chatId)?.messages || [];
    //console.log('result', result, chatId);
    
    return result
  };

  const getOtherUserDetails = userId => {
    const current = users_valRef.current;
    return current?.find(user => user.id === userId) || {};
  };

  // for groups?
  const getChatParticipants = chatId => {
    const chat = chats?.find(chat => chat.id === chatId);
    return chat?.participants || [];
  };

  const getOtherUserId = chatId => {
    const participants = getChatParticipants(chatId);
    const otherUserId = participants?.find(id => 
       id !== auth?.user.id );
    return otherUserId;
  };

  const state = {
    data: {
      chats,
      otherUsers,
      messagesPerChat,
    },
    getters: {
      getMessagesForChat,
      getOtherUserDetails,
      getOtherUserId,
      // getChatParticipants,
    },
    setters: {  // todo: create adding fncs
      setChats,
      setOtherUsers,
      setMessagesPerChat,
    },
    refs: {
      messagesPerChat_valRef,
      chats_valRef,
      users_valRef,
    }
  };

  return (
    <MainDataContext.Provider value={state}>
      {children}
    </MainDataContext.Provider>
  );
};

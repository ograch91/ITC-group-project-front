import { useState, useContext } from 'react';
import { SubHeader } from '../../StaticElements/SubHeader/SubHeader';
import { Button, Modal } from '@mui/material';
import { Box } from '@mui/system';
import { NewChatDialog } from '../NewChat/NewChatDialog';
import { SearchField } from '../../ActiveElements/SearchField/SearchField';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import { MainDataContext } from '../../../Context/MainDataContext';
import { currentChatContext } from '../../../Context/CurrentChatContext';
import styles from '../ChatList/ChatList.module.css';
import moment from 'moment';
import { ChatListItem } from './ChatListItem';

export const ChatList = () => {
  const [open, setOpen] = useState(false);
  const mainData = useContext(MainDataContext);
  const chatList = mainData?.data.chats;

  const modalToggle = () => {
    setOpen(!open);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    boxShadow: 24,
    p: 4,
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


  const addMsg = () => {
    updateChatMessages({
      chatid: 'dfa29b17-4079-4fbb-a050-428bb2af5c12',
      content: 'hello',
      sender: 'b4ff715b-ac9f-4cc1-8ef8-34331abc1668',
      datesent: Date.now(),
      id: Date.now().toString(),
    })
  }

  return (
    <div className={styles.ChatList}>
      <SearchField />
      <ul className={styles.ChatList}>
        <SubHeader text="Available Chats" />
        {chatList ? (
          chatList.map(chat => {
            return <ChatListItem key={chat.id} chat={chat} />
          })
        ) : (
          <h3>loading...</h3>
        )}
      </ul>
      <Button
        onClick={modalToggle}
        sx={{ width: '100%', maxWidth: 360 }}
        // disabled={!checked || checked.length == 0}
        variant="contained"
        type="button"
        size="large"
        endIcon={<HistoryEduIcon />}
      >
        New Chat
      </Button>
      <Button
        onClick={addMsg}
        sx={{ width: '100%', maxWidth: 360 }}
        // disabled={!checked || checked.length == 0}
        variant="contained"
        type="button"
        size="large"
        endIcon={<HistoryEduIcon />}
      >
        add msg
      </Button>
      <Modal
        open={open}
        onClose={modalToggle}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        keepMounted
      >
        <Box sx={style}>
          <NewChatDialog />
        </Box>
        {/* {!isoUser ? <BeforeAuthTabs /> : <EditAuthTabs />} */}
      </Modal>
    </div>
  );
};

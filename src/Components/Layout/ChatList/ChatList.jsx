import { useState, useContext } from 'react';
import { SubHeader } from '../../StaticElements/SubHeader/SubHeader';
import { Button, Modal } from '@mui/material';
import { Box } from '@mui/system';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import { MainDataContext } from '../../../Context/MainDataContext';
import styles from '../ChatList/ChatList.module.css';
import { ChatListItem } from './ChatListItem';
import { NewChatDataLoader } from '../NewChat/NewChatDataLoader';

export const ChatList = () => {
  const [open, setOpen] = useState(false);
  const closeModal = () => {
    setOpen(false);
  };
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

  const updateChatMessages = newMessage => {
    const messagesPerChat = mainData.refs?.messagesPerChat_valRef?.current;
    const setMessagesPerChat = mainData.setters?.setMessagesPerChat;

    const current = messagesPerChat || [];
    const chatIndex = current.findIndex(
      chat => chat.chatId === newMessage?.chatid
    );
    const chatMessagesObj = current?.[chatIndex] || null;
    if (!chatMessagesObj) {
      console.warn('chat not found, cannot add msg', newMessage);
      return;
    }

    const currentMessageListForChat = messagesPerChat[chatIndex].messages;
    const udpatedMessageList = [...currentMessageListForChat, newMessage];
    udpatedMessageList.sort((a, b) => a.id - b.id);

    messagesPerChat[chatIndex].messages = udpatedMessageList;

    const updated = [...messagesPerChat];
    setMessagesPerChat(updated);
    mainData.refs.messagesPerChat_valRef.current = updated;
  };

  const DEBUG_ADD_MESSAGE = false; // set true to show button for adding message (login admin, chat w/ jerry)
  const addMsg = () => {
    updateChatMessages({
      chatid: 'dfa29b17-4079-4fbb-a050-428bb2af5c12',
      content: 'hello',
      sender: 'b4ff715b-ac9f-4cc1-8ef8-34331abc1668',
      datesent: Date.now(),
      id: Date.now().toString(),
    });
  };

  return (
    <div className={styles.ChatList}>
      <ul className={styles.ChatListDisplay}>
        <SubHeader text="Available Conversations" />
        {chatList ? (
          chatList.map(chat => {
            return <ChatListItem key={chat.id} chat={chat} />;
          })
        ) : (
          <h3>loading...</h3>
        )}
      </ul>
      <div className={styles.listButtons}>
        <Button
          onClick={modalToggle}
          sx={{ width: '100%', maxWidth: 360 }}
          variant="contained"
          type="button"
          size="large"
          endIcon={<HistoryEduIcon />}
        >
          New Chat
        </Button>
        {DEBUG_ADD_MESSAGE && false && (
          <Button
            onClick={addMsg}
            sx={{ width: '100%', maxWidth: 360 }}
            variant="contained"
            type="button"
            size="large"
            endIcon={<HistoryEduIcon />}
          >
            add msg
          </Button>
        )}
        <Modal
          open={open}
          onClose={modalToggle}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          keepMounted
        >
          <Box sx={style}>
            {open && <NewChatDataLoader closeModal={closeModal} />}
          </Box>
          {/* {!isoUser ? <BeforeAuthTabs /> : <EditAuthTabs />} */}
        </Modal>
      </div>
    </div>
  );
};

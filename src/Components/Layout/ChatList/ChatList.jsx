import { useState } from 'react';
import { SubHeader } from '../../StaticElements/SubHeader/SubHeader';
import { v4 as uuidv4 } from 'uuid';
import styles from '../ChatList/ChatList.module.css';
import { Button, Modal } from '@mui/material';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import { Box } from '@mui/system';
import { NewChatDialog } from '../NewChat/NewChatDialog';

export const ChatList = ({ header, list, type }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [chatList, setChatList] = useState(['s', 'a', 'c']);
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

  return (
    <div className={styles.ChatList}>
      <ul className={styles.ChatList}>
        <SubHeader text="Available Chats" />
        {chatList.length > 0 ? (
          chatList.map(listItem => {
            const id = uuidv4();
            return (
              <div className={styles.chatItem} key={id}>
                <li>User Random</li>
                <p>lastDate</p>
              </div>
            );
          })
        ) : (
          <h3>loading...</h3>
        )}
      </ul>
      <Button
        onClick={handleOpen}
        sx={{ width: '100%', maxWidth: 360 }}
        // disabled={!checked || checked.length == 0}
        variant="contained"
        type="button"
        size="large"
        endIcon={<HistoryEduIcon />}
      >
        New Chat
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        keepMounted
      >
        <Box sx={style}>
          <NewChatDialog/>
        </Box>
        {/* {!isoUser ? <BeforeAuthTabs /> : <EditAuthTabs />} */}
      </Modal>
    </div>
  );
};

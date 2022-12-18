import { useState ,useContext} from "react";
import { SubHeader } from "../../StaticElements/SubHeader/SubHeader";
import { Button, Modal } from "@mui/material";
import { Box } from "@mui/system";
import { NewChatDialog } from "../NewChat/NewChatDialog";
import { SearchField } from "../../ActiveElements/SearchField/SearchField";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import styles from "../ChatList/ChatList.module.css";
import { MainDataContext } from "../../../Context/MainDataContext";
import { currentChatContext } from "../../../Context/CurrentChatContext";

export const ChatList = ({ header, list, type }) => {
  const [open, setOpen] = useState(false);
  const mainData = useContext(MainDataContext)
  const chatList = mainData?.data.chats;
  const otherUsers = mainData?.data.otherUsers;

  // const [currentChat, setCurrentChat] = useContext(currentChatContext);
  
  console.log('data for chat list',chatList, otherUsers);

  const modalToggle = () => {
    setOpen(!open);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white",
    boxShadow: 24,
    p: 4,
  };

  const changeChat =(chatId)=>{
    console.log('chatId',chatId);
    // setCurrentChat(chatId);
  }

  return (
    <div className={styles.ChatList}>
      <SearchField />
      <ul className={styles.ChatList}>
        <SubHeader text="Available Chats" />
        <div className={styles.chatItem}>
                <img></img>
                <li>chatsCurrentUser</li>
                <p>LastDate</p>
              </div>
        {chatList ? (
          chatList.map((chat) => {
            const { id } = chat;
            const otherUserId = mainData.getters.getOtherUserId(chat.id)
            const chatWithUser = mainData.getters.getOtherUserDetails(otherUserId)
            console.log('chatWithUser',chatWithUser);
            return (
              <div className={styles.chatItem} key={id}>
                <img src={chatWithUser.photo}></img>
                <li onClick={()=>changeChat(chat.id)}>{chatWithUser.name}</li>
                <p>lastDate</p>
              </div>
            );
          })
        ) : (
          <h3>loading...</h3>
        )}
      </ul>
      <Button
        onClick={modalToggle}
        sx={{ width: "100%", maxWidth: 360 }}
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

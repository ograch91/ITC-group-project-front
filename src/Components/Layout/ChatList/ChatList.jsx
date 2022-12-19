import { useState ,useContext} from "react";
import { SubHeader } from "../../StaticElements/SubHeader/SubHeader";
import { Button, Modal } from "@mui/material";
import { Box } from "@mui/system";
import { NewChatDialog } from "../NewChat/NewChatDialog";
import { SearchField } from "../../ActiveElements/SearchField/SearchField";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import styles from "../ChatList/ChatList.module.css";
import { MainDataContext } from "../../../Context/MainDataContext";

export const ChatList = ({ header, list, type }) => {
  const [open, setOpen] = useState(false);
  const mainData = useContext(MainDataContext)
  const chatList = mainData?.data.chats;
  const messagesPerChat = mainData?.data.messagesPerChat;

  // const [currentChat, setCurrentChat] = useContext(currentChatContext);
  

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
    // console.log('chatId',chatId);
    // setCurrentChat(chatId);
  }

  return (
    <div className={styles.ChatList}>
      <SearchField />
      <ul className={styles.ChatList}>
        <SubHeader text="Available Chats" />
        {chatList ? (
          chatList.map((chat) => {
            {/* console.log(mainData,'mainData'); */}
            const { id } = chat;
            const otherUserId = mainData.getters.getOtherUserId(id);
            const chatWithUser = mainData.getters.getOtherUserDetails(otherUserId);
            let lastMsg = "";
            let index = 0;
            messagesPerChat.map((message)=>{ 
              if(message.chatId === chat.id){
                lastMsg = mainData.getters.getMessagesForChat(message.id);
              lastMsg =lastMsg[index].datesent;
              }
              index++;
            })
            lastMsg = parseInt(lastMsg);
            let h = new Date(lastMsg).getHours();
            console.log('h',h);
            let m = new Date(lastMsg).getMinutes();
            lastMsg = `${h}:${m}`;
            return (
              <div className={styles.chatItem} key={id}>
                <img src={chatWithUser.photo}></img>
                <li onClick={()=>changeChat(chat.id)}>{chatWithUser.name}</li>
                <p>{lastMsg}</p>
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

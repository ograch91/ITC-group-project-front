import { useEffect, useState ,useContext} from "react";
import { SubHeader } from "../../StaticElements/SubHeader/SubHeader";
import { Button, Modal } from "@mui/material";
import { Box } from "@mui/system";
import { NewChatDialog } from "../NewChat/NewChatDialog";
import { SearchField } from "../../ActiveElements/SearchField/SearchField";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import { currentChatContext } from "../../../Context/CurrentChatContext";
import localforage from "localforage";
import { v4 as uuidv4 } from "uuid";
import { baseUrl } from "../../../Hooks/UseApi";
import axios from "axios";
import styles from "../ChatList/ChatList.module.css";

export const ChatList = ({ header, list, type }) => {
  const [open, setOpen] = useState(false);

  const modalToggle = () => {
    setOpen(!open);
  };

  const {setCurrentChat}=useContext(currentChatContext);

  const [chatList, setChatList] = useState([]);

  useEffect( () => {
   const fetchData = async () => {

      const savedAuth =  await localforage.getItem('auth');

      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: savedAuth.token ,
        }
      }

      const data = await axios.get(`${baseUrl}/chats/starterpack/`,options);

      const dataStructure = data.data.data;
      const chatLastMessageDate = data.data.data.messagesPerChat[0].messages[0].datesent;
      const chatUserPhotos = data.data.data.otherUsers[0].photo;
      const chatsCurrentUsers = data.data.data.chats[0].participants[0];

      console.log('dataStructure',dataStructure);
      console.log('chatLastMessageDate',chatLastMessageDate);
      console.log('chatsCurrentUsers',chatsCurrentUsers);
      console.log('chatUserPhotos',chatUserPhotos);

      // setChatList(chats);
    };
    fetchData();

    return () => {
      setChatList([]);
    };
  }, []);

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
        {/* {chatList ? (
          chatList.map((listItem) => {
            const id = uuidv4();
            return (
              <div className={styles.chatItem} key={id}>
                <img src={listItem.photo}></img>
                <li onClick={()=>changeChat(listItem.chatId)}>{listItem.name}</li>
                <p>lastDate</p>
              </div>
            );
          })
        ) : (
          <h3>loading...</h3>
        )} */}
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

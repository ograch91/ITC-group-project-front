import { useEffect, useState ,useContext} from "react";
import { SubHeader } from "../../StaticElements/SubHeader/SubHeader";
import { v4 as uuidv4 } from "uuid";
import { Button, Modal } from "@mui/material";
import { Box } from "@mui/system";
import { NewChatDialog } from "../NewChat/NewChatDialog";
import { SearchField } from "../../ActiveElements/SearchField/SearchField";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import { baseUrl } from "../../../Hooks/UseApi";
import { currentChatContext } from "../../../Context/CurrentChatContext";
import axios from "axios";
import styles from "../ChatList/ChatList.module.css";

export const ChatList = ({ header, list, type }) => {
  const [open, setOpen] = useState(false);

  const modalToggle = () => {
    setOpen(!open);
  };

  const {setCurrentChat}=useContext(currentChatContext);
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(`${baseUrl}/users/getall`);
      console.log("data", data.data.data);
      const chats = data.data.data;

      setChatList(chats);
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

  const changeChat =(e)=>{
    const currentChat = e.currentTarget.value;
    console.log('currentChat',currentChat);
    // setCurrentChat()
  }

  return (
    <div className={styles.ChatList}>
      <SearchField />
      <ul className={styles.ChatList}>
        <SubHeader text="Available Chats" />
        {chatList ? (
          chatList.map((listItem) => {
            const id = uuidv4();
            return (
              <div className={styles.chatItem} key={id}>
                <img src={listItem.photo}></img>
                <li onClick={(e)=>changeChat(e)}>{listItem.name}</li>
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

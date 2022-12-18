import { useContext, useEffect, useState } from "react";
import { Message } from "../../StaticElements/Message/Message";
import { SubHeader } from "../../StaticElements/SubHeader/SubHeader";
import { UserAuthContext } from "../../../Context/UserAuthContext";
import { currentChatContext } from "../../../Context/CurrentChatContext";
import { baseUrl } from "../../../Hooks/UseApi";
import localforage from "localforage";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import styles from "./ChatWindow.module.css";
import { starterPackChatsContext } from "../../../Context/StarterPackChatsContext";

export const ChatWindow = () => {

  const {currentChat}=useContext(currentChatContext);
  const {starterPackChats}=useContext(starterPackChatsContext);

  const [messageList, setMessageList] = useState([]);
  // const [currentChat,setCurrentChat] =useState("cfa29b17-4079-4fbb-a050-428bb2af5c12");
  // const [currentChat,setCurrentChat] =useState("");

  useEffect(() => {
   
    const fetchData = async () => {
      const savedAuth =  await localforage.getItem('auth');
      console.log(starterPackChats,'starterPackChats');
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: savedAuth.token ,
        }
      }
      const data = await axios.get(`${baseUrl}/chats/starterpack/`,options);


      const dataStructure = data.data.data;
      const chatsCurrentUsers = data.data.data.chats[0].participants[0];
      const chatLastMessageDate = data.data.data.messagesPerChat[0].messages[0].datesent;
      const chatMessageContent = data.data.data.messagesPerChat[0].messages[0].content;

      
      // console.log('dataStructure ChatWindow',dataStructure);
      // console.log('chatLastMessageDate ChatWindow',chatLastMessageDate);
      // console.log('chatsCurrentUsers ChatWindow',chatsCurrentUsers);
      // console.log('chatMessageContent ChatWindow',chatMessageContent);


      // setMessageList(newMessages);
    };
    fetchData();

    return (()=>{
      setMessageList([]);
    })
  }, []);

  const handleClick = () => {
    console.log("Modal pop up");
  };

  return (
    <div className={styles.ChatWindow}>
        <SubHeader func={handleClick}>
          <img></img>UserName
        </SubHeader>
      <div className={styles.MessageContainer}>
        <Message key={uuidv4()} content="bla2" datesent="2424234" sender="mosh" />
      </div>
      {/* <div className={styles.MessageContainer}>
        {messageList? 
           messageList.map((message) => {
              return <Message key={uuidv4()} {...message} />;
            })
          : ( <h3>No Messages</h3>)}
      </div> */}
    </div>
  );
};

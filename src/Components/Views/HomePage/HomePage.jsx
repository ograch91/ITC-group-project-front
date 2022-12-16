import { ChatWindow } from "../../Layout/ChatWindow/ChatWindow";
import { ChatList } from "../../Layout/ChatList/ChatList";
import { SubmitMessage } from "../../ActiveElements/SubmitMessage/SubmitMessage";
import styles from "./HomePage.module.css";
import { CurrentChatProvider } from "../../../Context/CurrentChatContext";

export const HomePage = () => {


  return (
    <div className={styles.HomePage}>
      <CurrentChatProvider>
      <div className={styles.ChatWrapper}>
      <div className={styles.ChatSection}>
        <ChatWindow/>
        <SubmitMessage/>
        </div>
        <ChatList/>
      </div>
      </CurrentChatProvider>
     </div>
  );
};

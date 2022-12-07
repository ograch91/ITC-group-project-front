import { ChatWindow } from "../../Layout/ChatWindow/ChatWindow";
import { ChatList } from "../../Layout/ChatList/ChatList";
import { SubmitMessage } from "../../ActiveElements/SubmitMessage/SubmitMessage";
import styles from "./HomePage.module.css";

export const HomePage = () => {


  return (
    <div className={styles.HomePage}>
      <div className={styles.ChatWrapper}>
      <div className={styles.ChatSection}>
        <ChatWindow/>
        <SubmitMessage/>
        </div>
        <ChatList/>
      </div>
     </div>
  );
};

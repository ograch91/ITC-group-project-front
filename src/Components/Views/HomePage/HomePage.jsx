import { ChatWindow } from "../../Layout/ChatWindow/ChatWindow";
import { ChatList } from "../../Layout/ChatList/ChatList";
import { SubmitMessage } from "../../ActiveElements/SubmitMessage/SubmitMessage";
import styles from "./HomePage.module.css";
import { CurrentChatProvider } from "../../../Context/CurrentChatContext";
import { StarterPackChatsProvider } from "../../../Context/StarterPackChatsContext";
import { StarterPackOtherUsersProvider } from "../../../Context/StarterPackOtherUsersContext";
import { StaStarterPackMessagesPerChatProvider } from "../../../Context/StarterPackMessagesPerChatContext";

export const HomePage = () => {


  return (
    <div className={styles.HomePage}>
      <CurrentChatProvider>
      <StarterPackChatsProvider>
      <StaStarterPackMessagesPerChatProvider>
      <StarterPackOtherUsersProvider>
      <div className={styles.ChatWrapper}>
      <div className={styles.ChatSection}>
        <ChatWindow/>
        <SubmitMessage/>
        </div>
        <ChatList/>
      </div>
      </StarterPackOtherUsersProvider>
      </StaStarterPackMessagesPerChatProvider>
      </StarterPackChatsProvider>
      </CurrentChatProvider>
     </div>
  );
};

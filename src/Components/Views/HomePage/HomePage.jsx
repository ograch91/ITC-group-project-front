import { ChatList } from "../../Layout/ChatList/ChatList";
import styles from "./HomePage.module.css";


export const HomePage = () => {

  return (
    <div className={styles.HomePage}>
          <ChatList/>
    </div>
  );
};

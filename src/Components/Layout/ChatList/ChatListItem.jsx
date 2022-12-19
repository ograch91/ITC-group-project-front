import moment from 'moment';
import { useContext } from 'react';
import { currentChatContext } from '../../../Context/CurrentChatContext';
import { MainDataContext } from '../../../Context/MainDataContext';
import styles from '../ChatList/ChatList.module.css';

export const ChatListItem = ({ chat }) => {
  const { id } = chat;

  const mainData = useContext(MainDataContext);
  const chatList = mainData?.data.chats;

  const messagesPerChat = mainData?.data.messagesPerChat;
  const { currentChat, setCurrentChat } = useContext(currentChatContext);

  const otherUserId = mainData.getters.getOtherUserId(chat.id);
  const chatWithUser = mainData.getters.getOtherUserDetails(otherUserId);

  const messages = mainData.getters.getMessagesForChat(chat.id);
  const lastMessage = messages[messages.length - 1];

  const timeStamp = lastMessage?.datesent;
  const timeToDisplay = timeStamp ? moment(parseInt(timeStamp)).fromNow() : '';

  const changeChat = (photo, name, chatId) => {
    setCurrentChat(currentChat => {
      return {
        ...currentChat,
        userPhoto: photo,
        userName: name,
        chatid: chatId,
        chatDisplaying: true,
      };
    });
  };

  return (
    <div className={styles.chatItem} key={id}>
      <img src={chatWithUser.photo}></img>
      <li
        onClick={() =>
          changeChat(chatWithUser.photo, chatWithUser.name, chat.id)
        }
      >
        {chatWithUser.name}
      </li>
      <p>{timeToDisplay}</p>
    </div>
  );
};

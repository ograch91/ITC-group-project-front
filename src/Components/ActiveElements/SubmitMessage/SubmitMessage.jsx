import { Button } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { baseUrl } from "../../../Hooks/UseApi";
import { currentChatContext } from "../../../Context/CurrentChatContext";
import styles from "./SubmitMessage.module.css";
import { UserAuthContext } from "../../../Context/UserAuthContext";
// import { date } from 'yup/lib/locale';
import { AlertOnAppContext } from "../../../Context/AlertOnAppContext";
import { MainDataContext } from "../../../Context/MainDataContext";

export const SubmitMessage = () => {
  const { showAppAlert } = useContext(AlertOnAppContext);
  const { currentChat } = useContext(currentChatContext);
  // //console.log('currentChat.chatid',currentChat.chatid);
  const [auth, setAuth] = useContext(UserAuthContext);
  const mainData = useContext(MainDataContext);

  const isDisable = useRef(false);

  useEffect(() => {
    if (currentChat.chatDisplaying) {
    //console.log("currentChat.chatDisplaying",currentChat.chatDisplaying);
    //console.log("isDisable.current",isDisable.current);
      isDisable.current = false;
    } else {
      isDisable.current = true;
    }
    return () => {
      isDisable.current = true;
    };
  }, [currentChat]);

  const [message, setMessage] = useState({
    sender: auth?.user?.id,
    chatid: currentChat.chatid,
    datesent: Date.now(),
    content: "",
  });

  const handleSubmit = async (e, message) => {
    e.preventDefault();
    const newMessage = {
      ...message,
      chatid: currentChat.chatid,
      datesent: Date.now(),
    };
    console.log(newMessage, mainData.data?.messagesPerChat);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth?.token || "",
      },
      body: JSON.stringify(newMessage),
    };
    try {
      const resp = await fetch(`${baseUrl}/messages/`, options);
      if (!resp.ok) {
        showAppAlert("Couldnt send message apologies", "error");
        return;
      }
      setMessage({ ...message, datesent: "", content: "" });
    } catch (err) {
      showAppAlert("Couldnt send message apologies", "error");
      return;
    }
  };

  return (
    <div className={styles.SubmitMessage}>
    <div className={styles.textArea}>
      <textarea
        className={styles.form}
        placeholder="What you have in mind..."
        value={message.content}
        onChange={(e) =>
          setMessage((message) => {
            return { ...message, content: e.target.value };
          })
        }
      />
      <Button
        onClick={(e) => handleSubmit(e, message)}
        disabled={
          isDisable.current ? true : message.content.length > 0 ? false : true
        }
      >
        Send Message
      </Button>
    </div>
    </div>
  );
};

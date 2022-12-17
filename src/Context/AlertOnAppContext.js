import { createContext, useState } from 'react';
export const AlertOnAppContext = createContext();

const Provider = AlertOnAppContext.Provider;

export const AlertOnAppProvider = props => {
  const openState = useState(false);
  const messageState = useState('');
  const alertTypeState = useState('info');
  
  const [alertMessage, setAlertMessage] = messageState;
  const [alertType, setAlertType] = alertTypeState;
  const [openAlert, setOpenAlert] = openState;

  const showAppAlert = (message, alertType) => {
    // setOpenAlert(false);
    setAlertMessage(message);
    setAlertType(alertType || 'info');
    setOpenAlert(true);
  }


  
  const state = {openState, messageState, alertTypeState, showAppAlert};
  return <Provider value={state}>{props.children}</Provider>;
};

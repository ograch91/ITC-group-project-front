import { createContext, useState } from 'react';
export const AlertOnAppContext = createContext();

const Provider = AlertOnAppContext.Provider;

export const AlertOnAppProvider = props => {
  const openState = useState(false);
  const messageState = useState('');
  const alertTypeState = useState('info');
  const displayTimeState = useState(5000);

  const [alertMessage, setAlertMessage] = messageState;
  const [alertType, setAlertType] = alertTypeState;
  const [openAlert, setOpenAlert] = openState;
  const [displayTime, setDisplayTime] = displayTimeState;

  const showAppAlert = (message, alertType, timeToDisp) => {
    // setOpenAlert(false);
    setAlertMessage(message);
    setAlertType(alertType || 'info');
    setDisplayTime(timeToDisp || 5000);
    setOpenAlert(true);
  };

  const state = {
    openState,
    messageState,
    alertTypeState,
    displayTimeState,
    showAppAlert,
  };
  return <Provider value={state}>{props.children}</Provider>;
};

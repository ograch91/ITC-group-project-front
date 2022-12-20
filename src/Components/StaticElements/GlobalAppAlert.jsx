import { useContext } from 'react';
import AlertOnWindow from '../Firebase/AlertOnWindow';
import { AlertOnAppContext } from '../../Context/AlertOnAppContext';

export const GlobalAppAlert = () => {
  const { openState, messageState, alertTypeState, displayTimeState } =
    useContext(AlertOnAppContext);
  const [alertMessage, setAlertMessage] = messageState;
  const [alertType, setAlertType] = alertTypeState;
  const [openAlert, setOpenAlert] = openState;
  const [displayTime, setDisplayTime] = displayTimeState;

  return (
    <AlertOnWindow
      openState={openState}
      message={alertMessage}
      alertType={alertType}
      timeToDisp={displayTime}
    />
  );
};

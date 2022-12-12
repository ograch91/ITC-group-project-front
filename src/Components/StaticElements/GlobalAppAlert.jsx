import { useContext } from 'react';
import AlertOnWindow from '../Firebase/AlertOnWindow';
import { AlertOnAppContext } from '../../Context/AlertOnAppContext';

export const GlobalAppAlert = () => {
  const { openState, messageState, alertTypeState } =
    useContext(AlertOnAppContext);
  const [alertMessage, setAlertMessage] = messageState;
  const [alertType, setAlertType] = alertTypeState;
  const [openAlert, setOpenAlert] = openState;

  return (
    <AlertOnWindow
      openState={openState}
      message={alertMessage}
      alertType={alertType}
    />
  );
};

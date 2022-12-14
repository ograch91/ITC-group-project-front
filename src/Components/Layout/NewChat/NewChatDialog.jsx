import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import { useContext, useState } from 'react';
import { Button } from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';
import AlertOnWindow from '../../Firebase/AlertOnWindow';
import './NewChatDialog.css';
import { UserAuthContext } from '../../../Context/UserAuthContext';
import { currentChatContext } from '../../../Context/CurrentChatContext';

export const NewChatDialog = props => {
  const { users, closeModal } = props;
  const openState = useState(false);
  const [message, setMessage] = useState('');
  const [alertType, setAlertType] = useState('info');
  const [open, setOpen] = openState;
  const [auth, setAuth] = useContext(UserAuthContext);
  const { currentChat, setCurrentChat } = useContext(currentChatContext);

  const showAlert = (message, type) => {
    setMessage(message);
    setAlertType(type || 'info');
    setOpen(true);
  };

  const [checked, setChecked] = useState([]);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const sendToServerNewChat = async user => {
    const participants = [auth?.user?.id, user.id];
    const created = Date.now();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: auth?.token || '',
      },
      body: JSON.stringify({
        created: created,
        participants: participants,
      }),
    };
    const response = await fetch(
      `https://group-messaging-app.herokuapp.com/chats/startchat`,
      options
    );

    const payload = await response.json();
    return payload?.data?.createdId;
  };

  const startNew = async () => {
    if (!checked || checked.length == 0) {
      return showAlert(
        'please select at least one user to start a new chat with',
        'error'
      );
    }
    if (checked.length >= 2) {
      return showAlert(
        'Group chats are not supported yet - Please select only one user.',
        'error'
      );
    } else {
      const user = users.find(u => u.id === checked[0]);
      showAlert('Starting a new chat with ' + user?.name || 'Someone');
      const newId = await sendToServerNewChat(user);
      setCurrentChat({ ...currentChat, chatid: newId });
      setTimeout(closeModal, 1500);
      return showAlert(
        'Starting a new chat with ' + user?.name || 'Someone',
        'success'
      );
    }
  };

  if (!users || users.length === 0) {
    return <div>no users</div>;
  }

  return (
    <div>
      <div className="users-list">
        <List
          dense
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        >
          {users.map(user => {
            const labelId = `checkbox-list-secondary-label-${user.id}`;
            return (
              <ListItem
                key={user.id}
                secondaryAction={
                  <Checkbox
                    edge="end"
                    onChange={handleToggle(user.id)}
                    checked={checked.indexOf(user.id) !== -1}
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                }
                disablePadding
              >
                <ListItemButton onClick={handleToggle(user.id)}>
                  <ListItemAvatar>
                    <Avatar alt={user.name || 'Avatar'} src={user.photo}>
                      <img
                        src={'./profile.png'}
                        style={{ width: '40px', height: '40px' }}
                      />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    id={labelId}
                    primary={user.name || user.email || 'Someone'}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </div>
      <div>
        <Button
          onClick={startNew}
          sx={{ width: '100%', maxWidth: 360 }}
          disabled={!checked || checked.length == 0}
          variant="contained"
          type="button"
          size="large"
          endIcon={<ForumIcon />}
        >
          Start New {checked.length >= 2 ? 'Group' : 'Chat'}
        </Button>
      </div>
      <AlertOnWindow
        openState={openState}
        message={message}
        alertType={alertType}
      />
    </div>
  );
};

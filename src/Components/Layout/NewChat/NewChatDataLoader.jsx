import { useContext } from 'react';
import { UserAuthContext } from '../../../Context/UserAuthContext';
import { LoadAndRender } from '../../APILoaded/LoadAndRender';
import { NewChatDialog } from './NewChatDialog';

export const NewChatDataLoader = (props) => {
  const { closeModal } = props;
  const [auth, setAuth] = useContext(UserAuthContext);

  const path = `users/getall`;

  const removeCurrentUser = data => {
    return data.filter(user => user.id !== auth.user.id);
  };

  const onRender = data => {
    const filteredData = removeCurrentUser(data);
    return <NewChatDialog users={filteredData} closeModal={closeModal} />;
  };

  return (
    <LoadAndRender path={path} onRender={onRender} />
    // <LoadAndRender path={path} onRender={onRender} onLoading={onLoading} />
  );
};

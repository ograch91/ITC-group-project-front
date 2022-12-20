import { useContext } from 'react';
import { UserAuthContext } from '../../../Context/UserAuthContext';
import { LoadAndRender } from '../../APILoaded/LoadAndRender';
import { NewChatDialog } from './NewChatDialog';

export const NewChatDataLoader = () => {
  const [auth, setAuth] = useContext(UserAuthContext);

  const path = `users/getall`;

  const removeCurrentUser = data => {
    return data.filter(user => user.id !== auth.user.id);
  };

  const onRender = data => {
    const filteredData = removeCurrentUser(data);
    return <NewChatDialog users={filteredData} />;
  };

  return (
    <LoadAndRender path={path} onRender={onRender} />
    // <LoadAndRender path={path} onRender={onRender} onLoading={onLoading} />
  );
};

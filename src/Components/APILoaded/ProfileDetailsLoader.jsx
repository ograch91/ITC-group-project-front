import { useContext } from 'react';
import { UserAuthContext } from '../../Context/UserAuthContext';
import { ProfileDetails } from '../Profile/ProfileDetails';
import { LoadAndRender } from './LoadAndRender';

export const ProfileDetailsLoader = props => {
  const [auth, setAuth] = useContext(UserAuthContext);
  const currentUser = auth?.user?.id;
  const userId = props.id || currentUser;
  const path = `users/${userId}`;

  const onRender = data => {
    return (
      <ProfileDetails
        user={data}
        userId={data.id}
        isOtherUser={data.id !== currentUser}
      />
    );
  };

  const onLoading = () => {
    console.log('Loading');
    return <h4>Getting User details hang on.......</h4>;
  };

  return (
    <LoadAndRender path={path} onRender={onRender} onLoading={onLoading} />
  );
};

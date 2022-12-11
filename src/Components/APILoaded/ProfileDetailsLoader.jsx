import { useApi } from '../../Hooks/UseApi';
import { ProfileDetails } from '../Profile/ProfileDetails';
import { LoadAndRender } from './LoadAndRender';

export const ProfileDetailsLoader = props => {
  const currentUser = 'b4ff715b-ac9f-4cc1-8ef8-34331abc1668';
  const userId = props.id || currentUser;
  const path = `users/${userId}`;
  // const { data, isLoading, err } = useApi(method, path, args);

  const onRender = data => {
   
    console.log(data);
    
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

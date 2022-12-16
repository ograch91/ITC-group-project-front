import { useContext } from "react";
import { UserAuthContext } from "../../Context/UserAuthContext";
// import { useApi } from "../../Hooks/UseApi";
import { ProfileDetails } from "../Profile/ProfileDetails";
import { LoadAndRender } from "./LoadAndRender";

export const ProfileDetailsLoader = (props) => {

  const [auth, setAuth] = useContext(UserAuthContext);
  const currentUser = auth?.user?.id;
  const userId = props.id || currentUser;
  const path = `users/${userId}`;
  // const { data, isLoading, err } = useApi(method, path, args);

  const onRender = (data) => {
    return (
      <ProfileDetails
        user={data}
        userId={data.id}
        isOtherUser={data.id !== currentUser}
      />
    );
  };

  const onLoading = () => {
    console.log("Loading");
    return <h4>Getting User details hang on.......</h4>;
  };

  return (
    <LoadAndRender path={path} onRender={onRender} onLoading={onLoading} />
  );
};

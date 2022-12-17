import { createContext, useState } from 'react';
import localForage from 'localforage';

export const UserAuthContext = createContext();

const Provider = UserAuthContext.Provider;

export const UserAuthProvider = props => {
  const init = {
    user: null, // user details object
    isAuth: false, // boolean
    token: null, // token string
    loadingDone: false, // boolean
  };
  const [auth, setAuth] = useState(init);
  const localSetAuth = newAuth => {
    setAuth(newAuth);
    localForage.setItem('auth', newAuth);
  };
  const wrappedState = [auth, localSetAuth];
  return <Provider value={wrappedState}>{props.children ?? ''}</Provider>;
};

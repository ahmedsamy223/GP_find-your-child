import { createContext, useContext } from "react";

import { setUserData } from "../utils/storage";

export const AuthContext = createContext({
  user: null,
  setUser: null,
  token: null,
  setToken: null,
});

export const useAuth = () => {
  const { user, setUser, token, setToken } = useContext(AuthContext);

  const setCredentials = async (user, token) => {
    // console.log(user,token)
    await setUserData(user, token);
    setUser(user);
    setToken(token);
  };
  return { user, token, setCredentials };
};

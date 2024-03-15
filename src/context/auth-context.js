import {
  createContext,
  useState,
  // ,useContext
} from "react";
import * as SecureStore from "expo-secure-store";

const key = "user";

export const AuthContext = createContext({
  token: null,
  getUser: () => {},
  setToken: () => {},
  setUserData: () => {},
});

export const useAuth = () => {
  const [token, setToken] = useState(null);

  const setUserData = async (userData, token) => {
    await SecureStore.setItemAsync(key, JSON.stringify({ userData, token }));
    setToken(token);
  };
  const getUser = async () => {
    const data = await SecureStore.getItemAsync(key);
    const json = JSON.parse(data);
    return json.userData;
  };

  // const getToken= async ()=>{
  //   const data = await SecureStore.getItemAsync(key);
  //   const json = JSON.parse(data);
  //   setToken(json.token)
  //   return json.token
  // }
  return { setUserData, getUser, token };
  // authe:token
};

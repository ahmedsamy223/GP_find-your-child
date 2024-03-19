import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { AppStackNavigator } from "./src/navigation/app-navigator";
import { AuthStackNavigator } from "./src/navigation/auth-navigator";
import { getUserData,clearUserData } from "./src/utils/storage";
import { AuthContext } from "./src/context/auth-context";


export default function Main() {
  const [user, setUser] = useState(null);
  const [token,setToken]=useState(null)
  const insets = useSafeAreaInsets();
  const getData = async ()=>{
    const data = await getUserData();
    if (data !== null) {
    
      setToken(data.token);
      setUser(data.user);
    }
  }
  useEffect(() => {
    getData()
   
    // clearUserData()
  }, []);

  return (
    <>
      <SafeAreaView
        edges={["top"]}
        style={{ flex: 0, backgroundColor: "rgb(59 130 246)" }}
      />
      <SafeAreaView
        edges={["left", "right"]}
        style={{ flex: 1, backgroundColor: "white" }}
      >
        <AuthContext.Provider value={{ setUser, user, token,setToken }}>
            <NavigationContainer>
              {user ? <AppStackNavigator /> : <AuthStackNavigator />}
            </NavigationContainer>
        </AuthContext.Provider>
      </SafeAreaView>
    </>
  )
}

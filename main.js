import React, { useState, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { AppStackNavigator } from "./src/navigation/app-navigator";
import { AuthStackNavigator } from "./src/navigation/auth-navigator";
// import { AuthContext } from "./src/context/auth-context";
import { AuthProvider } from "./src/component/AuthProvider";
export default function Main() {
  const [user, setUser] = useState(null);
  const insets = useSafeAreaInsets();

  // const { setUserData, getUser, token } = useContext(AuthContext);

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
        {/* <AuthContext.Provider value={{ setUserData, getUser, token }}> */}
          <AuthProvider>
            <NavigationContainer>
              {user ? <AppStackNavigator /> : <AuthStackNavigator />}
            </NavigationContainer>
          </AuthProvider>
        {/* </AuthContext.Provider> */}
      </SafeAreaView>
    </>
  )
}

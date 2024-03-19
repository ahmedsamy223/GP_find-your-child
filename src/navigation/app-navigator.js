import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ViewScreen from "../screens/Home/View";
import { useAuth } from "../context/auth-context";
import ViewScreen2 from "../screens/Home/View2";
const Stack = createStackNavigator();
export const AppStackNavigator = () => {
  const {user}=useAuth();
  return (
    <Stack.Navigator  
    screenOptions={{
      headerShown: false
    }}>
      {user.role==="parent"? 
      <Stack.Screen
        name="ViewScreen"
        component={ViewScreen}
      />
    :
     <Stack.Screen
     name="ViewScreen"
      component={ViewScreen2}
      />}
    </Stack.Navigator>
  );
};

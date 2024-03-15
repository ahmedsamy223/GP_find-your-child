import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useAuth } from "../../context/auth-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Articles from "../CommuintySpace/Articles";
import ProfileScreen from "../Profile/Profile";
import ImageSelectionScreen from "../Find/Find";

const Stack = createStackNavigator();
const ViewScreen = () => {
  const Tab = createBottomTabNavigator();
  const { user } = useAuth();
  // Custom component for Tab 1
  function Tab1Screen() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Articles />
      </View>
    );
  }

  // Custom component for Tab 2
  function Tab2Screen() {
    return (
      <ImageSelectionScreen/>
    )
  }

  // Custom component for Tab 3
  function Tab3Screen() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Tab 3</Text>
      </View>
    );
  }
  function Tab4Screen() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Text
            style={{ fontSize: 30, fontWeight: "bold", textAlign: "center" }}
            className=" text-blue-400"
          >
            Profile
          </Text>
        </View>
        <ProfileScreen />
      </View>
    );
  }

  // Main component that renders the bottom tab navigator
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: { position: "absolute" },
          style: {
            bottom: 25,
            left: 20,
            right: 20,
            elevation: 0,
            backgroundColor: "#ffffff",
            borderRadius: 15,
            height: 90,
            ...styles,
          },
        }}
      >
        <Tab.Screen
          name="Tab1"
          component={Tab1Screen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 10,
                }}
              >
                <Image
                  source={require("../../../assets/icons8-home-50.png")}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? "#007FFF" : "#748c94",
                  }}
                />
                <Text
                  style={{
                    color: focused ? "#007FFF" : "#748c94",
                    fontSize: 12,
                  }}
                >
                  HOME
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Tab2"
          component={Tab2Screen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 10,
                }}
              >
                <Image
                  source={require("../../../assets/icons8-magnifying-glass-50.png")}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? "#007FFF" : "#748c94",
                  }}
                />
                <Text
                  style={{
                    color: focused ? "#007FFF" : "#748c94",
                    fontSize: 12,
                  }}
                >
                  Find
                </Text>
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="Tab3"
          component={Tab3Screen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 10,
                }}
              >
                <Image
                  source={require("../../../assets/icons8-chat-64.png")}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? "#007FFF" : "#748c94",
                  }}
                />
                <Text
                  style={{
                    color: focused ? "#007FFF" : "#748c94",
                    fontSize: 12,
                  }}
                >
                  Chat
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Tab4"
          component={Tab4Screen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 10,
                }}
              >
                <Image
                  source={require("../../../assets/icons8-about-me-50.png")}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? "#007FFF" : "#748c94",
                  }}
                />
                <Text
                  style={{
                    color: focused ? "#007FFF" : "#748c94",
                    fontSize: 12,
                  }}
                >
                  Profile
                </Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
export default ViewScreen;

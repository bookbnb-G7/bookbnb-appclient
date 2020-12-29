import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import ProfileStackScreen from "./app/screens/Profile/ProfileStackScreen";
import BnbLoading from "./app/components/BnbLoading";
import useGetCurrentSignedInUser from "./app/database/useGetCurrentSignedInUser";
import HomeStack from "./app/screens/HomeStack";
import SearchStack from "./app/screens/SearchStack";

const Tab = createBottomTabNavigator();

export default function App() {
  const [user, initializing] = useGetCurrentSignedInUser();
  console.log("##############");
  if (initializing) {
    return <BnbLoading></BnbLoading>;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="HomeStack"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "HomeStack") {
              iconName = "ios-home";
            } else if (route.name === "ProfileStack") {
              iconName = "ios-contact";
            } else if (route.name === "SearchRooms") {
              iconName = "ios-search";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{ title: "Inicio" }}
        />
        {user && (
          <Tab.Screen
            name="SearchRooms"
            component={SearchStack}
            options={{ title: "Buscar" }}
          />
        )}
        {user && (
          <Tab.Screen
            name="ProfileStack"
            component={ProfileStackScreen}
            options={{ title: "Perfil" }}
          />
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  useFonts,
  Raleway_700Bold,
  Raleway_400Regular,
  Raleway_500Medium,
  Raleway_600SemiBold,
} from "@expo-google-fonts/raleway";

import ProfileStackScreen from "./app/screens/Profile/ProfileStackScreen";
import BnbLoading from "./app/components/BnbLoading";
import useGetCurrentSignedInUser from "./app/database/useGetCurrentSignedInUser";
import HomeStack from "./app/screens/HomeStack";
import SearchStack from "./app/screens/SearchStack";
import colors from "./app/config/colors";
import firebase from "./app/database/firebase";
import { LogBox } from "react-native";
import useTimer from "./app/helpers/useTimer";
import BnbSecureStore from "./app/classes/BnbSecureStore";
import constants from "./app/constant/constants";
import ChatStack from "./app/screens/ChatStack";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

const Tab = createBottomTabNavigator();

export default function App() {
  const [user, initializing] = useGetCurrentSignedInUser();
  const [loaded, error] = useFonts({
    Raleway_700Bold,
    Raleway_400Regular,
    Raleway_500Medium,
    Raleway_600SemiBold,
  });

  const refreshToken = async () => {
    const stoUser = await BnbSecureStore.readUnsafe(constants.CACHE_USER_KEY);
    if (user && stoUser) {
      console.log("TOKEN refresheado");
      user.getIdToken(true).then(async (token) => {
        const storedUser = await BnbSecureStore.read(constants.CACHE_USER_KEY);
        await BnbSecureStore.rememberMe(token, storedUser.userData);
      });
    }
  };
  /**El idToken de firebase dura 1 hora => 3600 segundos */
  /**Lo refresheo cada 3300 para asegurarme de que se refreshea antes de expirar*/
  useTimer(3300, refreshToken);
  useEffect(() => {
    refreshToken();
  }, [user]);

  if (!loaded) {
    return <BnbLoading text="Cargando fuentes..." />;
  }

  if (initializing) {
    return <BnbLoading />;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="HomeStack"
        tabBarOptions={{
          activeTintColor: colors.redAirBNB,
          labelStyle: {
            fontFamily: "Raleway_700Bold",
          },
          keyboardHidesTabBar: true,
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "HomeStack") {
              iconName = "home";
            } else if (route.name === "ProfileStack") {
              iconName = "person";
            } else if (route.name === "SearchRooms") {
              iconName = "search";
            } else if (route.name === "ChatStack") {
              iconName = "chatbox";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            title: "Inicio",
            tabBarVisible: Boolean(user),
          }}
          initialParams={{ isLoggedIn: Boolean(user) }}
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
            name="ChatStack"
            component={ChatStack}
            options={{ title: "Chat" }}
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

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
import BnbSecureStore from "./app/classes/BnbSecureStore";
import constants from "./app/constant/constants";
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const Tab = createBottomTabNavigator();

export default function App() {
  const [user, initializing] = useGetCurrentSignedInUser();
  const [_is_refreshing, setIsRefreshing] = useState(false);
  const [loaded, error] = useFonts({
    Raleway_700Bold,
    Raleway_400Regular,
    Raleway_500Medium,
    Raleway_600SemiBold,
  });

  useEffect(() => {
    firebase.auth.onIdTokenChanged(function (user) {
      if (user) {
        /**ojo con el loop de refresheo de tokens, idToken refreshea por lo que activa onIdToken Changed */
        /**No se activa al expirar el token, ver si el token tiene un tiempo de expiracion */
        console.log("Signin or token refresh");
        user.getIdToken().then((id_token) => {
          console.log("onIdTokenChanged: " + id_token + "\n");

          BnbSecureStore.read(constants.CACHE_USER_KEY).then((storedUser) => {
            if (storedUser && id_token != storedUser.auth_token) {
              console.log("Refresheando token");
              /**Si tengo un user en el Storage y su token es distinto,
               * lo reemplazo por el mas nuevo*/
              //storedUser.auth_token = id_token;
              //BnbSecureStore.remember(constants.CACHE_USER_KEY, storedUser);
            }
          });
        });
      }
    });
  }, []);

  if (!loaded) {
    return <BnbLoading text="Cargando fuentes..." />;
  }

  console.log("##############");
  if (_is_refreshing) {
    return <BnbLoading text={"Refresheando sesión"} />;
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
            }

            // You can return any component that you like here!
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

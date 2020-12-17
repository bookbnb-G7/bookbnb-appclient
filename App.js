import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import SearchResultRooms from "./app/screens/SearchResultRooms";
import SearchRoomsScreen from "./app/screens/SearchRoomsScreen";
import SearchInputScreen from "./app/screens/SearchInputScreen";
import CalendarScreen from "./app/screens/CalendarScreen";
import SearchCountersScreen from "./app/screens/SearchCountersScreen";
import RoomScreen from "./app/screens/RoomScreen";
import ProfileStackScreen from "./app/screens/Profile/ProfileStackScreen";
import RoomEditScreen from "./app/screens/RoomEditScreen";
import BnbLoading from "./app/components/BnbLoading";
import useGetCurrentSignedInUser from "./app/database/useGetCurrentSignedInUser";
import BnbHeaderUserInfo from "./app/components/BnbHeaderUserInfo";
import BnbSecureStore from "./app/classes/BnbSecureStore";
import constants from "./app/constant/constants";
import HomeStack from "./app/screens/HomeStack";

const SearchStack = createStackNavigator();

function SearchStackScreen() {
  const [storedUser, setStoredUser] = useState();

  useEffect(() => {
    BnbSecureStore.read(constants.CACHE_USER_KEY).then((response) => {
      setStoredUser(response);
    });
  }, []);

  if (!storedUser) {
    return <BnbLoading></BnbLoading>;
  } else {
    return (
      <SearchStack.Navigator
        screenOptions={{
          headerRight: (props) => (
            <BnbHeaderUserInfo userEmail={storedUser.userData.email} />
          ),
        }}
      >
        <SearchStack.Screen name="SearchRooms" component={SearchRoomsScreen} />
        <SearchStack.Screen name="SearchInput" component={SearchInputScreen} />
        <SearchStack.Screen name="SearchCalendar" component={CalendarScreen} />
        <SearchStack.Screen
          name="SearchCounters"
          component={SearchCountersScreen}
        />
        <SearchStack.Screen
          name="SearchResultRooms"
          component={SearchResultRooms}
        />
        <SearchStack.Screen name="Room" component={RoomScreen} />
        <SearchStack.Screen name="RoomDetails" component={RoomEditScreen} />
      </SearchStack.Navigator>
    );
  }
}

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
            component={SearchStackScreen}
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

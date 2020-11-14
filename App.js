import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Image } from "react-native";

const Stack = createStackNavigator();

import LoginScreen from "./app/screens/LoginScreen";
import NotesScreen from "./app/screens/NotesScreen";
import HomeScreen from "./app/screens/HomeScreen";
import PostsScreen from "./app/screens/PostsScreen";
import RoomsScreen from "./app/screens/RoomsScreen";
import GetRoomScreen from "./app/screens/GetRoomScreen";
import ReviewRoomScreen from "./app/screens/ReviewRoomScreen";
import Profile from "./app/screens/Profile";
import SearchResultRooms from "./app/screens/SearchResultRooms";
import SearchRoomsScreen from "./app/screens/SearchRoomsScreen";
import SearchInputScreen from "./app/screens/SearchInputScreen";
import CalendarScreen from "./app/screens/CalendarScreen";
import SearchCountersScreen from "./app/screens/SearchCountersScreen";

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={require("./app/assets/Octocat.png")}
    ></Image>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerRight: (props) => <LogoTitle {...props} /> }}
      >
        <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
        <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
        <Stack.Screen name="Notes" component={NotesScreen}></Stack.Screen>
        <Stack.Screen name="Posts" component={PostsScreen}></Stack.Screen>
        <Stack.Screen name="Rooms" component={RoomsScreen}></Stack.Screen>
        <Stack.Screen name="GetRoom" component={GetRoomScreen}></Stack.Screen>
        <Stack.Screen name="ReviewRoom" component={ReviewRoomScreen} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="SearchRooms" component={SearchRoomsScreen} />
        <Stack.Screen name="SearchInput" component={SearchInputScreen} />
        <Stack.Screen name="SearchCalendar" component={CalendarScreen} />
        <Stack.Screen name="SearchCounters" component={SearchCountersScreen} />
        <Stack.Screen name="SearchResultRooms" component={SearchResultRooms} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

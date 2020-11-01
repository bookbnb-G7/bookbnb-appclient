import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import LoginScreen from "./app/screens/LoginScreen";
import NotesScreen from "./app/screens/NotesScreen";
import HomeScreen from "./app/screens/HomeScreen";
import PostsScreen from "./app/screens/PostsScreen";
import RoomsScreen from "./app/screens/RoomsScreen";

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
        <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
        <Stack.Screen name="Notes" component={NotesScreen}></Stack.Screen>
        <Stack.Screen name="Posts" component={PostsScreen}></Stack.Screen>
        <Stack.Screen name="Rooms" component={RoomsScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

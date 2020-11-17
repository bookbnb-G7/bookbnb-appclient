import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import LoginScreen from "./app/screens/LoginScreen";
import HomeScreen from "./app/screens/HomeScreen";
import SearchUsersScreen from "./app/screens/SearchUsersScreen";
import SearchResultRooms from "./app/screens/SearchResultRooms";
import SearchRoomsScreen from "./app/screens/SearchRoomsScreen";
import SearchInputScreen from "./app/screens/SearchInputScreen";
import CalendarScreen from "./app/screens/CalendarScreen";
import SearchCountersScreen from "./app/screens/SearchCountersScreen";
import RoomScreen from "./app/screens/RoomScreen";
import SearchUsersResultScreen from "./app/screens/SearchUsersResultScreen";
import ProfileStackScreen from "./app/screens/Profile/ProfileStackScreen";

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={require("./app/assets/Octocat.png")}
    ></Image>
  );
}

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{ headerRight: (props) => <LogoTitle {...props} /> }}
    >
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="SearchUsers" component={SearchUsersScreen} />
      <HomeStack.Screen
        name="SearchUsersResult"
        component={SearchUsersResultScreen}
      />
      <HomeStack.Screen name="ProfileStack" component={ProfileStackScreen} />
    </HomeStack.Navigator>
  );
}

const SearchStack = createStackNavigator();

function SearchStackScreen() {
  return (
    <SearchStack.Navigator
      screenOptions={{ headerRight: (props) => <LogoTitle {...props} /> }}
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
    </SearchStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
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
          name="ProfileStack"
          component={ProfileStackScreen}
          options={{ title: "Perfil" }}
        />
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
          options={{ title: "Inicio" }}
        />
        <Tab.Screen
          name="SearchRooms"
          component={SearchStackScreen}
          options={{ title: "Buscar" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

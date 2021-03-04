import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import BnbLoading from "../components/BnbLoading";
import useGetCurrentSignedInUser from "../database/useGetCurrentSignedInUser";
import HomeScreen from "./HomeScreen";
import SignUpScreen from "./SignUpScreen";
import UserLoginScreen from "./UserLoginScreen";
import WelcomeScreen from "./WelcomeScreen";
import SendPassResetEmailScreen from "./SendPassResetEmailScreen";
import LoginSelectScreen from "./LoginSelectScreen";
import RegisterSelectScreen from "./RegisterSelectScreen";
import OAuthSignupScreen from "./OAuthSignupScreen";
import DebugGoToRoomProfile from "./DebugGoToRoomProfile";

const HomeStackNav = createStackNavigator();

function HomeStack({ route }) {
  const userScreens = {
    Home: HomeScreen,
    DebugGoToRoomProfile: DebugGoToRoomProfile,
  };

  const authScreens = {
    Welcome: WelcomeScreen,
    RegisterSelect: RegisterSelectScreen,
    SignUp: SignUpScreen,
    OAuthSignup: OAuthSignupScreen,
    LoginSelect: LoginSelectScreen,
    UserLogin: UserLoginScreen,
    PasswordRecover: SendPassResetEmailScreen,
  };

  const [_is_logged_in, setIsLoggedIn] = useState(false);
  useEffect(() => {
    setIsLoggedIn(route.params.isLoggedIn);
  }, [route.params?.isLoggedIn]);

  return (
    <HomeStackNav.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontFamily: "Raleway_700Bold",
        },
        headerTitleAlign: "center",
      }}
    >
      {Object.entries({
        ...(_is_logged_in ? userScreens : authScreens),
      }).map(([name, component]) => (
        <HomeStackNav.Screen
          name={name}
          component={component}
          key={name}
        ></HomeStackNav.Screen>
      ))}
    </HomeStackNav.Navigator>
  );
}

export default HomeStack;

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

const HomeStackNav = createStackNavigator();

function HomeStack({ route }) {
  /**https://stackoverflow.com/questions/61281739/how-do-i-access-promise-callback-value-outside-of-the-function */
  /**Uso el observer en vez del SecureStore porque este screen no se actualiza nunca
   * por lo tanto queda el store de la sesion anterior
   */
  const userScreens = {
    Home: HomeScreen,
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

  /**Podria poner un observer aca que espere al login pero del appserver
   * para recien ahi cambiar los screens
   * react navigation tiene para pasar parametros entre screens
   * el problema es que el screen se desmonta cuando logeo
   * y si paso el observer para dentro del lgin screen?
   * bool isLoggedIn = SignUpObserver(SignUpScreen)
   */

  const [_is_logged_in, setIsLoggedIn] = useState(false);
  useEffect(() => {
    console.log(route.params.isLoggedIn);
    console.log(_is_logged_in);
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

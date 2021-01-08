import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import BnbHeaderUserInfo from "../components/BnbHeaderUserInfo";
import BnbLoading from "../components/BnbLoading";
import useGetCurrentSignedInUser from "../database/useGetCurrentSignedInUser";
import HomeScreen from "./HomeScreen";
import SignUpScreen from "./SignUpScreen";
import UserLoginScreen from "./UserLoginScreen";
import WelcomeScreen from "./WelcomeScreen";
import PasswordRecover from "./PasswordRecover";
import BnbImageSlider from "../components/BnbImageSlider";
import SendPassResetEmailScreen from "./SendPassResetEmailScreen";

const HomeStackNav = createStackNavigator();

function HomeStack(props) {
  /**https://stackoverflow.com/questions/61281739/how-do-i-access-promise-callback-value-outside-of-the-function */

  /**Uso el observer en vez del SecureStore porque este screen no se actualiza nunca
   * por lo tanto queda el store de la sesion anterior
   */
  const [user, initializing] = useGetCurrentSignedInUser();

  if (initializing) {
    return <BnbLoading />;
  }

  if (!user) {
    return (
      <HomeStackNav.Navigator screenOptions={{ headerShown: false }}>
        <HomeStackNav.Screen name="Welcome" component={WelcomeScreen} />
        <HomeStackNav.Screen name="SignUp" component={SignUpScreen} />
        <HomeStackNav.Screen name="UserLogin" component={UserLoginScreen} />
        <HomeStackNav.Screen
          name="PasswordRecover"
          component={SendPassResetEmailScreen}
        />
      </HomeStackNav.Navigator>
    );
  }

  return (
    <HomeStackNav.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontFamily: "Raleway_700Bold",
        },
        headerTitleAlign: "center"
      }}
    >
      <HomeStackNav.Screen
        name="Home"
        component={HomeScreen}
        initialParams={{ user_email: user.email }}
      />
    </HomeStackNav.Navigator>
  );
}

export default HomeStack;

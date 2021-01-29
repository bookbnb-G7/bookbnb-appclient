import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import BnbSecureStore from "../classes/BnbSecureStore";
import constants from "../constant/constants";
import ProfileChatsScreen from "./Profile/ProfileChatsScreen";
import UserChatScreen from "./Profile/UserChatScreen";


const ChatStackNav = createStackNavigator();

function ChatStack(props) {
  const [storedUser, setStoredUser] = useState();

  useEffect(() => {
    BnbSecureStore.read(constants.CACHE_USER_KEY).then((response) => {
      setStoredUser(response);
    });
  }, []);

  if (!storedUser) {
    return <Text>Cargando...</Text>;
  } else {
    return (
      <ChatStackNav.Navigator
        screenOptions={{
          headerTitleStyle: {
            fontFamily: "Raleway_700Bold",
          },
          headerTitleAlign: "center",
        }}
      >
        <ChatStackNav.Screen
          name="Chats"
          component={ProfileChatsScreen}
        />
        <ChatStackNav.Screen
          name="UserChat"
          component={UserChatScreen}
        />
      </ChatStackNav.Navigator>
    );
  }
}

export default ChatStack;

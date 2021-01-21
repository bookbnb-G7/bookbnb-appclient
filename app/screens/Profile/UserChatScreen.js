import React, { useCallback, useEffect, useState } from "react";
import BnbMainView from "../../components/BnbMainView";
import httpGetTokenRequest from "../../helpers/httpGetTokenRequest";
import urls from "../../constant/urls";
import BnbSecureStore from "../../classes/BnbSecureStore";
import constants from "../../constant/constants";
import { GiftedChat } from "react-native-gifted-chat";
import { Text } from "react-native";

function UserChatScreen({ route, navigation }) {
  const other_uuid = route.other_uuid;
  const [_messages, setMessages] = useState([]);
  const [storedUser, setStoredUser] = useState({});

  /**_id del mensaje de GiftedChat es necesario? */
  const [_id, setId] = useState(1);

  const buildChatMessage = (message) => {
    const giftedMessage = {
      _id: _id,
      text: message.message,
      createdAt: new Date(message.timestamp),
      user: { _id: message.sender_uuid, name: message.sender_name },
    };
    setId(_id + 1);
    return giftedMessage;
  };

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, message)
    );
  }, []);

  useEffect(() => {
    BnbSecureStore.read(constants.CACHE_USER_KEY).then((user) => {
      setStoredUser(user);
      httpGetTokenRequest("GET", urls.URL_ME + "/chats/", {
        "x-access-token": user.auth_token,
      }).then((chat) => {
        /**Los mensajes del appserver los modifico para ser usados en el GiftedChat */
        let messages = [];
        chat.messages.forEach((element) => {
          messages.push(buildChatMessage(element));
        });
        setMessages(messages);
      });
    });
  }, []);

  if (!storedUser || !_messages) {
    <Text style={{ alignSelf: "center" }}>Cargando...</Text>;
  }

  return (
    <BnbMainView>
      <GiftedChat
        message={_messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: storedUser.userData.id,
          name: storedUser.userData.firstname,
        }}
      />
    </BnbMainView>
  );
}

export default UserChatScreen;

import React, { useCallback, useEffect, useState } from "react";
import BnbMainView from "../../components/BnbMainView";
import httpGetTokenRequest from "../../helpers/httpGetTokenRequest";
import urls from "../../constant/urls";
import BnbSecureStore from "../../classes/BnbSecureStore";
import constants from "../../constant/constants";
import { GiftedChat } from "react-native-gifted-chat";
import { Text } from "react-native";
import BnbError from "../../components/BnbError";
import httpPostTokenRequest from "../../helpers/httpPostTokenRequest";

function UserChatScreen({ route, navigation }) {
  const other_uuid = route.params.other_uuid;
  const [_messages, setMessages] = useState([]);
  const [storedUser, setStoredUser] = useState();
  const [_error, setError] = useState();

  /**Se supone que uso esto para darle el formato de gitedChat a los mensajes que obtengo
   * del app server que tienen otro formato, no deberia usarlo para POST de mensajes
   * solo cuando hago un GET
   */
  const buildChatMessage = (message, id) => {
    const giftedMessage = {
      _id: id,
      text: message.message,
      createdAt: new Date(message.timestamp),
      user: { _id: message.sender_uuid, name: message.sender_name },
    };
    return giftedMessage;
  };

  const onSend = useCallback((messages = [], auth_token) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    httpPostTokenRequest(
      "POST",
      urls.URL_ME + "/chats/" + other_uuid,
      { message: messages[messages.length - 1].text },
      {
        "Content-Type": "application/json",
        "x-access-token": auth_token,
      }
    ).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error.message);
      }
    );
  }, []);

  useEffect(() => {
    BnbSecureStore.read(constants.CACHE_USER_KEY).then((user) => {
      setStoredUser(user);
      console.log(user);
      httpGetTokenRequest("GET", urls.URL_ME + "/chats/" + other_uuid, {
        "x-access-token": user.auth_token,
      }).then(
        (chat) => {
          /**Los mensajes del appserver los modifico para ser usados en el GiftedChat */
          let messages = [];
          /**Los itero de forma invertida dado que el appserver los guarda al reves que GiftedChat */
          for (var i = chat.messages.length - 1; i >= 0; i--) {
            messages.push(buildChatMessage(chat.messages[i], messages.length));
          }
          setMessages(messages);
        },
        (error) => {
          setError(error);
        }
      );
    });
  }, []);

  if (_error) {
    return <BnbError>{_error.message}</BnbError>;
  }

  if (!storedUser) {
    return <Text style={{ alignSelf: "center" }}>Cargando...</Text>;
  }

  return (
    <BnbMainView>
      <Text>Tu id: {storedUser.userData.id}</Text>
      <Text>Chateando con other_uuid: {other_uuid}</Text>
      <GiftedChat
        messages={_messages}
        onSend={(messages) => onSend(messages, storedUser.auth_token)}
        user={{
          _id: storedUser.userData.id,
          name: storedUser.userData.firstname,
        }}
      />
    </BnbMainView>
  );
}

export default UserChatScreen;

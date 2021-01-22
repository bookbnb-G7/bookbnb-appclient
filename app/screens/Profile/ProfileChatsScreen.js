import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import BnbSecureStore from "../../classes/BnbSecureStore";
import BnbBodyView from "../../components/BnbBodyView";
import BnbError from "../../components/BnbError";
import BnbIconText from "../../components/BnbIconText";
import BnbMainView from "../../components/BnbMainView";
import bnbStyleSheet from "../../constant/bnbStyleSheet";
import constants from "../../constant/constants";
import urls from "../../constant/urls";
import httpGetTokenRequest from "../../helpers/httpGetTokenRequest";

function ProfileChatsScreen({ navigation }) {
  const [_chats, setChats] = useState();
  const [_error, setError] = useState();
  const [_chats_photos, setChatsPhotos] = useState([]);

  const _handleUserChatTap = (other_uuid) => {
    navigation.navigate("UserChat", { other_uuid: other_uuid });
  };

  useEffect(() => {
    BnbSecureStore.read(constants.CACHE_USER_KEY).then((user) => {
      httpGetTokenRequest("GET", urls.URL_ME + "/chats", {
        "x-access-token": user.auth_token,
      }).then(
        (chats) => {
          setChats(chats);
          /**si obtengo los chats, busco los usuarios para fetchear las imagenes */
          /**chats.chats.forEach((chat) => {
            httpGetTokenRequest(
              "GET",
              urls.URL_USERS + "/" + chat.other_uuid,
              {}
            ).then(
              (user) => {
                setChatsPhotos(_chats_photos.push([user.photo]));
              },
              (error) => {
                setChatsPhotos(_chats_photos.push(""));
              }
            );
          });*/
        },
        (error) => {
          setError(error);
        }
      );
    });
  }, []);

  const renderItem = ({ chat }) => {
    console.log("CHAT:" + chat);
    if (chat) {
      return (
        <TouchableOpacity
          onPress={() => {
            _handleUserChatTap(chat.other_uuid);
          }}
        >
          <BnbIconText logo="">{chat.other_user}</BnbIconText>;
        </TouchableOpacity>
      );
    }
  };

  if (_error) {
    return <BnbError>Error: {_error.message}</BnbError>;
  }

  return (
    <BnbMainView>
      <BnbBodyView>
        <SafeAreaView>
          <Text style={bnbStyleSheet.headerTextBlack}>Mis chats</Text>
          {_chats &&
            _chats.chats.map((item, index) => (
              <View key={item.other_uuid}>
                <TouchableOpacity
                  onPress={() => {
                    _handleUserChatTap(item.other_uuid);
                  }}
                >
                  <BnbIconText iconName="ios-person">
                    {item.other_user}
                  </BnbIconText>
                </TouchableOpacity>
              </View>
            ))}
        </SafeAreaView>
      </BnbBodyView>
    </BnbMainView>
  );
}

const styles = StyleSheet.create({});

export default ProfileChatsScreen;

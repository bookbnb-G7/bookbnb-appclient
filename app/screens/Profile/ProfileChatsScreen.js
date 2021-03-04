import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import BnbSecureStore from "../../classes/BnbSecureStore";
import BnbBodyView from "../../components/BnbBodyView";
import BnbError from "../../components/BnbError";
import BnbIconText from "../../components/BnbIconText";
import BnbMainView from "../../components/BnbMainView";
import BnbUserLogo from "../../components/BnbUserLogo";
import colors from "../../config/colors";
import styling from "../../config/styling";
import bnbStyleSheet from "../../constant/bnbStyleSheet";
import constants from "../../constant/constants";
import urls from "../../constant/urls";
import httpGetTokenRequest from "../../helpers/httpGetTokenRequest";

function ProfileChatsScreen({ navigation }) {
  const [_chats, setChats] = useState();
  const [_error, setError] = useState();

  const _handleUserChatTap = (other_uuid) => {
    navigation.navigate("UserChat", { other_uuid: other_uuid });
  };

  const fetchChatsData = () => {
    BnbSecureStore.read(constants.CACHE_USER_KEY).then((user) => {
      httpGetTokenRequest("GET", urls.URL_ME + "/chats", {
        "x-access-token": user.auth_token,
      }).then(
        (chats) => {
          setChats(chats);
        },
        (error) => {
          setError(error);
        }
      );
    });
  };

  useFocusEffect(
    useCallback(() => {
      fetchChatsData();
    }, [])
  );

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
                  <View style={styles.userPhotoContainer}>
                    <BnbUserLogo
                      user_id={item.other_uuid}
                      imageStyle={styles.icon}
                    ></BnbUserLogo>
                    <Text style={bnbStyleSheet.mediumText}>
                      {item.other_user}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
        </SafeAreaView>
      </BnbBodyView>
    </BnbMainView>
  );
}

const styles = StyleSheet.create({
  userPhotoContainer: {
    marginVertical: styling.separator,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: styling.smallCornerRadius,
    backgroundColor: colors.graySoft,
  },
});

export default ProfileChatsScreen;

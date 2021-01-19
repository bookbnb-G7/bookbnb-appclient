import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import colors from "../../config/colors";
import fonts from "../../config/fonts";

import Separator from "../../components/Separator";
import BnbMainView from "../../components/BnbMainView";
import BnbBodyView from "../../components/BnbBodyView";
import BnbIconText from "../../components/BnbIconText";
import { TouchableOpacity } from "react-native-gesture-handler";
import BnbSecureStore from "../../classes/BnbSecureStore";
import constants from "../../constant/constants";
import BnbButton from "../../components/BnbButton";
import firebase from "../../database/firebase";
import bnbStyleSheet from "../../constant/bnbStyleSheet";

function ProfileOwnerScreen({ route, navigation }) {
  const [storedUser, setStoredUser] = useState();

  useEffect(() => {
    BnbSecureStore.read(constants.CACHE_USER_KEY).then((response) => {
      setStoredUser(response);
    });
  }, []);

  const _handleRoomsInfoPress = () => {
    navigation.navigate("ProfileRoomsOptions");
  };

  const _handleWalletPress = () => {
    navigation.navigate("ProfileWallet");
  };

  const _handleLogOutButton = () => {
    BnbSecureStore.clear(constants.CACHE_USER_KEY).then(() => {
      firebase.auth
        .signOut()
        .then(() => console.log(storedUser.userData.email + " Cerro sesion"))
        .then(() => navigation.navigate("HomeStack"));
    });
  };

  const _handleChatsButtonPress = () => {
    navigation.navigate("ProfileChats");
  };

  const PROFILE_OPTIONS = [
    { id: 0, title: "Habitaciones" },
    { id: 1, title: "Billetera" },
    { id: 2, title: "Chats" },
  ];

  const ICONS_NAMES = ["ios-home", "ios-wallet", "ios-chatbox"];
  const HANDLERS = [
    _handleRoomsInfoPress,
    _handleWalletPress,
    _handleChatsButtonPress,
  ];

  return (
    <BnbMainView>
      <BnbBodyView>
        {storedUser && (
          <Text style={bnbStyleSheet.headerTextBlack}>
            {storedUser.userData.firstname} {storedUser.userData.lastname}
          </Text>
        )}
        {storedUser && (
          <Text style={bnbStyleSheet.headerTextBlack}>
            {storedUser.userData.email}
          </Text>
        )}
        <View style={styles.bodyContainer}>
          {PROFILE_OPTIONS.map((element) => (
            <View key={element.id}>
              <TouchableOpacity onPress={HANDLERS[element.id]}>
                <Separator></Separator>
                <BnbIconText
                  style={styles.iconText}
                  iconName={ICONS_NAMES[element.id]}
                >
                  {element.title}
                </BnbIconText>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <BnbButton
          title="Cerrar sesion"
          onPress={_handleLogOutButton}
        ></BnbButton>
      </BnbBodyView>
    </BnbMainView>
  );
}

const styles = StyleSheet.create({
  userInfoContainer: {
    alignItems: "center",
  },
  userInfoAndButtons: {},
  userLogo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.graySoft,
  },
  userName: {
    fontSize: fonts.big,
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  iconText: {
    height: 50,
  },
});

export default ProfileOwnerScreen;

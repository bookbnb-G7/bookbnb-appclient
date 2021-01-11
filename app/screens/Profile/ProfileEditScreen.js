import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, StatusBar } from "react-native";
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
import BnbImage from "../../components/BnbImage";
import bnbStyleSheet from "../../constant/bnbStyleSheet";
import { Divider } from "react-native-elements";

function ProfileEditScreen({ route, navigation }) {
  const [storedUser, setStoredUser] = useState();

  useEffect(() => {
    BnbSecureStore.read(constants.CACHE_USER_KEY).then((response) => {
      setStoredUser(response);
    });
  }, []);

  const _handleProfileInfoPress = () => {
    navigation.navigate("ProfileInfo");
  };

  const _handleRoomsInfoPress = () => {
    navigation.navigate("ProfileRoomsOptions");
  };

  const _handleProfileImagePress = () => {
    navigation.navigate("ImagePick");
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

  const PROFILE_OPTIONS = [
    { id: 0, title: "Informacion de la cuenta" },
    { id: 1, title: "Habitaciones" },
    { id: 2, title: "Billetera" },
  ];

  const ICONS_NAMES = ["ios-person", "ios-home", "ios-wallet"];
  const HANDLERS = [
    _handleProfileInfoPress,
    _handleRoomsInfoPress,
    _handleWalletPress,
  ];

  return (
    <BnbMainView>
      <BnbBodyView>
        <View style={styles.userInfoContainer}>
          {storedUser && (
            <BnbImage
              imageStyle={styles.userLogo}
              uri={storedUser.userData.photo}
              onPress={_handleProfileImagePress}
            ></BnbImage>
          )}

          {storedUser && (
            <Text style={styles.userName}>
              {storedUser.userData.firstname} {storedUser.userData.lastname}
            </Text>
          )}
          {storedUser && (
            <Text style={styles.userName}>{storedUser.userData.email}</Text>
          )}
        </View>
        <View style={styles.bodyContainer}>
          {PROFILE_OPTIONS.map((element) => (
            <View key={element.id}>
              <Separator />
              <TouchableOpacity onPress={HANDLERS[element.id]}>
                <BnbIconText iconName={ICONS_NAMES[element.id]}>
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
});

export default ProfileEditScreen;

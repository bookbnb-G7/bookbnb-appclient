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

function ProfileEditScreen({ route, navigation }) {
  const PROFILE_ICON = require("../../assets/profile_icon.png");
  const ROOM_ICON = require("../../assets/house_logo.png");

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
    navigation.navigate("ProfileRooms");
  };

  const _handleProfileImagePress = () => {
    navigation.navigate("ImagePick");
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
  ];

  const ICONS = [PROFILE_ICON, ROOM_ICON];
  const HANDLERS = [_handleProfileInfoPress, _handleRoomsInfoPress];

  return (
    <BnbMainView
      style={{
        paddingTop: StatusBar.currentHeight,
        backgroundColor: "white",
      }}
    >
      <BnbBodyView>
        <View style={styles.twoColumns}>
          <View style={styles.leftColumn}>
            <View style={styles.logoContainer}>
              <BnbImage
                onPress={_handleProfileImagePress}
                imageStyle={styles.userLogo}
                uri={
                  route.params?.photo
                    ? route.params.photo
                    : storedUser
                    ? storedUser.userData.photo
                    : ""
                }
              ></BnbImage>
            </View>
          </View>
          <View style={styles.rightColumn}>
            {storedUser && (
              <Text style={styles.userName}>{storedUser.userData.email}</Text>
            )}
          </View>
        </View>
        <View style={styles.bodyContainer}>
          {PROFILE_OPTIONS.map((element) => (
            <View key={element.id}>
              <Separator />
              <TouchableOpacity onPress={HANDLERS[element.id]}>
                <BnbIconText logo={ICONS[element.id]}>
                  {element.title}
                </BnbIconText>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <BnbButton
          style={styles.center}
          title="Cerrar sesion"
          onPress={_handleLogOutButton}
        ></BnbButton>
      </BnbBodyView>
    </BnbMainView>
  );
}

const styles = StyleSheet.create({
  center: {
    alignSelf: "center",
  },
  twoColumns: {
    //flex: 1,
    flexDirection: "row",
  },
  leftColumn: {
    //flex: 2,
    backgroundColor: colors.white,
    //alignItems: "center",
    //justifyContent: "center",
  },
  logoContainer: {
    //alignItems: "center",
  },
  userLogo: {
    width: 100,
    height: 100,
    backgroundColor: colors.graySoft,
  },
  rightColumn: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 20,
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

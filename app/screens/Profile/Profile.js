import React, { useState } from "react";
import { StyleSheet, View, Text, Image, StatusBar } from "react-native";
import colors from "../../config/colors";
import fonts from "../../config/fonts";

import Separator from "../../helpers/Separator";
import BnbButton from "../../components/BnbButton";
import BnbFooterView from "../../components/BnbFooterView";
import BnbMainView from "../../components/BnbMainView";
import BnbBodyView from "../../components/BnbBodyView";
import BnbIconText from "../../components/BnbIconText";
import { TouchableOpacity } from "react-native-gesture-handler";

function Profile({ route, navigation }) {
  const user_logo = require("../../assets/icon.png");
  const PROFILE_ICON = require("../../assets/profile_icon.png");
  const ROOM_ICON = require("../../assets/house_logo.png");
  const user = route.params;
  const [_userData, setUserData] = useState({
    firstname: "Agustin",
    lastname: "Leguizamon",
    email: "aleguizamon@fi.uba.ar",
    phonenumber: "123456",
    country: "Arg",
    birthdate: "13-7-95",
  });

  /**TODO: is_owner deberia ser un atributo del user?? */
  const _handleProfileInfoPress = () => {
    navigation.navigate("ProfileInfo", { user: _userData, is_owner: true });
  };

  const _handleRoomsInfoPress = () => {
    alert("rooms info");
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
              <Image source={user_logo} style={styles.userLogo}></Image>
            </View>
          </View>
          <View style={styles.rightColumn}>
            <Text style={styles.userName}>
              {_userData.firstname} {_userData.lastname}
            </Text>
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
      </BnbBodyView>
    </BnbMainView>
  );
}

const styles = StyleSheet.create({
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
  },
  rightColumn: {
    justifyContent: "center",
    alignItems: "center",
    //flex: 2,
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

export default Profile;

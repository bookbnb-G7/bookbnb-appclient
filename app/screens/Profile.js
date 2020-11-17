import React, { useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "../config/colors";
import containers from "../config/styling";
import fonts from "../config/fonts";

import Separator from "../helpers/Separator";
import BnbButton from "../components/BnbButton";
import BnbFooterView from "../components/BnbFooterView";
import BnbMainView from "../components/BnbMainView";

const user_logo = require("../assets/icon.png");

function Profile({ route, navigation }) {
  const user = route.params;

  const [_userData, setUserData] = useState({
    firstname: "Agustin",
    lastname: "Leguizamon",
    email: "aleguizamon@fi.uba.ar",
    phonenumber: "123456",
    country: "Arg",
    birthdate: "13-7-95",
  });

  /**{
    "firstname": "string",
    "lastname": "string",
    "email": "string",
    "phonenumber": "string",
    "country": "string",
    "birthdate": "string"
  }*/

  function _handleGotoHomeButtonPress() {
    navigation.navigate("Home");
  }

  return (
    <BnbMainView>
      <View style={styles.twoColumns}>
        <View style={styles.leftColumn}>
          <View style={styles.logoContainer}>
            <Image source={user_logo} style={styles.userLogo}></Image>
          </View>
          <Text>Agustin Leguizamon</Text>
          <Text>Administrador</Text>
        </View>
        <View style={styles.rightColumn}>
          <Text>Placeholder</Text>
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <Separator></Separator>
        <Text style={styles.subTitleText}>Informacion de la cuenta</Text>
        <View style={styles.userInfoContainer}>
          <View style={styles.leftUserInfo}>
            {Object.entries(_userData).map(([key, value]) => {
              return (
                <View style={styles.userField} key={key}>
                  <Text>{key}: </Text>
                </View>
              );
            })}
          </View>
          <View style={styles.rightUserInfo}>
            {Object.entries(_userData).map(([key, value]) => {
              return (
                <View style={styles.userField} key={key}>
                  <Text style={styles.userFieldText}>{value}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
      <BnbFooterView>
        <BnbButton
          onPress={_handleGotoHomeButtonPress}
          title={"Volver Inicio"}
        />
      </BnbFooterView>
    </BnbMainView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.redSoft2,
    padding: containers.mainFrame,
  },
  headerContainer: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderTopLeftRadius: containers.smallCornerRadius,
    borderTopRightRadius: containers.smallCornerRadius,
    borderBottomColor: colors.redSoft,
    borderBottomWidth: 1,
  },
  titleText: {
    fontSize: fonts.big,
    color: colors.redSoft,
  },
  twoColumns: {
    flex: 1,
    flexDirection: "row",
  },
  leftColumn: {
    flex: 2,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    //alignItems: "center",
  },
  userLogo: {
    width: 150,
    height: 150,
  },
  rightColumn: {
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    flex: 2,
  },
  subTitleText: {
    fontSize: fonts.semi,
    color: colors.redSoft,
    alignSelf: "center",
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  userInfoContainer: {
    backgroundColor: colors.white,
    flexDirection: "row",
  },
  userField: {
    marginHorizontal: 4,
    marginVertical: 4,
    //flexDirection: "row",
  },
  leftUserInfo: {
    flex: 1,
  },
  rightUserInfo: {
    flex: 2,
  },
  userFieldText: {
    backgroundColor: colors.graySoft,
  },
});

export default Profile;

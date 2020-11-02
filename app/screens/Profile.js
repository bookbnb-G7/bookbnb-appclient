import React, { useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "../config/colors";
import containers from "../config/containers";
import fonts from "../config/fonts";

import Separator from "../helpers/Separator";

const user_logo = require("../assets/icon.png");

/**NO funca*/
function ListObjectValues(anObject, aStyle) {
  return (
    <View>
      {Object.entries(anObject).map(([key, value]) => {
        return (
          <View style={aStyle} key={key}>
            <Text>
              {key}:{value}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

function Profile({ navigation }) {
  const [_userData, setUserData] = useState({
    name: "Agustin",
    surname: "Leguizamon",
    username: "leguiagus",
    password: "123456",
    email: "aleguizamon@fi.uba.ar",
    age: "25",
    owner: "true",
  });

  function _handleGotoHomeButtonPress() {
    navigation.navigate("Home");
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.titleText}>Perfil de usuario</Text>
      </View>
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
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText} onPress={_handleGotoHomeButtonPress}>
            Go to Home
          </Text>
        </TouchableOpacity>
      </View>
    </View>
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
  footerContainer: {
    flex: 0.2,
    backgroundColor: colors.white,
    borderBottomLeftRadius: containers.smallCornerRadius,
    borderBottomRightRadius: containers.smallCornerRadius,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {},

  buttonText: {
    paddingHorizontal: containers.buttonHPadding,
    borderWidth: 1,
    borderRadius: containers.buttonBorderRadius,
    backgroundColor: colors.redSoft2,
  },
});

export default Profile;

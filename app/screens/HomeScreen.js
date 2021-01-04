import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import BnbBodyView from "../components/BnbBodyView";
import BnbButton from "../components/BnbButton";
import BnbMainView from "../components/BnbMainView";
import styling from "../config/styling";
import BnbSecureStore from "../classes/BnbSecureStore";
import constants from "../constant/constants";
import firebase from "../database/firebase";
import BnbImageSlider from "../components/BnbImageSlider";
import Separator from "../components/Separator";

function HomeScreen({ route, navigation }) {
  const user_email = route.params.user_email;
  const [storedUser, setStoredUser] = useState();

  const background = require("../assets/background_2.png");

  useEffect(() => {
    BnbSecureStore.read(constants.CACHE_USER_KEY).then((response) => {
      setStoredUser(response);
    });
  }, []);

  function _handleSearchRoomsButton() {
    navigation.navigate("SearchRooms");
  }

  const _handleLogOutButton = () => {
    firebase.auth
      .signOut()
      .then(() => console.log(storedUser.userData.email + " Cerro sesion"))
      .then(() => navigation.navigate("HomeStack"));
  };

  return (
    <BnbMainView style={styles.mainContainer}>
      <ImageBackground source={background} style={styles.background}>
        <View style={styles.imageSlider}>
          <BnbImageSlider
            images={[require("../assets/Bookbnb_logo.png")]}
            width={200}
            onPress={() => {
              console.log("HOla");
            }}
          ></BnbImageSlider>
        </View>
        <View style={styles.optionsContainer}>
          {user_email && (
            <View>
              <BnbButton
                onPress={_handleSearchRoomsButton}
                title={"Buscar Habitaciones"}
              />
              <BnbButton
                title="DEBUG Cerrar sesion"
                onPress={_handleLogOutButton}
              ></BnbButton>
            </View>
          )}
        </View>
      </ImageBackground>
    </BnbMainView>
  );
}

const dimensions = Dimensions.get("window");

const styles = StyleSheet.create({
  mainContainer: {
    //backgroundColor: colors.graySoft,
  },
  imageSlider: {
    flex: 1,
    alignItems: "center",
  },
  optionsContainer: {
    flex: 1,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  bodyContainer: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    borderWidth: 1,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    borderRadius: styling.bigCornerRadius,
    backgroundColor: "white",
  },
  background: {
    flex: 1,
    paddingVertical: 10,
    //width: "100%",
    //resizeMode: "repeat",
  },
});

export default HomeScreen;

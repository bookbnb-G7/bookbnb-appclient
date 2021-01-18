import React, { useEffect, useState } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import BnbButton from "../components/BnbButton";
import BnbMainView from "../components/BnbMainView";
import styling from "../config/styling";
import BnbSecureStore from "../classes/BnbSecureStore";
import constants from "../constant/constants";
import firebase from "../database/firebase";
import BnbImageSlider from "../components/BnbImageSlider";
import colors from "../config/colors";

function HomeScreen({ navigation }) {
  const [storedUser, setStoredUser] = useState();

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
      .then(() => navigation.navigate("HomeStack"))
      .then(() => BnbSecureStore.clear(constants.CACHE_USER_KEY));
  };

  return (
    <BnbMainView style={styles.mainContainer}>
      <View style={styles.imageSlider}>
        <BnbImageSlider
          images={[require("../assets/Bookbnb_logo.png")]}
          width={200}
          onPress={() => {
            console.log("HOla");
          }}
        />
      </View>
      <View style={styles.optionsContainer}>
        <View>
          <BnbButton
            onPress={_handleSearchRoomsButton}
            title={"Buscar Habitaciones"}
          />
          <BnbButton
            title="DEBUG Cerrar sesion"
            onPress={_handleLogOutButton}
          />
        </View>
      </View>
    </BnbMainView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.white,
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

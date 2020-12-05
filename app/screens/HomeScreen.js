import React from "react";
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
import colors from "../config/colors";

const bnb_book_logo = require("../assets/Bookbnb_logo.png");
const background = require("../assets/background_2.png");

function HomeScreen({ navigation }) {
  function _handleSearchRoomsButton() {
    navigation.navigate("SearchRooms");
  }

  const _handleSearchUsersButton = () => {
    navigation.navigate("SearchUsers");
  };

  const _handleRegisterButton = () => {
    navigation.navigate("SignUp");
  };

  return (
    <BnbMainView style={styles.white}>
      <Image style={styles.logo} source={bnb_book_logo}></Image>
      <BnbBodyView style={styles.bodyContainer}>
        <ImageBackground source={background} style={styles.background}>
          <View style={styles.optionsContainer}>
            <BnbButton
              onPress={_handleSearchRoomsButton}
              title={"Buscar Habitaciones"}
            />
            <BnbButton onPress={_handleSearchUsersButton} title={"Ingresar"} />
            <BnbButton onPress={_handleRegisterButton} title={"Registrarse"} />
          </View>
        </ImageBackground>
      </BnbBodyView>
    </BnbMainView>
  );
}

const dimensions = Dimensions.get("window");

const styles = StyleSheet.create({
  white: {
    backgroundColor: colors.graySoft,
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
  },
  background: {
    flex: 1,
    //width: "100%",
    //resizeMode: "repeat",
  },
});

export default HomeScreen;

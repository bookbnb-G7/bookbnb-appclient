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
import BnbLoading from "../components/BnbLoading";
import BnbMainView from "../components/BnbMainView";
import colors from "../config/colors";
import styling from "../config/styling";
import useGetCurrentSignedInUser from "../database/useGetCurrentSignedInUser";
import firebase from "../database/firebase";
import { SecureStore } from "expo";

const bnb_book_logo = require("../assets/Bookbnb_logo.png");
const background = require("../assets/background_2.png");

function HomeScreen({ navigation }) {
  const [user, initializing] = useGetCurrentSignedInUser();
  function _handleSearchRoomsButton() {
    navigation.navigate("SearchRooms");
  }

  const _handleLogOutButton = () => {
    firebase.auth
      .signOut()
      .then(() => console.log(user.email + " Cerro sesion"));
  };

  if (initializing) {
    return <BnbLoading></BnbLoading>;
  } else {
    return (
      <BnbMainView style={styles.mainContainer}>
        <ImageBackground source={background} style={styles.background}>
          <Image style={styles.logo} source={bnb_book_logo}></Image>
          <View style={styles.optionsContainer}>
            {user && (
              <BnbButton
                onPress={_handleSearchRoomsButton}
                title={"Buscar Habitaciones"}
              />
            )}
          </View>
        </ImageBackground>
      </BnbMainView>
    );
  }
}

const dimensions = Dimensions.get("window");

const styles = StyleSheet.create({
  mainContainer: {
    //backgroundColor: colors.graySoft,
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

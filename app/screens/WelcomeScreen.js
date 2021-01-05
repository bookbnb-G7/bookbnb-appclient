import React from "react";
import { ImageBackground, StyleSheet, View, Image } from "react-native";
import BnbButton from "../components/BnbButton";
import BnbMainView from "../components/BnbMainView";
import colors from "../config/colors";

function WelcomeScreen({ navigation }) {
  const _handleLogIn = () => {
    navigation.navigate("UserLogin");
  };

  const _handleSignIn = () => {
    navigation.navigate("SignUp");
  };
  return (
    <BnbMainView>
      <ImageBackground source={require("../assets/welcome_screen_background.jpg")} style={styles.centerContainer} imageStyle={styles.backgroundImage}>
        <Image source={require('../assets/BookBNBtextLogo.png')} style={styles.image}/>
        <View style={{margin: 15, paddingBottom: 10}}>
          <BnbButton title="Ingresar" onPress={_handleLogIn} buttonStyle={styles.buttonStyle} style={styles.buttonTextStyle}/>
          <BnbButton title="Registrarse" onPress={_handleSignIn} buttonStyle={styles.buttonStyle} style={styles.buttonTextStyle}/>
        </View>
      </ImageBackground>
    </BnbMainView>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: "space-between",
    padding: 20,
    paddingTop: 50,
  },
  image: {
    //flex: 1,
    height: "25%",
    resizeMode: "contain",
    alignSelf: "center",
  },
  backgroundImage: {
    flex: 1,
  },
  buttonStyle: {
    backgroundColor: colors.redAirBNB,
    marginTop: 10,
  },
  buttonTextStyle: {
    color: colors.white,
    fontFamily: "Raleway_400Regular",
  }
});

export default WelcomeScreen;

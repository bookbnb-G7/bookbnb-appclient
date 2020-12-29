import React from "react";
import { ImageBackground, StyleSheet, View, Image } from "react-native";
import BnbButton from "../components/BnbButton";
import BnbMainView from "../components/BnbMainView";

function WelcomeScreen({ navigation }) {
  const _handleLogIn = () => {
    navigation.navigate("UserLogin");
  };

  const _handleSignIn = () => {
    navigation.navigate("SignUp");
  };
  return (
    <BnbMainView>
      <ImageBackground source={require("../assets/splash_screen_background.jpg")} style={styles.centerContainer} imageStyle={styles.backgroundImage}>
        <Image source={require('../assets/BookBNBtextLogoWhite.png')} style={styles.image}/>
        <View style={{margin: 13}}>
          <BnbButton title="Ingresar" onPress={_handleLogIn}></BnbButton>
          <BnbButton title="Registrarse" onPress={_handleSignIn}></BnbButton>
        </View>
      </ImageBackground>
    </BnbMainView>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: "space-around",
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
});

export default WelcomeScreen;

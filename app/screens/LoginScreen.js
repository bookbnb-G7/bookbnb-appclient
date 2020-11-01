import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";

import LoginForm from "../screens/LoginForm";

const logo = require("../assets/Octocat.png");

function LoginScreen(props) {
  return (
    /** KeyboardAVoidinvView behavior ="padding" mueve el container cuando aparece el teclado
     * para escribir
     */
    <KeyboardAvoidingView behavior="padding" style={styles.mainContainer}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.image}></Image>
        <Text style={styles.title}>
          An app made for github using React Native
        </Text>
      </View>
      <View>
        <LoginForm navigation={props.navigation} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#3498db",
  },
  logoContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
  title: {
    color: "#fff",
    marginTop: 10,
    width: 160,
    textAlign: "center",
    opacity: 0.9,
  },
  buttonContainer: {
    backgroundColor: "#2980b9",
    paddingVertical: 15,
  },
  buttonText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "700",
  },
});

export default LoginScreen;

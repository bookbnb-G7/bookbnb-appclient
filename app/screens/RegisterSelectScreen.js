import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';
import BnbBodyView from "../components/BnbBodyView";
import BnbMainView from "../components/BnbMainView";
import BnbButton from "../components/BnbButton";
import firebase from "firebase";
import colors from "../config/colors";
import constants from "../constant/constants";
import BnbLoading from "../components/BnbLoading";
import requestFBEmailAsync from "../helpers/getFacebookUserEmail";



const RegisterSelectScreen = ({ navigation }) => {
  const [errorStatus, setErrorStatus] = useState("");

  const handleEmailPassSignup = () => {
    navigation.navigate("SignUp");
  };

  const signUpWithFacebook = async () => {
    try {
      await Facebook.initializeAsync({
        appId: process.env.FACEBOOK_APP_ID,
        appName: process.env.FACEBOOK_APP_NAME,
      });
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
          permissions: ["email"],
        }
      );
      if (type === 'success') {
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        const response = await requestFBEmailAsync(token);
        navigation.navigate("OAuthSignup", {
          email: response.email,
          credential: credential,
        });
      }
    } catch ({ message }) {
      console.log(`Facebook Login Error: ${message}`);
    }
  };

  const signUpWithGoogle = async () => {
    try {
      const { type, accessToken, idToken, user } = await Google.logInAsync({
        androidClientId: process.env.ANDROID_CLIENT_ID,
        scopes: ['profile', 'email']
      });
      
      if (type  === 'success') {
        const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
        navigation.navigate("OAuthSignup", {
          firstName: user.givenName,
          lastName: user.familyName,
          email: user.email,
          credential: credential,
        });
      }
    } catch ({ message }) {
      console.log('Google login: Error: ' + message);
    }
  }

  return (
    <BnbMainView>
      <BnbBodyView style={styles.centerContainer}>
        <Text style={styles.headerText}>Elija el metodo de autenticacion</Text>
        <View>
          <BnbButton
                title="Email y contraseña"
                style={styles.buttonText}
                buttonStyle={styles.buttonStyle}
                onPress={handleEmailPassSignup}
          />
          
          <BnbButton
                title="Continuar con Google"
                style={styles.buttonText}
                buttonStyle={styles.buttonStyle}
                onPress={signUpWithGoogle}
                iconName="logo-google"
                iconColor="white"
          />

          <BnbButton
                title="Continuar con Facebook"
                style={styles.buttonText}
                buttonStyle={styles.buttonStyle}
                onPress={signUpWithFacebook}
                iconName="logo-facebook"
                iconColor="white"
          />
        </View>
        <Text style={styles.errorText}>
          {errorStatus}
        </Text>
      </BnbBodyView>
    </BnbMainView>)
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 28,
    fontFamily: "Raleway_400Regular",
    color: '#333',
    textAlign: "center",
  },
  centerContainer: {
    justifyContent: "space-around",
  },
  buttonText: {
    color: colors.white,
    fontFamily: "Raleway_400Regular",
  },
  buttonStyle: {
    borderColor: colors.redAirBNB,
    backgroundColor: colors.redAirBNB,
    marginTop: 10,
    marginHorizontal: 15,
  },
  inlineTextButton: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 5,
    fontFamily: "Raleway_400Regular",
  },
  normalText: {
    fontFamily: "Raleway_400Regular",
    fontSize: 15,
  },
  clickableText: {
    textDecorationLine: "underline",
    textAlign: "center",
    fontFamily: "Raleway_400Regular",
    fontSize: 15,
  },
  errorText: {
    color: colors.error,
    textAlign: "left",
    fontFamily: "Raleway_400Regular",
    marginLeft: 5,
  },
});

export default RegisterSelectScreen;
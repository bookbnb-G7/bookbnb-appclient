import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';
import BnbBodyView from "../components/BnbBodyView";
import httpGetTokenRequest from "../helpers/httpGetTokenRequest";
import BnbMainView from "../components/BnbMainView";
import BnbButton from "../components/BnbButton";
import BnbSecureStore from "../classes/BnbSecureStore";
import colors from "../config/colors";
import firebase from "firebase";
import urls from "../constant/urls";
import constants from "../constant/constants";
import BnbLoading from "../components/BnbLoading";


const LoginSelectScreen = ({ navigation }) => {
  const [_is_awaiting, setIsAwaiting] = useState(false);

  const handleEmailPassSignin = () => {
    navigation.navigate("UserLogin");
  };

  const _handleSignup = () => {
    navigation.navigate("SignUp");
  };

  const signInWithOauthCredential = async (credential) => {
      const userCredential = await firebase.auth().signInWithCredential(credential);
      const id_token = await userCredential.user.getIdToken();
      const data = await httpGetTokenRequest("GET", urls.URL_ME, {
          "x-access-token": id_token,
      });
      if (data) {
        const storeUser = {
          auth_token: id_token,
          userData: data,
        };
        await BnbSecureStore.remember(
          constants.CACHE_USER_KEY,
          storeUser
        );
      } else {
        firebase.auth.signOut();
      }
  }

  const signInWithFacebook = async () => {
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
        setIsAwaiting(true);
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        await signInWithOauthCredential(credential);
        setIsAwaiting(false);
      }
    } catch ({ message }) {
      console.log(`Facebook Login Error: ${message}`);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { type, accessToken, idToken } = await Google.logInAsync({
        androidClientId: process.env.ANDROID_CLIENT_ID,
        scopes: ['profile', 'email']
      });
      
      if (type  === 'success') {
        setIsAwaiting(true);
        const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
        await signInWithOauthCredential(credential);
        setIsAwaiting(false);
      }
    } catch ({ message }) {
      setIsAwaiting(false);
      console.log('login: Error:' + message);
    }
  }
  if (_is_awaiting) {
    return <BnbLoading />;
  } else {
    return (
      <BnbMainView>
        <BnbBodyView style={styles.centerContainer}>
          <Text style={styles.headerText}>Elija el metodo de autenticacion</Text>
          <View>
            <BnbButton
                  title="Email y contraseña"
                  style={styles.buttonText}
                  buttonStyle={styles.buttonStyle}
                  onPress={handleEmailPassSignin}
            />
            
            <BnbButton
                  title="Continuar con Google"
                  style={styles.buttonText}
                  buttonStyle={styles.buttonStyle}
                  onPress={signInWithGoogle}
                  iconName="logo-google"
                  iconColor="white"
            />

            <BnbButton
                  title="Continuar con Facebook"
                  style={styles.buttonText}
                  buttonStyle={styles.buttonStyle}
                  onPress={signInWithFacebook}
                  iconName="logo-facebook"
                  iconColor="white"
            />

            <View style={styles.inlineTextButton}>
              <Text style={styles.normalText}>¿No tienes una cuenta?, </Text>
              <TouchableOpacity onPress={_handleSignup}>
                <Text style={styles.clickableText}>Registrate</Text>
              </TouchableOpacity>
            </View>
          </View>
        </BnbBodyView>
      </BnbMainView>)
  }
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
});

export default LoginSelectScreen;
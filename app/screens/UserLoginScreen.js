import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import BnbBodyView from "../components/BnbBodyView";
import BnbBubbleView from "../components/BnbBubbleView";
import BnbButton from "../components/BnbButton";
import BnbIconTextInput from "../components/BnbIconTextInput";
import BnbMainView from "../components/BnbMainView";
import fonts from "../config/fonts";
import Separator from "../components/Separator";
import firebase from "../database/firebase";
import constants from "../constant/constants";
import BnbLoading from "../components/BnbLoading";
import colors from "../config/colors";
import BnbSecureStore from "../classes/BnbSecureStore";
import httpGetTokenRequest from "../helpers/httpGetTokenRequest";
import urls from "../constant/urls";

function UserLoginScreen({ navigation }) {
  const [_user, setUser] = useState({
    email: "",
    password: "",
  });
  const [_login_error, setLoginError] = useState("");
  const [_is_awaiting, setIsAwaiting] = useState(false);

  const _handleTextChange = (name, value) => {
    setUser({ ..._user, [name]: value });
  };

  const _handleForgotPassword = () => {
    navigation.navigate("PasswordRecover");
  };

  const _handleSignup = () => {
    navigation.navigate("SignUp");
  };

  const _handleLoginUserButtonPress = () => {
    if (_user.email === "" || _user.password === "") {
      setLoginError(constants.ERR_EMPTY_FIELD);
    } else {
      setLoginError("");
      setIsAwaiting(true);
      firebase.auth
        .signInWithEmailAndPassword(_user.email, _user.password)
        .then(async (userCredential) => {
          return userCredential.user.getIdToken().then(async (id_token) => {
            const data = await httpGetTokenRequest("GET", urls.URL_ME, {
              "x-access-token": id_token,
            });
            if (data) {
              await BnbSecureStore.rememberMe(id_token, data);
              navigation.navigate("HomeStack", { isLoggedIn: true });
            } else {
              console.log("Se deslogeo en user login screen, no habia data");
              firebase.auth().signOut();
              setIsAwaiting(false);
            }
          });
        })
        .catch((error) => {
          setIsAwaiting(false);
          if (error.code === "auth/wrong-password") {
            setLoginError(constants.ERR_PASS_INVALID);
          } else if (error.code === "auth/invalid-email") {
            setLoginError(constants.ERR_EMAIL_INVALID);
          } else {
            setLoginError(error.message);
          }
        });
    }
  };

  if (_is_awaiting) {
    return <BnbLoading />;
  } else {
    return (
      <BnbMainView>
        <BnbBodyView style={styles.centerContainer}>
          <Image
            source={require("../assets/Bookbnb_logo.png")}
            style={styles.image}
          />
          <View style={styles.centerSubContainer}>
            <View>
              <BnbIconTextInput
                iconName="mail"
                placeholder="E-mail"
                onChangeText={(text) => _handleTextChange("email", text)}
                value={_user.email}
                style={
                  _login_error === constants.ERR_EMAIL_INVALID
                    ? { borderColor: colors.error }
                    : {}
                }
                inputStyle={styles.normalText}
              />

              <BnbIconTextInput
                iconName="lock"
                placeholder="Contraseña"
                onChangeText={(text) => _handleTextChange("password", text)}
                value={_user.password}
                secureTextEntry={true}
                style={
                  _login_error === constants.ERR_PASS_INVALID
                    ? { borderColor: colors.error }
                    : {}
                }
                inputStyle={styles.normalText}
              />

              <View>
                <Text style={styles.errorText}>{_login_error}</Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={_handleForgotPassword}
              style={styles.forgotPassText}
            >
              <Text style={styles.clickableText}>
                {constants.FORGOT_PASSWORD_MESSAGE}
              </Text>
            </TouchableOpacity>

            <BnbButton
              title="Ingresar"
              style={styles.loginText}
              buttonStyle={styles.loginButton}
              onPress={_handleLoginUserButtonPress}
            />
          </View>
        </BnbBodyView>
      </BnbMainView>
    );
  }
}

const styles = StyleSheet.create({
  searchInputText: {
    fontSize: fonts.big,
  },
  bubbleContainer: {
    alignItems: "flex-start",
  },
  loginText: {
    //width: "100%",
    color: colors.white,
    fontFamily: "Raleway_400Regular",
  },
  loginButton: {
    borderColor: colors.redAirBNB,
    backgroundColor: colors.redAirBNB,
  },
  centerSubContainer: {
    //flex: 1,
    justifyContent: "center",
    margin: 5,
  },
  errorText: {
    color: colors.error,
    textAlign: "left",
    fontFamily: "Raleway_400Regular",
  },
  clickableText: {
    textDecorationLine: "underline",
    textAlign: "center",
    fontFamily: "Raleway_400Regular",
  },
  centerContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  image: {
    //flex: 1,
    height: "25%",
    resizeMode: "contain",
    alignSelf: "center",
  },
  inlineTextButton: {
    //flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    margin: 5,
    fontFamily: "Raleway_400Regular",
  },
  forgotPassText: {
    margin: 15,
  },
  normalText: {
    fontFamily: "Raleway_400Regular",
  },
});

export default UserLoginScreen;

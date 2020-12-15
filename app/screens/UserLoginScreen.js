import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import BnbBodyView from "../components/BnbBodyView";
import BnbBubbleView from "../components/BnbBubbleView";
import BnbButton from "../components/BnbButton";
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

  const _handleLoginUserButtonPress = () => {
    if (_user.email == "" || _user.password == "") {
      setLoginError(constants.ERR_EMPTY_FIELD);
    } else {
      setLoginError("");
      setIsAwaiting(true);
      firebase.auth
        .signInWithEmailAndPassword(_user.email, _user.password)
        .then(async (userCredential) => {
          return userCredential.user.getIdToken().then(async (id_token) => {
            const data = await httpGetTokenRequest(
              "GET",
              urls.URL_USERS + "/me",
              {
                "x-access-token": id_token,
              }
            );
            if (data) {
              const storeUser = {
                email: userCredential.user.email,
                auth_token: id_token,
                user_id: data.id,
              };
              BnbSecureStore.clear(constants.CACHE_USER_KEY).then(
                BnbSecureStore.remember(
                  constants.CACHE_USER_KEY,
                  storeUser
                ).then(() => {
                  navigation.navigate("Home");
                })
              );
            }
            setIsAwaiting(false);
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
    return <BnbLoading></BnbLoading>;
  } else {
    return (
      <BnbMainView>
        <Separator style={{ borderBottomWidth: 0 }}></Separator>
        <BnbBodyView>
          <View style={styles.centerContainer}>
            <BnbBubbleView style={styles.bubbleContainer}>
              <TextInput
                placeholder="E-mail"
                style={styles.searchInputText}
                onChangeText={(text) => _handleTextChange("email", text)}
                value={_user.email}
              />
            </BnbBubbleView>
            <Separator style={{ borderBottomWidth: 0 }} />
            <BnbBubbleView style={styles.bubbleContainer}>
              <TextInput
                placeholder="Contraseña"
                style={styles.searchInputText}
                onChangeText={(text) => _handleTextChange("password", text)}
                value={_user.password}
                secureTextEntry={true}
              />
            </BnbBubbleView>
            <Separator style={{ borderBottomWidth: 0 }} />
            <BnbButton
              title="Ingresar"
              style={styles.loginButton}
              onPress={_handleLoginUserButtonPress}
            />
            {_login_error != "" && (
              <View>
                <Separator style={{ borderBottomWidth: 0 }}></Separator>
                <Text style={styles.errorText}> {_login_error}</Text>
              </View>
            )}
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
  loginButton: {
    width: "100%",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
  },
  errorText: {
    color: colors.error,
  },
});

export default UserLoginScreen;

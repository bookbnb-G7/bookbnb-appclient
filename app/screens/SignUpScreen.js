import React, { useEffect, useState } from "react";
import { Profiler } from "react";
import { Text, View, StyleSheet } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { color } from "react-native-reanimated";
import BnbSecureStore from "../classes/BnbSecureStore";
import BnbAlert from "../components/BnbAlert";
import BnbBodyView from "../components/BnbBodyView";
import BnbBubbleView from "../components/BnbBubbleView";
import BnbButton from "../components/BnbButton";
import BnbFooterView from "../components/BnbFooterView";
import BnbLoading from "../components/BnbLoading";
import BnbMainView from "../components/BnbMainView";
import BnbTextInputObject from "../components/BnbTextInputObject";
import Separator from "../components/Separator";
import colors from "../config/colors";
import bnbStyleSheet from "../constant/bnbStyleSheet";
import constants from "../constant/constants";
import firebase from "../database/firebase";
import urls from "../constant/urls";
import httpPostTokenRequest from "../helpers/httpPostTokenRequest";

function SignUpScreen({ route, navigation }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
    firstname: "App",
    lastname: "App",
    phonenumber: "11-1111111",
    country: "USA",
    birthdate: "1999-11-11",
    photo: "",
  });
  /**TODO: crear un formulario para completar estos campos, photo??? */

  const [_sign_in_error, setSignInError] = useState("");
  const [_is_awaiting, setIsAwaiting] = useState(false);

  const _handleTextChange = (key, value) => {
    setUser((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const _handleCreateUserButtonPress = () => {
    if (
      user.email == "" ||
      user.password == "" ||
      user.firstname == "" ||
      user.lastname == ""
    ) {
      setSignInError(constants.ERR_EMPTY_FIELD);
    } else {
      setSignInError("");
      setIsAwaiting(true);
      firebase.auth
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(async (userCredential) => {
          return userCredential.user.getIdToken().then((id_token) => {
            const appServerUser = {
              firstname: user.firstname,
              lastname: user.lastname,
              email: user.email,
              phonenumber: user.phonenumber,
              country: user.country,
              birthdate: user.birthdate,
              photo:
                "https://melmagazine.com/wp-content/uploads/2020/07/zuck_sunscreen.jpg",
            };
            httpPostTokenRequest("POST", urls.URL_USERS, appServerUser, {
              "Content-Type": "application/json",
              "x-access-token": id_token,
            }).then((data) => {
              if (data) {
                const storeUser = {
                  auth_token: id_token,
                  userData: data,
                };
                BnbSecureStore.remember(
                  constants.CACHE_USER_KEY,
                  storeUser
                ).then(() => {
                  navigation.navigate("Home");
                });
              }
              setIsAwaiting(false);
            });
          });
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            setSignInError(constants.ERR_EMAIL_IN_USE);
          } else if (error.code === "auth/invalid-email") {
            setSignInError(constants.ERR_EMAIL_INVALID);
          } else {
            setSignInError(error.message);
          }
          setIsAwaiting(false);
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
          <ScrollView>
            <BnbTextInputObject
              name="E-Mail"
              id={"email"}
              object={user}
              editable={true}
              onChange={_handleTextChange}
              customStyle={bnbStyleSheet.bubbleContainer}
            />
            <Separator style={{ borderBottomWidth: 0 }} />
            <BnbTextInputObject
              name="Contraseña"
              id={"password"}
              object={user}
              editable={true}
              onChange={_handleTextChange}
              customStyle={bnbStyleSheet.bubbleContainer}
            />
            <BnbTextInputObject
              name="Nombre"
              id={"firstname"}
              object={user}
              editable={true}
              onChange={_handleTextChange}
              customStyle={bnbStyleSheet.bubbleContainer}
            />
            <BnbTextInputObject
              name="Apellido"
              id={"lastname"}
              object={user}
              editable={true}
              onChange={_handleTextChange}
              customStyle={bnbStyleSheet.bubbleContainer}
            />
            <BnbTextInputObject
              name="Numero de telefono"
              id={"phonenumber"}
              object={user}
              editable={true}
              onChange={_handleTextChange}
              customStyle={bnbStyleSheet.bubbleContainer}
            />
            <BnbTextInputObject
              name="Pais"
              id={"country"}
              object={user}
              editable={true}
              onChange={_handleTextChange}
              customStyle={bnbStyleSheet.bubbleContainer}
            />
            <BnbTextInputObject
              name="Fecha de nacimiento"
              id={"birthdate"}
              object={user}
              editable={true}
              onChange={_handleTextChange}
              customStyle={bnbStyleSheet.bubbleContainer}
            />
            <Separator style={{ borderBottomWidth: 0 }} />
            <BnbButton
              title="Crear cuenta"
              onPress={_handleCreateUserButtonPress}
              style={styles.signIn}
            />
          </ScrollView>

          <Separator style={{ borderBottomWidth: 0 }}></Separator>
          {_sign_in_error != "" && (
            <View>
              <Text style={styles.errorText}>{_sign_in_error}</Text>
            </View>
          )}
        </BnbBodyView>
      </BnbMainView>
    );
  }
}

const styles = StyleSheet.create({
  errorText: {
    color: colors.error,
  },
  centerContainer: {
    justifyContent: "center",
    flex: 1,
  },
  signIn: {
    width: "100%",
  },
});

export default SignUpScreen;

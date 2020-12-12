import React, { useState } from "react";
import { Profiler } from "react";
import { Text, View, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { color } from "react-native-reanimated";
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
import urls from "../constant/urls";
import firebase from "../database/firebase";

function SignUpScreen({ route, navigation }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [appServerUser, setAppServerUser] = useState({
    firstname: "null",
    lastname: "null",
    email: "null@email.com",
    phonenumber: "1",
    country: "null",
    birthdate: "0000-00-00",
    photo: "https://www.cmtv.com.ar/imagenes_artistas/70.jpg?Chayanne",
  });
  const [_sign_in_error, setSignInError] = useState("");
  const [_is_awaiting, setIsAwaiting] = useState(false);

  const _handleTextChange = (key, value) => {
    setUser((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const _handleApiResponse = () => {
    navigation.navigate("Home");
  };

  const _handleApiError = () => {
    setIsAwaiting(false);
  };

  const _handleCreateUserButtonPress = () => {
    if (user.email == "" || user.password == "") {
      setSignInError(constants.ERR_EMPTY_FIELD);
    } else {
      setIsAwaiting(true);
      firebase.auth
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
          BnbAlert(
            "Crear cuenta",
            "Usuario creado con exito",
            "Entendido",
            false
          );
          /**Solicitar datos personales */
          setAppServerUser(...appServerUser, { [email]: user.email });
          /**httpPostTokenRequest(
            "POST",
            urls.URL_USERS,
            appServerUser,
            { "Content-Type": "application/json", "x-access-token": userCredential.token},
            _handleApiResponse,
            _handleApiError
          );*/
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
          <Separator style={{ borderBottomWidth: 0 }} />
          <BnbButton
            title="Crear cuenta"
            onPress={_handleCreateUserButtonPress}
            style={styles.signIn}
          />

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

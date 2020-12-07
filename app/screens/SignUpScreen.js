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
import BnbMainView from "../components/BnbMainView";
import BnbTextInputObject from "../components/BnbTextInputObject";
import Separator from "../components/Separator";
import colors from "../config/colors";
import constants from "../constant/constants";
import firebase from "../database/firebase";

function SignUpScreen({ route, navigation }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [signInError, setSignInError] = useState("");

  const _handleTextChange = (name, value) => {
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const _handleCreateUserButtonPress = () => {
    if (user.email == "" || user.password == "") {
      /**TODO: meterlo en una funcion helper fireBaseSignIn */
      BnbAlert(
        "Crear cuenta",
        "Uno o mas campos no han sido completados",
        "Entendido",
        false
      );
    } else {
      firebase.auth
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(() => {
          BnbAlert(
            "Crear cuenta",
            "Usuario creado con exito",
            "Entendido",
            false
          );
          navigation.navigate("Home");
        })
        .catch((error) => {
          console.log("Hubo un error");
          if (error.code === "auth/email-already-in-use") {
            setSignInError(constants.ERR_EMAIL_IN_USE);
          } else if (error.code === "auth/invalid-email") {
            setSignInError(constants.ERR_EMAIL_INVALID);
          } else {
            setSignInError(error.message);
          }
        });
    }
  };

  return (
    <BnbMainView>
      <Separator style={{ borderBottomWidth: 0 }}></Separator>
      <BnbBodyView>
        <BnbTextInputObject
          left="E-Mail"
          id={"email"}
          object={user}
          editable={true}
          onChange={_handleTextChange}
        />
        <Separator style={{ borderBottomWidth: 0 }} />
        <BnbTextInputObject
          left="Contraseña"
          id={"password"}
          object={user}
          editable={true}
          onChange={_handleTextChange}
        />
        <Separator />
        <BnbButton
          title="Crear cuenta"
          onPress={_handleCreateUserButtonPress}
        />
        <Separator style={{ borderBottomWidth: 0 }}></Separator>
        {signInError != "" && (
          <View>
            <Text style={styles.errorText}>{signInError}</Text>
          </View>
        )}
      </BnbBodyView>
    </BnbMainView>
  );
}

const styles = StyleSheet.create({
  errorText: {
    color: colors.error,
  },
});

export default SignUpScreen;

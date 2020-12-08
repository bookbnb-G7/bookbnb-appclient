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
import constants from "../constant/constants";
import firebase from "../database/firebase";

function SignUpScreen({ route, navigation }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [_sign_in_error, setSignInError] = useState("");
  const [_is_awaiting, setIsAwaiting] = useState(false);

  const _handleTextChange = (name, value) => {
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
          navigation.navigate("Home");
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
  signIn: {
    width: "100%",
  },
});

export default SignUpScreen;

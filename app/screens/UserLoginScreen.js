import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import BnbBodyView from "../components/BnbBodyView";
import BnbBubbleView from "../components/BnbBubbleView";
import BnbButton from "../components/BnbButton";
import BnbMainView from "../components/BnbMainView";
import fonts from "../config/fonts";
import Separator from "../components/Separator";
import BnbFooterView from "../components/BnbFooterView";
import firebase from "../database/firebase";
import constants from "../constant/constants";
import BnbLoading from "../components/BnbLoading";

function UserLoginScreen({ navigation }) {
  const [_user, setUser] = useState({
    email: "",
    password: "",
  });
  const [_login_error, setLoginError] = useState("");
  const [_is_awaiting, setIsAwaiting] = useState(false);

  const _handleTextChange = (name, value) => {
    setUser({ ...prevState, [name]: value });
  };

  const _handleLoginUserButtonPress = () => {
    if (_user.email == "" || _user.password == "") {
      BnbAlert(
        "Ingresar",
        "Uno o mas campos no han sido completados",
        "Entendido",
        false
      );
    } else {
      setIsAwaiting(true);
      firebase.auth
        .signInWithEmailAndPassword(user.email, user.password)
        .then(() => {
          BnbAlert("Ingresar", "Login exitoso", "Entendido", false);
          setIsAwaiting(false);
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
    //navigation.navigate("SearchUsersResult", { search: _user });
    //TODO crear una API que maneje los request de la database ApiDatabase
  };

  if (_is_awaiting) {
    <BnbLoading></BnbLoading>;
  } else {
    return (
      <BnbMainView>
        <Separator style={{ borderBottomWidth: 0 }}></Separator>
        <BnbBodyView></BnbBodyView>
        <BnbFooterView>
          <BnbBubbleView style={{ alignItems: "flex-start" }}>
            <TextInput
              placeholder="E-mail"
              style={styles.searchInputText}
              onChangeText={(text) => _handleTextChange("email", text)}
              value={_user.email}
            />
          </BnbBubbleView>
          <Separator style={{ borderBottomWidth: 0 }} />
          <BnbBubbleView style={{ alignItems: "flex-start" }}>
            <TextInput
              placeholder="Contraseña"
              style={styles.searchInputText}
              onChangeText={(text) => _handleTextChange("password", text)}
              value={_user.password}
              secureTextEntry={true}
            />
          </BnbBubbleView>
          <Separator />
          <BnbButton title="Ingresar" onPress={_handleLoginUserButtonPress} />
        </BnbFooterView>
      </BnbMainView>
    );
  }
}

const styles = StyleSheet.create({
  searchInputText: {
    fontSize: fonts.big,
  },
});

export default UserLoginScreen;

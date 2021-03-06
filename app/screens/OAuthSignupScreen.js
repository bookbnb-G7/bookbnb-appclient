import React, { useRef, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import BnbSecureStore from "../classes/BnbSecureStore";
import BnbBodyView from "../components/BnbBodyView";
import BnbButton from "../components/BnbButton";
import BnbLoading from "../components/BnbLoading";
import BnbMainView from "../components/BnbMainView";
import BnbFloatingTextInput from "../components/BnbFloatingTextInput";
import Separator from "../components/Separator";
import colors from "../config/colors";
import constants from "../constant/constants";
import firebase from "firebase";
import urls from "../constant/urls";
import httpPostTokenRequest from "../helpers/httpPostTokenRequest";

function OAuthSignupScreen({ route, navigation }) {
  const { firstName, lastName, email, credential } = route.params;
  const [user, setUser] = useState({
    email: email,
    firstname: firstName || "",
    lastname: lastName || "",
    phonenumber: "",
    country: "",
    birthdate: "",
    photo: "",
  });
  const [_sign_in_error, setSignInError] = useState("");
  const [_is_awaiting, setIsAwaiting] = useState(false);

  const _handleTextChange = (key, value) => {
    setUser((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const _handleCreateUserButtonPress = async () => {
    if (user.email === "" || user.firstname === "" || user.lastname === "") {
      setSignInError(constants.ERR_EMPTY_FIELD);
    } else {
      setSignInError("");
      setIsAwaiting(true);
      const appServerUser = {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phonenumber: user.phonenumber,
        country: user.country,
        birthdate: user.birthdate,
        photo: "null",
      };
      try {
        const userCredential = await firebase
          .auth()
          .signInWithCredential(credential);
        const accessToken = await userCredential.user.getIdToken();

        const data = await httpPostTokenRequest(
          "POST",
          urls.URL_USERS,
          appServerUser,
          {
            "Content-Type": "application/json",
            "x-access-token": accessToken,
          }
        );
        if (data) {
          const storeUser = {
            auth_token: accessToken,
            userData: data,
          };
          await BnbSecureStore.remember(constants.CACHE_USER_KEY, storeUser);
          navigation.navigate("HomeStack", { isLoggedIn: true });
        } else {
          /**Ver UserLoginScreen.js */
          console.log("Se deslogeo en el oauthscreen, no habia data");
          firebase.auth().signOut();
        }
      } catch (error) {
        setSignInError(error.message);
        setIsAwaiting(false);
      }
    }
  };
  const ref_name = useRef();
  const ref_surname = useRef();
  const ref_phone = useRef();
  const ref_country = useRef();
  const ref_birthdate = useRef();

  if (_is_awaiting) {
    return <BnbLoading />;
  } else {
    return (
      <BnbMainView>
        <BnbBodyView style={styles.bodyView}>
          <Text style={styles.headerText}>Solo necesitamos unos datos mas</Text>
          <ScrollView
            keyboardShouldPersistTaps="always"
            style={{ paddingRight: 10 }}
          >
            <BnbFloatingTextInput
              name="Nombre"
              id={"firstname"}
              object={user}
              onChange={_handleTextChange}
              inputRef={ref_name}
              onSubmit={() => ref_surname.current?.focus()}
              returnKeyType="next"
            />
            <BnbFloatingTextInput
              name="Apellido"
              id={"lastname"}
              object={user}
              onChange={_handleTextChange}
              inputRef={ref_surname}
              onSubmit={() => ref_phone.current?.focus()}
              returnKeyType="next"
            />
            <BnbFloatingTextInput
              name="Numero de telefono"
              id={"phonenumber"}
              object={user}
              onChange={_handleTextChange}
              inputRef={ref_phone}
              onSubmit={() => ref_country.current?.focus()}
              returnKeyType="next"
              keyboardType="numeric"
            />
            <BnbFloatingTextInput
              name="Pais"
              id={"country"}
              object={user}
              onChange={_handleTextChange}
              inputRef={ref_country}
              onSubmit={() => ref_birthdate.current?.focus()}
              returnKeyType="next"
            />
            <BnbFloatingTextInput
              name="Fecha de nacimiento"
              id={"birthdate"}
              object={user}
              onChange={_handleTextChange}
              mask="9999-99-99"
              hint="YYYY-MM-DD"
              inputRef={ref_birthdate}
              onSubmit={_handleCreateUserButtonPress}
              keyboardType="numeric"
            />
            <Separator style={{ borderBottomWidth: 0 }} />
            <BnbButton
              title="Crear cuenta"
              onPress={_handleCreateUserButtonPress}
              style={styles.signIn}
              buttonStyle={styles.loginButton}
            />
          </ScrollView>
        </BnbBodyView>
        {_sign_in_error !== "" && (
          <View style={styles.errorMessageView}>
            <Text style={styles.errorText}>{_sign_in_error}</Text>
          </View>
        )}
      </BnbMainView>
    );
  }
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 28,
    fontFamily: "Raleway_400Regular",
    color: "#333",
    textAlign: "center",
    marginVertical: 30,
  },
  errorText: {
    color: colors.error,
  },
  centerContainer: {
    justifyContent: "center",
    flex: 1,
  },
  signIn: {
    width: "100%",
    fontFamily: "Raleway_400Regular",
    color: colors.white,
  },
  image: {
    marginTop: 25,
    height: "15%",
    width: "15%",
  },
  loginButton: {
    borderColor: colors.redAirBNB,
    backgroundColor: colors.redAirBNB,
  },
  bodyView: {
    marginVertical: 30,
  },
  normalText: {
    fontFamily: "Raleway_400Regular",
  },
  errorMessageView: {
    borderTopWidth: 1,
    borderColor: colors.black,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default OAuthSignupScreen;

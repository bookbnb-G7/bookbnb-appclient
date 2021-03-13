import React, { useRef, useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import CountryPicker from "react-native-country-picker-modal";
import BnbSecureStore from "../classes/BnbSecureStore";
import BnbBodyView from "../components/BnbBodyView";
import BnbButton from "../components/BnbButton";
import BnbLoading from "../components/BnbLoading";
import BnbMainView from "../components/BnbMainView";
import BnbFloatingTextInput from "../components/BnbFloatingTextInput";
import Separator from "../components/Separator";
import colors from "../config/colors";
import constants from "../constant/constants";
import firebase from "../database/firebase";
import urls from "../constant/urls";
import httpPostTokenRequest from "../helpers/httpPostTokenRequest";

function SignUpScreen({ route, navigation }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    phonenumber: "",
    country: "",
    birthdate: "",
    photo: "",
  });

  const [_sign_in_error, setSignInError] = useState("");
  const [_is_awaiting, setIsAwaiting] = useState(false);

  const [countryCode, setCountryCode] = useState("AR");

  const onSelect = (country) => {
    setCountryCode(country.cca2);
  };

  const _handleTextChange = (key, value) => {
    setUser((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const inputIsIncorrect = (user) => {
    return (
      user.email === "" ||
      user.password === "" ||
      user.firstname === "" ||
      user.lastname === ""
    );
  };

  const _handleCreateUserButtonPress = () => {
    if (
      user.email === "" ||
      user.password === "" ||
      user.firstname === "" ||
      user.lastname === ""
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
              country: countryCode,
              birthdate: user.birthdate,
              photo: "null",
            };
            httpPostTokenRequest("POST", urls.URL_USERS, appServerUser, {
              "Content-Type": "application/json",
              "x-access-token": id_token,
            }).then(
              (data) => {
                if (data) {
                  BnbSecureStore.rememberMe(id_token, data).then(() => {
                    navigation.navigate("HomeStack", { isLoggedIn: true });
                  });
                }
              },
              (error) => {
                console.log("No se puedo crear el usuario, no habia data");
                setIsAwaiting(false);
                firebase.auth.signOut();
              }
            );
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
  const [password, setPassword] = useState("");
  const ref_mail = useRef();
  const ref_password = useRef();
  const ref_name = useRef();
  const ref_surname = useRef();
  const ref_phone = useRef();
  const ref_country = useRef();
  const ref_birthdate = useRef();

  if (_is_awaiting) {
    return <BnbLoading text="Registrando..." />;
  } else {
    return (
      <BnbMainView>
        <BnbBodyView style={styles.bodyView}>
          <Image
            source={require("../assets/Bookbnb_logo.png")}
            style={styles.image}
          />
          <ScrollView
            keyboardShouldPersistTaps="always"
            style={{ paddingRight: 10 }}
          >
            <BnbFloatingTextInput
              name="E-Mail"
              id={"email"}
              object={user}
              onChange={_handleTextChange}
              onSubmit={() => ref_password.current?.focus()}
              returnKeyType="next"
              autoFocus={true}
              keyboardType="email-address"
            />
            <BnbFloatingTextInput
              name="Contraseña"
              id={"password"}
              object={user}
              onChange={_handleTextChange}
              isPassword={true}
              inputRef={ref_password}
              onSubmit={() => ref_name.current?.focus()}
              returnKeyType="next"
            />
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
              keyboardType="numeric"
              viewStyle={{ marginBottom: 0 }}
            />
            <Text style={styles.countryInputLabel}>Pais</Text>
            <CountryPicker
              containerButtonStyle={styles.countryPickerButton}
              {...{
                countryCode,
                onSelect,
              }}
              withCountryNameButton={true}
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
    paddingVertical: 0,
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
  countryPickerButton: {
    borderWidth: 1,
    borderRadius: 40,
    minHeight: 50,
    justifyContent: "center",
    color: "black",
    paddingLeft: 20,
    marginBottom: 6,
  },
  countryInputLabel: {
    marginLeft: 28,
    paddingHorizontal: 7,
    alignSelf: "flex-start",
    color: "#49658c",
    fontFamily: "Raleway_400Regular",
    top: 8,
    backgroundColor: "white",
    zIndex: 2,
  },
});

export default SignUpScreen;

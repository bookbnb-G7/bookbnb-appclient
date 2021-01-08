import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import BnbBodyView from "../components/BnbBodyView";
import BnbIconTextInput from "../components/BnbIconTextInput";
import BnbMainView from "../components/BnbMainView";
import firebase from "firebase";
import colors from "../config/colors";
import BnbButton from "../components/BnbButton";


const SendPassResetEmailScreen = () => {
  const [email, setEmail] = useState("");
  const [errorStatus, setErrorStatus] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSendRecoverEmail = async () => {
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      setSuccessMessage("Se ha enviado el e-mail correctamente, revise su casilla");
      setErrorStatus("");
    } catch (error) {
      setErrorStatus("El mail ingresado no ha sido encontrado");
      setSuccessMessage("");
    }
  };

  return (
    <BnbMainView>
      <BnbBodyView style={styles.centerContainer}>
        <Text style={styles.headerText}>¿Olvidaste tu contraseña?</Text>
        <BnbIconTextInput
                iconName="mail"
                placeholder="Ingrese su email"
                onChangeText={setEmail}
                value={email}
                style={
                  errorStatus !== ""
                    ? { borderColor: colors.error }
                    : {}
                }
                inputStyle={styles.normalText}
        />

        <Text style={styles.errorText}>
          {" "}
          {errorStatus !== "" ? errorStatus : ""}
        </Text>

        <BnbButton
              title="Enviar"
              style={styles.sendText}
              buttonStyle={styles.sendButton}
              onPress={handleSendRecoverEmail}
        />
        <Text style={styles.successText}>
          {" "}
          {successMessage !== "" ? successMessage : ""}
        </Text>
      </BnbBodyView>
    </BnbMainView>)
}


const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 25,
    fontFamily: "Raleway_400Regular",
    marginLeft: 25,
    color: '#333',
    marginBottom: 30,
  },
  normalText: {
    fontFamily: "Raleway_400Regular",
  },
  errorText: {
    color: colors.error,
    textAlign: "left",
    fontFamily: "Raleway_400Regular",
    marginLeft: 5,
  },
  successText: {
    color: colors.greenSuccess,
    textAlign: "center",
    fontFamily: "Raleway_400Regular",
  },
  sendText: {
    width: "100%",
    color: colors.white,
    fontFamily: "Raleway_400Regular",
  },
  sendButton: {
    borderColor: colors.redAirBNB,
    backgroundColor: colors.redAirBNB,
    marginTop: 30,
  },
});

export default SendPassResetEmailScreen;
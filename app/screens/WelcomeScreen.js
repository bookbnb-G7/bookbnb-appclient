import React from "react";
import { StyleSheet, View } from "react-native";
import BnbButton from "../components/BnbButton";
import BnbMainView from "../components/BnbMainView";
import Separator from "../components/Separator";

function WelcomeScreen({ navigation }) {
  const _handleLogIn = () => {
    navigation.navigate("UserLogin");
  };

  const _handleSignIn = () => {
    navigation.navigate("SignUp");
  };

  return (
    <BnbMainView>
      <View style={styles.centerContainer}>
        <BnbButton title="Ingresar" onPress={_handleLogIn}></BnbButton>
        <Separator style={{ borderBottomWidth: 0 }}></Separator>
        <BnbButton title="Registrarse" onPress={_handleSignIn}></BnbButton>
      </View>
    </BnbMainView>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WelcomeScreen;

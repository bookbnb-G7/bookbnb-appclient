import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";

function LoginForm(props) {
  const handlePress = () => props.navigation.navigate("Home");

  return (
    <View style={styles.loginFormContainer}>
      <TextInput
        style={styles.credential}
        placeholder="username or email"
        placeholderTextColor="rgba(255,255,255,0.7)"
        returnKeyType="next"
        //onSubmitEditing={() => this.passwordInput.focus()}
      ></TextInput>
      <TextInput
        style={styles.credential}
        placeholder="password"
        placeholderTextColor="rgba(255,255,255,0.7)"
        returnKeyType="go"
        secureTextEntry
        //ref={(input) => this.passwordInput = input}
      ></TextInput>
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.buttonText} onPress={handlePress}>
          LOGIN
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  loginFormContainer: {
    padding: 20,
  },
  credential: {
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    color: "#FFF",
  },
  buttonContainer: {
    backgroundColor: "#2980b9",
    paddingVertical: 15,
  },
  buttonText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "700",
  },
});

export default LoginForm;

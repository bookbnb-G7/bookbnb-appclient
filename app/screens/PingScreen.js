import React from "react";
import {
  Button,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

function PingScreen(props) {
  /** Para navegar de un screen a otro tengo que instalar React navigation, al parecer*/
  const handleSendButtonPress = () => alert("Send Pressed");
  const handleGetButtonPress = () => alert("Get Pressed");
  return (
    <View style={styles.mainContainer}>
      <View style={styles.childContainer}>
        <TextInput
          style={styles.textInputContainer}
          placeholder="Id"
        ></TextInput>
        <TouchableOpacity style={styles.button}>
          <Button title="Get" onPress={handleGetButtonPress}></Button>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Button title="Send" onPress={handleSendButtonPress}></Button>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#3498db",
    justifyContent: "center",
  },
  childContainer: {
    //flexGrow: 0.3,
    justifyContent: "center",
    paddingHorizontal: 40,
    //backgroundColor: "red",
    //marginBottom: 20,
  },
  textInputContainer: {
    backgroundColor: "lightblue",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    marginBottom: 10,
  },
});

export default PingScreen;

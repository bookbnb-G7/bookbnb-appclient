import React from "react";
import { StyleSheet, View } from "react-native";
import Ionicons from "@expo/vector-icons/MaterialCommunityIcons";
import { TextInput } from "react-native-gesture-handler";
import styling from "../config/styling";
import fonts from "../config/fonts";

const BnbIconTextInput = (props) => (
  <View style={{ ...styles.container, ...props.style }}>
    <Ionicons style={styles.icon} name={props.iconName} size={17} />
    <TextInput
      style={{ ...styles.input, ...props.inputStyle }}
      placeholder={props.placeholder}
      onChangeText={props.onChangeText}
      value={props.value}
      secureTextEntry={Boolean(props.secureTextEntry)}
      keyboardType={props.keyboardType}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: styling.buttonBorderRadius,
    padding: 10,
  },
  icon: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    color: "#424242",
    //marginRight: 15,
    height: "90%",
    fontSize: fonts.big,
    fontFamily: "Raleway_400Regular",
  },
});

export default BnbIconTextInput;

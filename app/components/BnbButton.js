import { Raleway_400Regular, Raleway_500Medium, Raleway_700Bold } from "@expo-google-fonts/raleway";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "../config/colors";
import fonts from "../config/fonts";
import styling from "../config/styling";

const BnbButton = (props) => (
  <TouchableOpacity onPress={props.onPress} style={{...styles.buttonContainer, ...props.buttonStyle}}>
    <Text style={{ ...styles.buttonText, ...props.style }}>{props.title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  buttonText: {
    textAlign: "center",
    fontSize: fonts.big,
    fontFamily: "Raleway_500Medium",
    textAlignVertical: "center",
    color: colors.redAirBNBSoft,
  },
  buttonContainer: {
    alignItems: "center",
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
    paddingHorizontal: styling.buttonHPadding,
    borderRadius: styling.buttonBorderRadius,
    borderWidth: 1,
    borderColor: colors.redAirBNB,
    backgroundColor: colors.white,
  },
});

export default BnbButton;

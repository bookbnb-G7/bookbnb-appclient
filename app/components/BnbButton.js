import React from "react";
import { StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "../config/colors";
import fonts from "../config/fonts";
import styling from "../config/styling";

const BnbButton = (props) => (
  <TouchableOpacity onPress={props.onPress}>
    <Text style={{ ...styles.buttonText, ...props.style }}>{props.title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  buttonText: {
    paddingHorizontal: styling.buttonHPadding,
    borderRadius: styling.buttonBorderRadius,
    borderWidth: 1,
    borderColor: colors.redSoft2,
    color: colors.redSoft2,
    backgroundColor: colors.white,
    textAlign: "center",
    fontSize: fonts.big,
    width: 130,
  },
});

export default BnbButton;

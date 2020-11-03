import React from "react";
import { StyleSheet, Text } from "react-native";
import colors from "../config/colors";
import fonts from "../config/fonts";

function BnbTitleText(props) {
  return (
    <Text style={{ ...styles.redTitle, ...props.style }}>{props.children}</Text>
  );
}

const styles = StyleSheet.create({
  redTitle: {
    fontSize: fonts.big,
    color: colors.redSoft,
  },
});

export default BnbTitleText;

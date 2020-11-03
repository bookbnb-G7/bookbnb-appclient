import React from "react";
import { StyleSheet, View } from "react-native";
import colors from "../config/colors";

const Separator = (props) => (
  <View style={{ ...styles.separator, ...props.style }}></View>
);

const styles = StyleSheet.create({
  separator: {
    marginVertical: 4,
    borderBottomColor: colors.separator,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default Separator;

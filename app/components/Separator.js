import React from "react";
import { StyleSheet, View } from "react-native";
import colors from "../config/colors";
import styling from "../config/styling";

const Separator = (props) => (
  <View
    style={{
      ...styles.separator,
      ...props.style,
    }}
  ></View>
);

const styles = StyleSheet.create({
  separator: {
    marginVertical: styling.separator,
    borderBottomColor: colors.separator,
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: "80%",
    alignSelf: "center",
  },
});

export default Separator;

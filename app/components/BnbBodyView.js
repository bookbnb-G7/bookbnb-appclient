import React from "react";
import { StyleSheet, View } from "react-native";
import colors from "../config/colors";

const BnbBodyView = (props) => (
  <View style={{ ...styles.bodyContainer, ...props.style }}>
    {props.children}
  </View>
);

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 8,
  },
});

export default BnbBodyView;

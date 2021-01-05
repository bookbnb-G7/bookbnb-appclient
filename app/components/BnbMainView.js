import React from "react";
import { StyleSheet, View } from "react-native";
import colors from "../config/colors";

const BnbMainView = (props) => (
  <View style={{ ...styles.mainContainer, ...props.style }}>
    {props.children}
  </View>
);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    //height: "100%",
    //backgroundColor: colors.white,
  },
});

export default BnbMainView;

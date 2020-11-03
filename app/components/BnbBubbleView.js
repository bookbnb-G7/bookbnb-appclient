import React from "react";
import { StyleSheet, View } from "react-native";
import colors from "../config/colors";
import styling from "../config/styling";

const BnbBubbleView = (props) => (
  <View style={{ ...styles.bubbleContainer, ...props.style }}>
    {props.children}
  </View>
);

const styles = StyleSheet.create({
  bubbleContainer: {
    flex: 1,
    borderRadius: styling.bigCornerRadius,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default BnbBubbleView;

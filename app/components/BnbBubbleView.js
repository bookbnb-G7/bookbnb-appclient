import React from "react";
import { StyleSheet, View } from "react-native";
import colors from "../config/colors";
import styling from "../config/styling";

const BnbBubbleView = (props) => (
  <View elevation={5} style={{ ...styles.bubbleContainer, ...props.style }}>
    {props.children}
  </View>
);

const styles = StyleSheet.create({
  bubbleContainer: {
    borderRadius: styling.bigCornerRadius,
    backgroundColor: colors.white,
    height: 50,
    width: "100%",
    paddingHorizontal: 10,
    borderColor: "gray",
    shadowColor: "blue",
    shadowOpacity: 0.9,
    shadowRadius: 10,
    shadowOffset: {
      width: 10,
      height: 10,
    },
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
});

export default BnbBubbleView;

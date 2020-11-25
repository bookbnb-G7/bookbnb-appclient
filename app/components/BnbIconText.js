import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import colors from "../config/colors";
import fonts from "../config/fonts";
import styling from "../config/styling";

const BnbIconText = (props) => (
  <View style={styles.mainContainer}>
    <Image source={props.logo} style={styles.icon}></Image>
    <Text style={{ ...styles.text, ...props.style }}>{props.children}</Text>
  </View>
);

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: styling.separator,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: styling.smallCornerRadius,
  },
  text: {
    paddingHorizontal: 10,
    fontSize: fonts.semi,
    color: "gray",
  },
});

export default BnbIconText;

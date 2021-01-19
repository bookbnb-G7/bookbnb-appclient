import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import fonts from "../config/fonts";
import styling from "../config/styling";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "../config/colors";

const BnbIconText = (props) => (
  <View style={{ ...styles.mainContainer, ...props.style }}>
    {props?.logo && (
      <Image source={{ uri: props.logo }} style={styles.icon}></Image>
    )}
    {props?.iconName && (
      <Ionicons name={props.iconName} style={styles.ionIcon} size={50} />
    )}
    <Text style={{ ...styles.text, ...props.style }}>{props.children}</Text>
  </View>
);

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: styling.separator,
    flexDirection: "row",
    height: 50,
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: styling.smallCornerRadius,
    backgroundColor: colors.graySoft,
  },
  ionIcon: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  text: {
    paddingHorizontal: 10,
    fontSize: fonts.semi,
    textAlignVertical: "center",
    color: "gray",
  },
});

export default BnbIconText;

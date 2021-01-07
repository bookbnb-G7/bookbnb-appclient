import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "../config/colors";


const BnbFormBubbleInfo = (props) => (
  <View style={{...styles.inlineIconText, ...props.style}}>
    <Ionicons name={props.iconName} color={props.iconColor} size={props.iconSize}/>
    <Text style={{...styles.locationText, ...props.textStyle}}> {props.text}</Text>
  </View>
);

const styles = StyleSheet.create({
  inlineIconText: {
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    paddingHorizontal: 5,
    marginVertical: 5,
  },
  locationText: {
    alignSelf: "center",
    fontFamily: "Raleway_400Regular",
    fontWeight: "bold",
    fontSize: 15,
    color: colors.white,
  },
});

export default BnbFormBubbleInfo;

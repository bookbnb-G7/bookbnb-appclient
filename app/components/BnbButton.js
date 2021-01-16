import { Raleway_400Regular, Raleway_500Medium, Raleway_700Bold } from "@expo-google-fonts/raleway";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "../config/colors";
import fonts from "../config/fonts";
import styling from "../config/styling";

const BnbButton = (props) => (
  <TouchableOpacity onPress={props.onPress} style={{...styles.buttonContainer, ...props.buttonStyle}}>
    <View style={styles.textIconContainer}>
      {props.iconName && <Ionicons style={styles.icon} color={props.iconColor} name={props.iconName} size={17} />} 
      <Text style={{ ...styles.buttonText, ...props.style }}>{props.title}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  buttonText: {
    fontSize: fonts.big,
    fontFamily: "Raleway_500Medium",
    textAlignVertical: "center",
    color: colors.redAirBNBSoft,
    textAlign: "center",
  },
  buttonContainer: {
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
    paddingHorizontal: styling.buttonHPadding,
    borderRadius: styling.buttonBorderRadius,
    borderWidth: 1,
    borderColor: colors.redAirBNB,
    backgroundColor: colors.white,
  },
  icon: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  textIconContainer: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
  }
});

export default BnbButton;

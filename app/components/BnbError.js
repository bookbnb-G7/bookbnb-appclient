import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../config/colors";

const BnbError = (props) => {
  return (
    <View style={{ ...styles.errorContainer, ...props.errorContainer }}>
      <Text style={{ ...styles.errorText, ...props.errorText }}>
        {props.children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: colors.error,
    textAlign: "left",
    fontFamily: "Raleway_400Regular",
  },
});

export default BnbError;

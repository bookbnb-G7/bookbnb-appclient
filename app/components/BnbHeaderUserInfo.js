import React from "react";
import { StyleSheet, Text, View } from "react-native";
import styling from "../config/styling";

function BnbHeaderUserInfo(props) {
  return (
    <View style={styles.mainContainer}>
      <Text>Usuario: {props.userEmail}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: styling.separator,
  },
});

export default BnbHeaderUserInfo;

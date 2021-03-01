import React from "react";
import { StyleSheet, Text, View } from "react-native";

function BnbLoadingText(props) {
  return (
    <View style={{ ...styles.container, ...props.container }}>
      <Text style={{ ...styles.textStyle, ...props.textStyle }}>
        {props.children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  errorText: {
    textAlign: "center",
    fontFamily: "Raleway_400Regular",
  },
});

export default BnbLoadingText;

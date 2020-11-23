import { useLinkProps } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";

const BnbContainer = (props) => {
  return (
    <View style={{ ...styles.container, ...props.style }}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default BnbContainer;

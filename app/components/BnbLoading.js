import React from "react";
import { StyleSheet, Text, View } from "react-native";

const BnbLoading = (props) => (
  <View style={styles.loading}>
    {props.text ? <Text>{props.text}</Text> : <Text>Cargando...</Text>}
  </View>
);

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BnbLoading;

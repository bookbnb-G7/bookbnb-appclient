import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AnimatedLoader from "react-native-animated-loader";
import colors from "../config/colors";

const BnbLoading = (props) => (
  <View style={styles.loading}>
    <AnimatedLoader
      visible={true}
      overlayColor={colors.white}
      source={require("../assets/home_loader.json")}
      animationStyle={styles.lottie}
      speed={1}
    >
    {props.text
      ? <Text style={styles.normalText}>{props.text}</Text>
      : <Text style={styles.normalText}>Cargando...</Text>}
    </AnimatedLoader>
  </View>
);

const styles = StyleSheet.create({
  loading: {
    //flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: {
    width: 300,
    height: 300
  },
  normalText: {
    //fontFamily: "Raleway_400Regular",
  }
});

export default BnbLoading;

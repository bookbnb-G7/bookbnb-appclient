import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import colors from "../config/colors";
import styling from "../config/styling";

const RoomReview = (props) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.leftContainer}>{props.left}</View>
      <View style={styles.rightContainer}>{props.right}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: styling.separator,
  },
  leftContainer: {},
  rightContainer: {
    borderWidth: 1,
    backgroundColor: colors.graySoft,
    borderRadius: styling.smallCornerRadius,
  },
});

export default RoomReview;

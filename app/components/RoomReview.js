import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import colors from "../config/colors";
import styling from "../config/styling";

const image = require("../assets/icon.png");

const RoomReview = (props) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.reviewerContainer}>
        <Image source={image} style={styles.userImage}></Image>
        <View style={styles.reviewInfo}>
          <Text>{props.reviewer}</Text>
          <Text>{props.date}</Text>
        </View>
      </View>
      <View style={styles.reviewContainer}>
        <Text>{props.review}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: styling.separator,
  },
  reviewerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userImage: {
    width: styling.iconSize,
    height: styling.iconSize,
    borderRadius: styling.mediumCornerRadius,
    marginRight: 15,
  },
  reviewContainer: {
    marginVertical: styling.separator,

    //borderWidth: 1,
    //backgroundColor: colors.graySoft,
    //borderRadius: styling.smallCornerRadius,
  },
});

export default RoomReview;

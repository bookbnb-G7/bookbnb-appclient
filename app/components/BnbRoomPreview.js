import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import fonts from "../config/fonts";
import styling from "../config/styling";

const room_image = require("../assets/bookbnb_1.png");

const BnbRoomPreview = (props) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.roomImageContainer}>
        <Image source={room_image} style={styles.roomImage}></Image>
      </View>
      <View style={styles.roomDescriptionContainer}>
        <Text style={styles.roomReviewScore}>4 estrellas de 5</Text>
        <Text style={styles.roomTitleText}>Casa de verano, 4 habitaciones</Text>
        <Text style={styles.roomPriceText}>$ 15.000</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    //flex: 1,
    justifyContent: "center",
    marginVertical: styling.separator,
  },
  roomImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    //borderWidth: 1,
  },
  roomImage: {
    width: "100%",
    height: 200,
    borderRadius: styling.mediumCornerRadius,
  },
  roomDescriptionContainer: {
    //flex: 1,
    //borderWidth: 1,
    marginVertical: styling.separator,
  },
  roomReviewScore: {},
  roomTitleText: {
    fontSize: fonts.big,
  },
  roomPriceText: {
    fontWeight: "bold",
    fontSize: fonts.big,
  },
});

export default BnbRoomPreview;

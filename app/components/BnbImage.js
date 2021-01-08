import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styling from "../config/styling";

const BnbImage = (props) => {
  return (
    <View>
      <TouchableOpacity onPress={props.onPress}>
        <Image
          source={{ uri: props.uri !== "" ? props.uri : "null" }}
          style={{ ...styles.image, ...props.imageStyle }}
        ></Image>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    borderRadius: styling.smallCornerRadius,
  },
  noImageText: {
    textAlign: "center",
    width: 200,
    height: 200,
    borderRadius: styling.smallCornerRadius,
  },
});

export default BnbImage;

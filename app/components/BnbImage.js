import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styling from "../config/styling";

const BnbImage = (props) => {
  return (
    <View>
      {props.uri != "" && (
        <TouchableOpacity onPress={props.onPress}>
          <Image
            source={{ uri: props.uri }}
            style={{ ...styles.image, ...props.imageStyle }}
          ></Image>
        </TouchableOpacity>
      )}
      {props.uri == "" && <Text style={styles.noImageText}>No hay imagen</Text>}
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
  },
});

export default BnbImage;

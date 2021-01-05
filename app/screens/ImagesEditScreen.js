import React from "react";
import { StyleSheet, View } from "react-native";
import BnbButton from "../components/BnbButton";
import BnbImageSlider from "../components/BnbImageSlider";
import BnbMainView from "../components/BnbMainView";

function ImagesEditScreen({ route, navigation }) {
  const photos = route.params.photos;

  const _handleChangeImage = () => {};

  const _handleAddImage = () => {};

  const _handleRemoveImage = () => {};

  return (
    <BnbMainView>
      <View style={styles.imageSlider}>
        <BnbImageSlider
          images={photos}
          width={200}
          onPress={_handleChangeImage}
        ></BnbImageSlider>
      </View>
      <BnbButton title={"Agregar imagen"} onPress={_handleAddImage}></BnbButton>
      <BnbButton
        title={"Quitar imagen"}
        onPress={_handleRemoveImage}
      ></BnbButton>
    </BnbMainView>
  );
}

const styles = StyleSheet.create({
  imageSlider: {
    flex: 1,
    alignItems: "center",
  },
});

export default ImagesEditScreen;

import React, { useEffect, useState } from "react";
import { Image, Platform, StyleSheet, View } from "react-native";
import BnbMainView from "../components/BnbMainView";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import BnbButton from "../components/BnbButton";
import BnbBodyView from "../components/BnbBodyView";
import Separator from "../components/Separator";

/**Debe servir tanto para el perfil como para las habitaciones
 * El perfil es una sola imagen
 * Las habitaciones son muchas
 * El fetch es uno por imagen
 */

function ImagesPickScreen({ route, navigation }) {
  const { photo_uri } = route.params;
  const [image, setImage] = useState(photo_uri);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert("Necesitamos permisos de la camara para poder seguir");
          navigation.goBack();
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      /**Aca deberia enviarla al storage*/
    }
  };

  return (
    <BnbMainView>
      <BnbBodyView>
        {Image && (
          <View>
            <Image source={{ uri: image }} style={styles.image} />
            <Separator />
          </View>
        )}

        <BnbButton
          style={styles.button}
          title={"Elegir una imagen del rollo de la camara"}
          onPress={pickImage}
        ></BnbButton>
      </BnbBodyView>
    </BnbMainView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },
  button: {
    alignSelf: "center",
  },
});

export default ImagesPickScreen;

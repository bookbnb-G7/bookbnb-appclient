import React, { useEffect, useState } from "react";
import { Image, Platform, StyleSheet, View } from "react-native";
import BnbMainView from "../components/BnbMainView";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import BnbButton from "../components/BnbButton";
import BnbBodyView from "../components/BnbBodyView";
import Separator from "../components/Separator";
import httpPostRequest from "../helpers/httpPostRequest";
import BnbAlert from "../components/BnbAlert";
import httpPostImage from "../helpers/httpPostImage";


function getFileNameExtension(fname) {
  return fname.slice((fname.lastIndexOf(".") - 1 >>> 0) + 2);
}

/**Debe servir tanto para el perfil como para las habitaciones
 * El perfil es una sola imagen
 * Las habitaciones son muchas
 * El fetch es uno por imagen
 */

function ImagesPickScreen({ route, navigation }) {
  const { id, user } = route.params;
  const [image, setImage] = useState(user.photo);

  const _handleApiResponse = (data) => {
    BnbAlert(
      "Foto de perfil",
      "Foto de perfil actualizada con exito",
      "Entendido",
      false
    );
  };

  const _handleApiError = () => {
    BnbAlert(
      "Foto de perfil",
      "Ha ocurrido un error al querer actualizar la foto",
      "Entendido",
      false
    );
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert("Se necesitan permisos de la camara para poder continuar");
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
      base64: true,
    });
    const extension = getFileNameExtension(result.uri);
    const file = {
      uri: result.uri,
      name: "profile." + extension,
      type: "image/" + extension
    }
    if (!result.cancelled) {
      //setImage(file);
      httpPostImage(
        "PATCH",
        "https://bookbnb-appserver.herokuapp.com/users/" + id + "/photo",
        file,
        _handleApiResponse,
        _handleApiError
      );
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

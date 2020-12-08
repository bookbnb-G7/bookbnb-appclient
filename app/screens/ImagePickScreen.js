import React, { useEffect, useState } from "react";
import { Image, Platform, StyleSheet, View, Text } from "react-native";
import BnbMainView from "../components/BnbMainView";
import BnbButton from "../components/BnbButton";
import BnbBodyView from "../components/BnbBodyView";
import Separator from "../components/Separator";
import BnbAlert from "../components/BnbAlert";
import styling from "../config/styling";
import httpPostImage from "../helpers/httpPostImage";
import pickAnImage from "../helpers/pickAnImage";
import useRequestCameraPermissions from "../helpers/useRequestCameraPermissions";
import BnbLoading from "../components/BnbLoading";

/**Version mejorada, la idea es que al sleccionar una imagen, ya sea de perfil o de la lista
 * de fotos del room, me derive a esta pantalla para editarla
 */
function ImagePickScreen({ route, navigation }) {
  const { image_uri, url } = route.params;
  const [image, setImage] = useState(image_uri);

  const _handleApiResponse = () => {
    BnbAlert("Imagen", "Imagen actualizada con exito", "Entendido", false);
  };

  const _handleApiError = () => {
    BnbAlert(
      "Imagen",
      "Ha ocurrido un error al querer actualizar la imagen",
      "Entendido",
      false
    );
  };

  const isGranted = useRequestCameraPermissions();

  if (!isGranted) {
    BnbAlert(
      "Permisos",
      "Se necesitan permisos de la camara para poder continuar",
      "entendido",
      false
    );
    navigation.goBack();
  }

  const pickImage = () => {
    const file = pickAnImage();
    if (file) {
      setImage(file.uri);
      httpPostImage("PATCH", url, file, _handleApiResponse, _handleApiError);
    }
  };

  if (!isGranted) {
    return <BnbLoading></BnbLoading>;
  } else {
    return (
      <BnbMainView>
        <Separator></Separator>
        <BnbBodyView>
          {image && (
            <View>
              <Image source={{ uri: image }} style={styles.image} />
              <Separator />
            </View>
          )}
          <Text style={styles.textContainer}>
            Seleccione una imagen del rollo de la camara para cambiar la imagen
          </Text>
          <BnbButton
            style={styles.button}
            title={"Cambiar imagen"}
            onPress={pickImage}
          ></BnbButton>
        </BnbBodyView>
      </BnbMainView>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    borderRadius: styling.smallCornerRadius,
    alignSelf: "center",
  },
  button: {
    alignSelf: "center",
  },
  textContainer: {
    alignItems: "center",
    marginVertical: styling.separator * 2,
  },
});

export default ImagePickScreen;

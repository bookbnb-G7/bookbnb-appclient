import React, { useEffect, useState } from "react";
import { Image, Platform, StyleSheet, View, Text } from "react-native";
import BnbMainView from "../components/BnbMainView";
import BnbButton from "../components/BnbButton";
import BnbBodyView from "../components/BnbBodyView";
import Separator from "../components/Separator";
import BnbAlert from "../components/BnbAlert";
import styling from "../config/styling";
import pickAnImage from "../helpers/pickAnImage";
import BnbLoading from "../components/BnbLoading";
import BnbSecureStore from "../classes/BnbSecureStore";
import constants from "../constant/constants";
import * as ImagePicker from "expo-image-picker";
import httpPostTokenRequest from "../helpers/httpPostTokenRequest";
import urls from "../constant/urls";
import BnbImage from "../components/BnbImage";

/**Version mejorada, la idea es que al sleccionar una imagen, ya sea de perfil o de la lista
 * de fotos del room, me derive a esta pantalla para editarla
 */
function ImagePickScreen({ route, navigation }) {
  const [storedUser, setStoredUser] = useState();
  const [_is_awaiting, setIsAwaiting] = useState(false);

  useEffect(() => {
    BnbSecureStore.read(constants.CACHE_USER_KEY).then((user) => {
      setStoredUser(user);
    });
  }, []);

  const _handleApiResponse = (data) => {
    /**copio */
    let userData = storedUser.userData;

    /**modifico */
    userData["photo"] = data.photo;

    /**armo de nuevo */
    const storeUser = {
      auth_token: storedUser.auth_token,
      userData: userData,
    };

    /**guardo */
    BnbSecureStore.remember(constants.CACHE_USER_KEY, storeUser).then(() => {
      navigation.navigate("ProfileEdit", { photo: data.photo });
    });
  };

  const _handleApiError = () => {
    BnbAlert(
      "Imagen",
      "Ha ocurrido un error al querer actualizar la imagen",
      "Entendido",
      false
    );
    setIsAwaiting(false);
  };

  useEffect(() => {
    async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          BnbAlert(
            "Permisos",
            "Se necesitan permisos de la camara para poder continuar",
            "entendido",
            false
          );
          navigation.goBack();
        }
      }
    };
  }, []);

  const pickImage = () => {
    setIsAwaiting(true);
    pickAnImage().then((file) => {
      if (file) {
        httpPostTokenRequest(
          "PATCH",
          urls.URL_USERS + "/" + storedUser.userData.id + "/photo",
          file,
          {
            "Content-Type": "multipart/form-data",
            "x-access-token": storedUser.auth_token,
          },
          _handleApiResponse,
          _handleApiError,
          true
        );
      }
    });
  };

  if (_is_awaiting) {
    return <BnbLoading text="Actualizando imagen..."></BnbLoading>;
  }

  return (
    <BnbMainView>
      <Separator></Separator>
      <BnbBodyView>
        <BnbImage
          imageStyle={styles.image}
          uri={storedUser ? storedUser.userData.photo : ""}
        ></BnbImage>

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

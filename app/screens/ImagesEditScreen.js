import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import BnbSecureStore from "../classes/BnbSecureStore";
import BnbButton from "../components/BnbButton";
import BnbImageSlider from "../components/BnbImageSlider";
import BnbLoading from "../components/BnbLoading";
import BnbMainView from "../components/BnbMainView";
import constants from "../constant/constants";
import urls from "../constant/urls";
import httpPostTokenRequest from "../helpers/httpPostTokenRequest";
import ImagePicker from "expo-image-picker";
import BnbAlertMultiButtons from "../components/BnbAlertMultiButtons";
import pickAnImage from "../helpers/pickAnImage";
import httpGetTokenRequest from "../helpers/httpGetTokenRequest";
import BnbAlert from "../components/BnbAlert";
import useRequestMediaLibraryPermissionsAsync from "../helpers/useRequestMediaLibraryPermissionsAsync";

function ImagesEditScreen({ route, navigation }) {
  const photos = route.params.photos;
  const [storedUser, setStoredUser] = useState();
  const [_is_loading, setIsLoading] = useState(true);
  const [_error, setError] = useState();

  const _handleApiResponse = () => {
    setIsLoading(false);
    alert("success");
  };

  const _handleApiError = (error) => {
    setError(error);
    setIsLoading(false);
  };

  const _handleRemoveImage = (index) => {
    if (photos.room_photos.length !== 0) {
      BnbAlertMultiButtons(
        "Eliminar imagen",
        "Si acepta la imagen sera eliminada permanentemente",
        [
          {
            text: "Aceptar",
            onPress: _deleteImage(photos.room_photos[index].firebase.id),
          },
          {
            text: "Cancelar",
            style: "cancel",
          },
        ],
        false
      );
    } else {
      alert("Esta habitacion no tiene ninguna foto");
    }
  };

  const _pickImage = () => {
    setIsLoading(true);
    pickAnImage().then(
      (file) => {
        if (file) {
          httpPostTokenRequest(
            "POST",
            urls.URL_ROOMS + "/" + photos.room_id + "/photos",
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
      },
      (reason) => {
        setIsLoading(false);
      }
    );
  };

  const _deleteImage = (photo_firebase_id) => {
    setIsLoading(true);
    httpGetTokenRequest(
      "DELETE",
      urls.URL_ROOMS + "/" + photos.room_id + "/photos/" + photo_firebase_id,
      { "x-access-token": storedUser.auth_token },
      _handleApiResponse,
      _handleApiError
    );
  };

  useEffect(() => {
    BnbSecureStore.read(constants.CACHE_USER_KEY).then((user) => {
      setStoredUser(user);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    useRequestMediaLibraryPermissionsAsync().then((is_granted) => {
      if (!is_granted) {
        BnbAlert(
          "Permisos",
          "Se necesitan permisos de la camara para poder continuar",
          "entendido",
          false
        );
        navigation.goBack();
      }
    });
  }, []);

  if (_is_loading) {
    return <BnbLoading></BnbLoading>;
  } else if (_error) {
    return <Text style={styles.centerText}>Error: {_error.message}</Text>;
  } else {
    return (
      <BnbMainView>
        <View style={styles.imageSlider}>
          <BnbImageSlider
            images={photos.room_photos}
            width={200}
            onPress={_handleRemoveImage}
          ></BnbImageSlider>
        </View>
        <BnbButton title={"Agregar imagen"} onPress={_pickImage}></BnbButton>
      </BnbMainView>
    );
  }
}

const styles = StyleSheet.create({
  imageSlider: {
    flex: 1,
    alignItems: "center",
  },
  centerText: {
    flex: 1,
    alignSelf: "center",
    textAlignVertical: "center",
  },
});

export default ImagesEditScreen;

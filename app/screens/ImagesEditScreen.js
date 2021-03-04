import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
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
import getUrlFromPhotos from "../helpers/getUrlFromPhotos";
import bnbStyleSheet from "../constant/bnbStyleSheet";
import BnbBodyView from "../components/BnbBodyView";
import BnbError from "../components/BnbError";

/**Deberia pasar un ide y hacer el fetch aca, pero dejaria de ser generico
 * dado que no es lo mismo el user que el room, creo
 */
function ImagesEditScreen({ route, navigation }) {
  const room_id = route.params.room_id;
  const isCreatingRoom = route?.params?.isCreatingRoom;

  const [_photos, setPhotos] = useState();
  const [storedUser, setStoredUser] = useState();
  const [_is_loading, setIsLoading] = useState(true);
  const [_error, setError] = useState();
  const [_photos_urls, setPhotosUrl] = useState([]);

  const [_is_loading_photos, setIsLoadingPhotos] = useState(false);

  const _handleApiResponse = () => {
    setIsLoading(false);
    /**TODO: navegar al room screen que acabo de crear como si lo hiciera por Mis Habitaciones */
    if (isCreatingRoom) {
      BnbAlert(
        "Creacion finalizada",
        "Puede ver su nueva habitacion en Mis habitaciones",
        "Entendido"
      );
      navigation.popToTop();
    }
  };

  const _handleApiError = (error) => {
    BnbAlert("Error", "Hubo un error con la galeria de imagenes", "Entendido");
    setIsLoading(false);
    setIsLoadingPhotos(false);
  };

  const _handleRemoveImage = (index) => {
    if (_photos.room_photos.length !== 0) {
      Alert.alert("Eliminar imagen", "Si acepta la imagen sera eliminada", [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Aceptar",
          onPress: () => {
            _deleteImage(_photos.room_photos[index].firebase_id);
          },
        },
      ]);
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
            urls.URL_ROOMS + "/" + room_id + "/photos",
            file,
            {
              "Content-Type": "multipart/form-data",
              "x-access-token": storedUser.auth_token,
            },
            _handleApiResponse,
            _handleApiError,
            true
          ).then(() => {
            _fetchPhotos();
          });
        }
      },
      (cancelled) => {
        setIsLoading(!cancelled);
      }
    );
  };

  const _deleteImage = (photo_firebase_id) => {
    setIsLoading(true);
    console.log(photo_firebase_id);
    httpGetTokenRequest(
      "DELETE",
      urls.URL_ROOMS + "/" + room_id + "/photos/" + photo_firebase_id,
      { "x-access-token": storedUser.auth_token }
    ).then(
      () => {
        _fetchPhotos();
      },
      (error) => {
        BnbAlert(
          "Error",
          "Hubo un error con la galeria de imagenes",
          "Entendido"
        );
        setIsLoading(false);
      }
    );
  };

  const _fetchPhotos = () => {
    setIsLoadingPhotos(true);
    httpGetTokenRequest(
      "GET",
      urls.URL_ROOMS + "/" + room_id + "/photos",
      {},
      null,
      _handleApiError
    ).then((photos) => {
      if (photos) {
        setPhotos(photos);
        setPhotosUrl(getUrlFromPhotos(photos.room_photos));
        setIsLoading(false);
        setIsLoadingPhotos(false);
      }
    });
  };

  useEffect(() => {
    BnbSecureStore.read(constants.CACHE_USER_KEY).then((user) => {
      setStoredUser(user);
      _fetchPhotos();
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
    return <BnbLoading text="Cargando Imagenes..."></BnbLoading>;
  } else if (_error) {
    return <BnbError>Error: {_error.message}</BnbError>;
  } else {
    return (
      <BnbMainView>
        <BnbBodyView>
          {isCreatingRoom && (
            <Text style={bnbStyleSheet.headerTextBlack}>
              Seleccione una imagen para su publicacion
            </Text>
          )}
          <View style={styles.imageSlider}>
            {!_is_loading_photos && (
              <BnbImageSlider
                images={_photos_urls}
                onPress={_handleRemoveImage}
              />
            )}
          </View>
          {!isCreatingRoom && (
            <View>
              <Text style={bnbStyleSheet.normalText}>
                Para quitar una imagen de la publicación solo presione la imagen
                que quiere remover
              </Text>
            </View>
          )}
          <BnbButton title={"Agregar imagen"} onPress={_pickImage} />
          {isCreatingRoom && (
            <BnbButton
              title={"No agregar imagen y terminar"}
              onPress={_handleApiResponse}
            />
          )}
        </BnbBodyView>
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

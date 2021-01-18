import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import BnbAlertMultiButtons from "../components/BnbAlertMultiButtons";
import BnbBodyView from "../components/BnbBodyView";
import BnbButton from "../components/BnbButton";
import BnbMainView from "../components/BnbMainView";
import BnbTitleText from "../components/BnbTitleText";
import Separator from "../components/Separator";
import colors from "../config/colors";
import fonts from "../config/fonts";
import httpGetTokenRequest from "../helpers/httpGetTokenRequest";
import httpPostTokenRequest from "../helpers/httpPostTokenRequest";
import urls from "../constant/urls";
import constants from "../constant/constants";
import BnbSecureStore from "../classes/BnbSecureStore";
import BnbLoading from "../components/BnbLoading";
import BnbImageSlider from "../components/BnbImageSlider";
import getUrlFromPhotos from "../helpers/getUrlFromPhotos";

function RoomEditScreen({ route, navigation }) {
  const room_id = route.params.room_id;
  const [_room, setRoom] = useState();
  const [_photos, setPhotos] = useState();
  const [_photos_urls, setPhotosUrl] = useState([]);
  const [storedUser, setStoredUser] = useState();
  const [_is_editing, setIsEditing] = useState(false);
  const [_is_loading, setIsLoading] = useState(true);
  const [_error, setError] = useState();

  const _handleTextChange = (key, value) => {
    setRoom({ ..._room, [key]: value });
  };

  const _handleImagePress = () => {
    navigation.navigate("ImagesEdit", { room_id: room_id });
  };

  const _handleToggleEditRoomButtonPress = () => {
    setIsEditing(!_is_editing);
  };

  const _handleApiResponse = (data) => {
    setIsLoading(false);
  };

  const _handleApiError = (error) => {
    setError(error);
    setIsLoading(false);
  };

  const _handleFinishEditingButtonPress = () => {
    setIsLoading(true);
    setIsEditing(false);
    httpPostTokenRequest(
      "PATCH",
      urls.URL_ROOMS + "/" + room_id,
      {
        price_per_day: _room.price_per_day,
      },
      {
        "x-access-token": storedUser.auth_token,
        "Content-Type": "application/json",
      },
      _handleApiResponse,
      _handleApiError
    );
  };

  const _handleConfirmDelete = () => {
    setIsLoading(true);
    setIsEditing(false);
    httpGetTokenRequest(
      "DELETE",
      urls.URL_ROOMS + "/" + room_id,
      { "x-access-token": storedUser.auth_token },
      _handleApiResponse,
      _handleApiError
    );
  };

  const _handleDeleteRoomButtonPress = () => {
    BnbAlertMultiButtons(
      "Eliminar habitación",
      "Si acepta la habitación sera eliminada permanentemente",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        { text: "Aceptar", onPress: _handleConfirmDelete },
      ],
      false
    );
  };

  useEffect(() => {
    httpGetTokenRequest(
      "GET",
      urls.URL_ROOMS + "/" + room_id,
      {},
      null,
      _handleApiError
    )
      .then((room) => {
        setRoom(room);
        return httpGetTokenRequest(
          "GET",
          urls.URL_ROOMS + "/" + room_id + "/photos",
          {},
          null,
          _handleApiError
        );
      })
      .then((photos) => {
        setPhotos(photos);
        setPhotosUrl(getUrlFromPhotos(photos.room_photos));
        return BnbSecureStore.read(constants.CACHE_USER_KEY);
      })
      .then((user) => {
        setStoredUser(user);
        setIsLoading(false);
      });
  }, []);

  if (_error) {
    return <Text>{_error.message}</Text>;
  }

  if (_is_loading) {
    return <BnbLoading></BnbLoading>;
  }

  return (
    <BnbMainView style={styles.white}>
      <BnbBodyView>
        <ScrollView>
          <BnbTitleText style={styles.subTitle}>{_room.type}</BnbTitleText>
          <View style={styles.imageSlider}>
            <BnbImageSlider
              images={_photos_urls}
              width={200}
              onPress={_handleImagePress}
            ></BnbImageSlider>
          </View>
          <Separator></Separator>
          <View style={styles.rowRoomElement}>
            <Text style={styles.keyText}>Precio por dia: </Text>
            <TextInput
              style={styles.valueText}
              value={_room.price_per_day.toString()}
              editable={_is_editing}
              onChangeText={(text) => {
                _handleTextChange("price_per_day", text);
              }}
              multiline
            ></TextInput>
          </View>

          <View style={styles.buttonsContainer}>
            <BnbButton
              style={styles.button}
              title={_is_editing ? "Aceptar" : "Editar habitacion"}
              onPress={
                _is_editing
                  ? _handleFinishEditingButtonPress
                  : _handleToggleEditRoomButtonPress
              }
            ></BnbButton>

            {_is_editing && (
              <BnbButton
                style={styles.button}
                title={"Cancelar"}
                onPress={_handleToggleEditRoomButtonPress}
              ></BnbButton>
            )}
          </View>
          {_is_editing && (
            <View>
              <BnbTitleText style={styles.subTitle}>
                Eliminar Habitación
              </BnbTitleText>
              <Separator></Separator>
              <BnbButton
                title="Eliminar habitación"
                onPress={_handleDeleteRoomButtonPress}
              />
            </View>
          )}
        </ScrollView>
      </BnbBodyView>
    </BnbMainView>
  );
}

const styles = StyleSheet.create({
  white: {
    backgroundColor: "white",
  },
  subTitle: {
    color: "black",
    fontSize: fonts.bigBig,
  },
  imageSlider: {
    flex: 1,
    alignItems: "center",
  },
  rowRoomElement: {
    flexDirection: "row",
  },
  keyText: {
    fontSize: fonts.semi,
    flex: 1,
  },
  valueText: {
    flex: 1.5,
    fontSize: fonts.semi,
    backgroundColor: colors.graySoft,
  },
  buttonsContainer: {
    marginVertical: 20,
  },
});

export default RoomEditScreen;

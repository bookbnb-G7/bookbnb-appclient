import React, { useEffect, useRef, useState } from "react";
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
import BnbFloatingTextInput from "../components/BnbFloatingTextInput";
import bnbStyleSheet from "../constant/bnbStyleSheet";
import BnbRoomInfo from "../components/BnbRoomInfo";

function RoomEditScreen({ route, navigation }) {
  const room_id = route.params.room_id;
  const [_room, setRoom] = useState();
  const [_photos_urls, setPhotosUrl] = useState([]);
  const [storedUser, setStoredUser] = useState();
  const [_is_editing, setIsEditing] = useState(false);
  const [_is_loading, setIsLoading] = useState(true);
  const [_error, setError] = useState();

  const [roomPatch, setRoomPatch] = useState({
    price_per_day: 0,
  });

  const _handleTextChange = (key, value) => {
    setRoomPatch({ ...roomPatch, [key]: value });
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
        price_per_day: roomPatch.price_per_day,
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
    BnbSecureStore.read(constants.CACHE_USER_KEY).then((user) => {
      setStoredUser(user);
    });
  }, []);

  useEffect(() => {
    if (storedUser) {
      httpGetTokenRequest("GET", urls.URL_ROOMS + "/" + room_id, {
        "x-access-token": storedUser.auth_token,
      })
        .then((room) => {
          setRoom(room);
          setRoomPatch(room);
          return httpGetTokenRequest(
            "GET",
            urls.URL_ROOMS + "/" + room_id + "/photos",
            {}
          );
        })
        .then((photos) => {
          setPhotosUrl(getUrlFromPhotos(photos.room_photos));
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error);
          setIsLoading(false);
        });
    }
  }, [storedUser]);

  const ref_price_per_day = useRef();

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
          {_room && storedUser && (
            <BnbRoomInfo
              room={_room}
              me_id={storedUser.userData.id}
              auth_token={storedUser.auth_token}
              navigation={navigation}
            />
          )}
          <Separator></Separator>
          <Text style={{ ...bnbStyleSheet.subHeaderText, ...styles.separator }}>
            Editar publicacion
          </Text>
          <BnbFloatingTextInput
            name="Precio por dia"
            id={"price_per_day"}
            object={roomPatch}
            onChange={_handleTextChange}
            inputRef={ref_price_per_day}
            editable={_is_editing}
          />
          <View style={styles.buttonsContainer}>
            <BnbButton
              style={styles.button}
              title={_is_editing ? "Aceptar cambios" : "Editar"}
              onPress={
                _is_editing
                  ? _handleFinishEditingButtonPress
                  : _handleToggleEditRoomButtonPress
              }
            />
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
              <Text style={{ ...bnbStyleSheet.subHeaderText }}>
                Borrar habitación
              </Text>
              <Separator></Separator>
              <BnbButton
                title="Borrar habitación"
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
  separator: {
    marginTop: 30,
    marginBottom: 15,
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

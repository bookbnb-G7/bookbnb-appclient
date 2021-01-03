import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
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

function RoomEditScreen({ route, navigation }) {
  const { room } = route.params;
  const [_is_editing, setIsEditing] = useState(false);
  /**TODO: borrar esto */
  const [_is_owner, setIsOwner] = useState(true);

  const [_is_loading, setIsLoading] = useState(true);
  const [storedUser, setStoredUser] = useState();

  useEffect(() => {
    BnbSecureStore.read(constants.CACHE_USER_KEY).then((user) => {
      setStoredUser(user);
      setIsLoading(false);
    });
  }, []);

  const _handleToggleEditRoomButtonPress = () => {
    setIsEditing(!_is_editing);
  };

  const _handleApiResponse = (data) => {
    navigation.navigate("Home");
  };

  const _handleApiError = () => {
    setIsLoading(false);
  };

  const _handleFinishEditingButtonPress = () => {
    setIsEditing(false);
    httpPostTokenRequest(
      "PATCH",
      urls.URL_ROOMS + "/" + room.id,
      {
        price_per_day: room.price_per_day,
      },
      {
        "x-access-token": storedUser.auth_token,
        "Content-Type": "application/json",
      },
      _handleApiResponse
    );
  };

  const _handleConfirmDelete = () => {
    setIsEditing(false);
    setIsLoading(true);
    httpGetTokenRequest(
      "DELETE",
      urls.URL_ROOMS + "/" + room.id,
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

  if (_is_loading) {
    return <BnbLoading></BnbLoading>;
  }

  return (
    <BnbMainView style={styles.white}>
      <BnbBodyView>
        <BnbTitleText style={styles.subTitle}>
          Detalles de la habitacion
        </BnbTitleText>
        <Separator></Separator>
        <View style={styles.rowRoomElement}>
          <Text style={styles.keyText}>Precio por dia: </Text>
          <TextInput
            style={styles.valueText}
            defaultValue={room.price_per_day.toString()}
            editable={_is_editing}
            onChangeText={(text) => (room["price_per_day"] = text)}
            multiline
          ></TextInput>
        </View>

        <View style={styles.buttonsContainer}>
          {_is_owner && (
            <BnbButton
              style={styles.button}
              title={_is_editing ? "Aceptar" : "Editar habitacion"}
              onPress={
                _is_editing
                  ? _handleFinishEditingButtonPress
                  : _handleToggleEditRoomButtonPress
              }
            ></BnbButton>
          )}
          {_is_editing && (
            <BnbButton
              style={styles.button}
              title={"Cancelar"}
              onPress={_handleToggleEditRoomButtonPress}
            ></BnbButton>
          )}
        </View>
        {_is_owner && _is_editing && (
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

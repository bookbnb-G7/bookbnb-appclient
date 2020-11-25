import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import BnbBodyView from "../components/BnbBodyView";
import BnbButton from "../components/BnbButton";
import BnbMainView from "../components/BnbMainView";
import BnbTitleText from "../components/BnbTitleText";
import Separator from "../components/Separator";
import colors from "../config/colors";
import fonts from "../config/fonts";
import styling from "../config/styling";
import httpGetRequest from "../helpers/httpGetRequest";
import httpPostRequest from "../helpers/httpPostRequest";

function RoomEditScreen({ route, navigation }) {
  const { room } = route.params;
  const [_is_editing, setIsEditing] = useState(false);
  const [_is_owner, setIsOwner] = useState(true);

  const _handleToggleEditRoomButtonPress = () => {
    setIsEditing(!_is_editing);
  };

  const _handleApiResponse = (data) => {
    alert(JSON.stringify(data));
  };

  const _handleFinishEditingButtonPress = () => {
    setIsEditing(false);
    httpPostRequest(
      "PATCH",
      "http://bookbnb-appserver.herokuapp.com/rooms/" + room.id,
      {
        type: room.type,
        price_per_day: room.price_per_day,
      },
      _handleApiResponse
    );
  };

  const _handleConfirmDelete = () => {
    setIsEditing(false);
    httpGetRequest(
      "DELETE",
      "http://bookbnb-appserver.herokuapp.com/rooms/" + room.id,
      _handleApiResponse
    );
    navigation.navigate("Home");
  };

  const _handleDeleteRoomButtonPress = () => {
    Alert.alert(
      "Eliminar habitación",
      "Si acepta la habitación sera eliminada permanentemente",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Aceptar", onPress: _handleConfirmDelete },
      ],
      { cancelable: false }
    );
  };

  return (
    <BnbMainView style={styles.white}>
      <BnbBodyView>
        <BnbTitleText style={styles.subTitle}>
          Detalles de la habitacion
        </BnbTitleText>
        <Separator />
        <View style={styles.rowRoomElement}>
          <Text style={styles.keyText}>Nombre(tipo): </Text>
          <TextInput
            style={styles.valueText}
            defaultValue={room.type.toString()}
            editable={_is_editing}
            onChangeText={(text) => (room["type"] = text)}
            multiline
          ></TextInput>
        </View>
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
        <Separator></Separator>
        {_is_owner && _is_editing && (
          <View>
            <BnbTitleText style={styles.subTitle}>
              Eliminar Habitación
            </BnbTitleText>
            <BnbButton
              style={styles.buttonsContainer}
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
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default RoomEditScreen;

import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import BnbBodyView from "../components/BnbBodyView";
import BnbButton from "../components/BnbButton";
import BnbMainView from "../components/BnbMainView";
import Separator from "../components/Separator";
import colors from "../config/colors";
import fonts from "../config/fonts";
import styling from "../config/styling";
import httpPostRequest from "../helpers/httpPostRequest";

function RoomEditScreen({ route, navigation }) {
  const { room } = route.params;
  const [_is_editing, setIsEditing] = useState(false);
  const [_is_owner, setIsOwner] = useState(true);

  const privates = ["id", "at", "owner"];
  const _isPrivate = (s_key) => {
    let i = 0;
    let is_private = false;
    do {
      is_private = Boolean(s_key.search(privates[i]) >= 0);
      i++;
    } while (i < privates.length && !is_private);

    return is_private;
  };

  const _handleEditRoomButtonPress = () => {
    setIsEditing(true);
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

  return (
    <BnbMainView style={styles.white}>
      <BnbBodyView>
        {Object.entries(room).map(([key, value]) => (
          <View key={key}>
            {!_isPrivate(key) && (
              <View style={styles.rowRoomElement}>
                <Text style={styles.keyText}>{key}</Text>
                <TextInput
                  style={styles.valueText}
                  defaultValue={value.toString()}
                  editable={_is_editing}
                  onChangeText={(text) => (room[key] = text)}
                  multiline
                ></TextInput>
              </View>
            )}
          </View>
        ))}
        {_is_owner && (
          <View style={styles.buttonsContainer}>
            <BnbButton
              style={styles.button}
              title={_is_editing ? "Aceptar" : "Editar habitacion"}
              onPress={
                _is_editing
                  ? _handleFinishEditingButtonPress
                  : _handleEditRoomButtonPress
              }
            ></BnbButton>
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
  rowRoomElement: {
    flexDirection: "row",
    marginVertical: styling.separator,
    borderBottomWidth: 1,
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
    marginVertical: styling.separator,
    alignItems: "center",
  },
});

export default RoomEditScreen;

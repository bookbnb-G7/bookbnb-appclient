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

function RoomEditScreen({ route, navigation }) {
  const { room } = route.params;
  const [_is_editing, setIsEditing] = useState(false);
  const [_is_owner, setIsOwner] = useState(true);

  const _handleEditRoomButtonPress = () => {
    setIsEditing(!_is_editing);
  };

  return (
    <BnbMainView style={styles.white}>
      <BnbBodyView>
        {Object.entries(room).map(([key, value]) => (
          <View key={key}>
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
            <Separator />
          </View>
        ))}
        {_is_owner && (
          <View style={styles.buttonsContainer}>
            <BnbButton
              style={styles.button}
              title={_is_editing ? "Aceptar" : "Editar habitacion"}
              onPress={_handleEditRoomButtonPress}
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

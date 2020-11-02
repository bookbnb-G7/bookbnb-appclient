import React, { useEffect, useState } from "react";
import { StyleSheet, Text, useColorScheme, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import colors from "../config/colors";
import fonts from "../config/fonts";

import isANumber from "../helpers/isANumber";

/**TODO: en vez de un screen a parte, volver esto un CUstom React hook
 * y buscar implementarlo en RoomsScreen
 */

/**TODO: meter en la carpeta helpers o crear otra carpeta para componentes de UI
 * ui_helpers?
 */

function Separator() {
  return <View style={styles.separator}></View>;
}

function GetRoomScreen({ route, navigation }) {
  const { url } = route.params;
  const [_room, setRoom] = useState({});
  const [_room_id_input, setRoomIdInput] = useState("");

  const [_error, setError] = useState(null);

  const [_is_get, setIsGet] = useState(false);

  function _handleGetRoomButtonPress() {
    if (isANumber(_room_id_input)) {
      alert(url + _room_id_input);
      setIsGet(true);
    }
  }

  function _handleApiResponse(response) {
    setRoom(response);
  }

  function _handleGoBackButtonPress() {
    navigation.navigate("Rooms");
  }

  useEffect(() => {
    if (_is_get) {
      fetch(url + _room_id_input)
        .then((response) => response.json())
        .then(
          (response) => {
            _handleApiResponse(response);
          },
          (error) => {
            setError(error);
          }
        );
      return () => {
        setIsGet(false);
      };
    }
  }, [_is_get]);

  if (_error) {
    return (
      <View style={styles.loading}>
        <Text> Error: {_error.message}</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Text>Complete el campo con el id de la habitacion a consultar</Text>
        </View>
        <View style={styles.bodyContainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={setRoomIdInput}
            placeholder="room_id"
          ></TextInput>
          <Separator></Separator>
        </View>
        <View style={styles.footerContainer}>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={_handleGetRoomButtonPress}
            >
              <Text style={styles.buttonText}>GET ROOM</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={_handleGoBackButtonPress}
            >
              <Text style={styles.buttonText}>GO BACK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.warning,
  },
  textInput: {
    fontSize: fonts.big,
    borderColor: "blue",
    borderStyle: "solid",
    borderRadius: 20,
  },
  headerContainer: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: colors.grayBg,
  },
  bodyContainer: {
    flex: 4,
    backgroundColor: colors.white,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 50,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderWidth: 1,
    borderColor: colors.black,
    borderStyle: "solid",
  },
  buttonText: {
    fontSize: fonts.big,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: colors.separator,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  footerContainer: {
    flex: 1,
    backgroundColor: colors.grayBg,
    justifyContent: "center",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GetRoomScreen;

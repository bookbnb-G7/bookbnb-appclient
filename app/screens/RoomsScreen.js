import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import colors from "../config/colors";
import fonts from "../config/fonts";

/**TODO: Si esto tiene un handler tiene que ser capaz de burbujearlo mediante el props
 * si no, no lo puedo poner en una carpeta aparte
 */

const logo = require("../assets/Octocat.png");

function RoomOptionButton(props) {
  return (
    <View style={styles.fixToText}>
      <TouchableOpacity onPress={props.handler}>
        <Text style={styles.buttonText}> {props.title} </Text>
      </TouchableOpacity>
      <Image source={logo} style={styles.buttonImage}></Image>
    </View>
  );
}

function Separator() {
  return <View style={styles.separator}></View>;
}

function RoomsScreen(props) {
  const ROOM_API_URL = "http://localhost:3000/rooms/";
  const [_room, setRoom] = useState({});
  const [_room_id_input, setRoomIdInput] = useState(0);

  const [_error, setError] = useState(null);

  const [_is_get, setIsGet] = useState(false);
  const [_is_post, setIsPost] = useState(false);

  function _handleCreateRoomButtonPress() {
    setIsPost(true);
  }

  function _handleGetAllReviewsButtonPress() {}

  function _handleRateRoomButtonPress() {}

  function _handleReviewRoomButtonPress() {}

  function _handleGetRoomButtonPress() {
    /**navigate Screen con los detalles del room pasandole
     * el resultado del fetch?
     * Pero hacer un screen por cada opcion me parece mucho
     */
    setIsGet(true);
  }

  function _handleGetRoomReviewButtonPress() {}

  function _handleGetRoomRatingButtonPress() {}

  function _handleApiResponse(response) {
    console.log(response.id);
  }

  /**Hooks "prohibe" declarar los useEffect en funciones
   * siempre deben aparecer top-level de la funcion
   * podria poner un useEffect por screen
   */
  useEffect(() => {
    if (_is_get) {
      console.log(ROOM_API_URL);
      fetch(ROOM_API_URL + "1")
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
    return <Text>Error: {_error.message}</Text>;
  } else {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Text>Header</Text>
        </View>
        <View style={styles.bodyContainer}>
          <View style={styles.buttonsContainer}>
            <View>
              <RoomOptionButton
                title="Create Room"
                handler={_handleCreateRoomButtonPress}
              ></RoomOptionButton>
              <Separator />
            </View>
            <View>
              <RoomOptionButton
                title="Get All Room Reviews"
                handler={_handleGetAllReviewsButtonPress}
              ></RoomOptionButton>
              <Separator />
            </View>
            <View>
              <RoomOptionButton
                title="Rate Room"
                handler={_handleRateRoomButtonPress}
              ></RoomOptionButton>
              <Separator />
            </View>
            <View>
              <RoomOptionButton
                title="Review Room"
                handler={_handleReviewRoomButtonPress}
              ></RoomOptionButton>
              <Separator />
            </View>
            <View>
              <RoomOptionButton
                title="Get Room"
                handler={_handleGetRoomButtonPress}
              ></RoomOptionButton>
              <Separator />
            </View>
            <View>
              <RoomOptionButton
                title="Get Room Review"
                handler={_handleGetRoomReviewButtonPress}
              ></RoomOptionButton>
              <Separator />
            </View>
            <View>
              <RoomOptionButton
                title="Get Room Rating"
                handler={_handleGetRoomRatingButtonPress}
              ></RoomOptionButton>
              <Separator />
            </View>
          </View>
        </View>
        <View style={styles.footerContainer}>
          <Text>Footer</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headerContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  bodyContainer: {
    flexGrow: 1,
    backgroundColor: colors.white,
  },
  buttonsContainer: {
    justifyContent: "flex-end",
  },
  footerContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonText: {
    fontSize: fonts.big,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: colors.separator,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  buttonImage: {
    width: 50,
    height: 50,
  },
});

export default RoomsScreen;

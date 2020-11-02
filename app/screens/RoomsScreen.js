import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import colors from "../config/colors";
import fonts from "../config/fonts";

/**TODO: Si esto tiene un handler tiene que ser capaz de burbujearlo mediante el props
 * si no, no lo puedo poner en una carpeta aparte
 */

const logo = require("../assets/house_logo.png");

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

function RoomsScreen({ navigation }) {
  const MOCK_URL = "https://bookbnb-appserver.herokuapp.com/notes/";
  const ROOM_API_URL = "http://localhost:3000/rooms/";

  const [_room_id_input, setRoomIdInput] = useState("2");
  const [_room_input, setRoomPost] = useState({
    type: "",
    owner: "",
    owner_id: "",
    price_per_day: "",
  });

  const [_room, setRoom] = useState({});
  const [_error, setError] = useState({});

  function _handleApiResponse(response) {
    if (response.error) {
      setError(response.error);
    } else {
      setRoom(response);
    }
  }

  function _handleCreateRoomButtonPress() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(_room_input),
    };
    fetch(ROOM_API_URL, requestOptions)
      .then((response) => response.json())
      .then(_handleApiResponse);
  }

  function _handleGetAllReviewsButtonPress() {}

  function _handleRateRoomButtonPress() {}

  function _handleReviewRoomButtonPress() {}

  function _handleGetRoomButtonPress() {
    /**navigate Screen con los detalles del room pasandole
     * el resultado del fetch?
     * Pero hacer un screen por cada opcion me parece mucho
     * Mejor hacer un componente y poner todos en un solo screen
     */
    //navigation.navigate("GetRoom", { url: ROOM_API_URL });
    fetch(MOCK_URL + _room_id_input)
      .then((response) => response.json())
      .then(_handleApiResponse);
  }

  function _handleGetRoomReviewButtonPress() {}

  function _handleGetRoomRatingButtonPress() {}

  function _handleGoBackButtonPress() {
    navigation.navigate("Home");
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text>Seleccione alguna de las opciones a continuacion</Text>
      </View>
      <Separator />
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
          </View>
        </View>
      </View>
      <Separator />
      <View style={styles.footerContainer}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity>
            <Text
              style={styles.footerButtonText}
              onPress={_handleGoBackButtonPress}
            >
              GO TO HOME
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row" }}>
          {Object.entries(_room).map(([key, value]) => {
            return (
              <View key={key}>
                <Text>{value} </Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10,
  },
  headerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    borderColor: colors.pinkBg,
    borderWidth: 1,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
  },
  bodyContainer: {
    //flexGrow: 1,
    backgroundColor: colors.white,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
  buttonsContainer: {
    justifyContent: "flex-end",
  },
  footerContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.white,
    borderColor: colors.pinkBg,
    borderWidth: 1,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
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
    marginVertical: 4,
    borderBottomColor: colors.separator,
    //borderWidth: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  buttonImage: {
    width: 50,
    height: 50,
  },
  footerButtonText: {
    paddingHorizontal: 10,
    fontSize: fonts.semi,
    borderWidth: 1,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
});

export default RoomsScreen;

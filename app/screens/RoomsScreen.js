import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import BnbBubbleView from "../components/BnbBubbleView";
import BnbButton from "../components/BnbButton";
import BnbMainView from "../components/BnbMainView";

import colors from "../config/colors";
import fonts from "../config/fonts";

import Separator from "../helpers/Separator";
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

  function _handleReviewRoomButtonPress() {
    navigation.navigate("ReviewRoom");
  }

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
    <BnbMainView>
      <BnbBubbleView>
        <Text>Seleccione alguna de las opciones a continuacion</Text>
      </BnbBubbleView>
      <Separator style={styles.noSeparatorLine} />
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
      <Separator style={styles.noSeparatorLine} />
      <BnbBubbleView>
        <BnbButton onPress={_handleGoBackButtonPress} title={"Go to Home"} />
        <View style={{ flexDirection: "row" }}>
          {Object.entries(_room).map(([key, value]) => {
            return (
              <View key={key}>
                <Text>{value} </Text>
              </View>
            );
          })}
        </View>
      </BnbBubbleView>
    </BnbMainView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10,
  },

  bodyContainer: {
    backgroundColor: colors.white,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonText: {
    fontSize: fonts.big,
  },
  noSeparatorLine: {
    borderBottomWidth: 0,
  },
  buttonImage: {
    width: 50,
    height: 50,
  },
});

export default RoomsScreen;

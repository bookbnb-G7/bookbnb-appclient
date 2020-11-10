import React, { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import BnbBodyView from "../components/BnbBodyView";
import BnbMainView from "../components/BnbMainView";
import BnbRoomPreview from "../components/BnbRoomPreview";
import fonts from "../config/fonts";
import Separator from "../helpers/Separator";

function SearchResultRooms(props) {
  const url = "http://bookbnb-appserver.herokuapp.com/rooms/1";
  const [_room, setRoom] = useState({});

  const [_error, setError] = useState(null);

  const _handleApiResponse = (response) => {
    /**No es un solo room, es un array de rooms */
    setRoom(response);
  };

  /**Component did mount */
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then(
        (response) => {
          _handleApiResponse(response);
        },
        (error) => {
          setError(error);
        }
      );
  }, []);

  if (_error) {
    return (
      <View style={styles.loading}>
        <Text> Error: {_error.message}</Text>
      </View>
    );
  } else {
    return (
      <BnbMainView>
        <Separator></Separator>
        <BnbBodyView>
          <Text style={styles.infoText}>Mas de 300 lugares para alojarse</Text>
          <Separator></Separator>
          <BnbRoomPreview room={_room}></BnbRoomPreview>
          <BnbRoomPreview room={_room}></BnbRoomPreview>
        </BnbBodyView>
      </BnbMainView>
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  infoText: {
    fontSize: fonts.semi,
    alignSelf: "center",
    justifyContent: "center",
  },
});

export default SearchResultRooms;

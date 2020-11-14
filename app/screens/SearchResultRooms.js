import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import BnbBodyView from "../components/BnbBodyView";
import BnbMainView from "../components/BnbMainView";
import BnbRoomPreview from "../components/BnbRoomPreview";
import fonts from "../config/fonts";
import Separator from "../helpers/Separator";

function SearchResultRooms(props) {
  const url = "http://bookbnb-appserver.herokuapp.com/rooms/1";
  const [_room, setRoom] = useState({
    rooms: [
      {
        type: "Dpto",
        owner: "Agus",
        owner_id: 99,
        price_per_day: 100,
        id: 1,
        created_at: "string",
        updated_at: "string",
      },

      {
        type: "Casa",
        owner: "Agus",
        owner_id: 40,
        price_per_day: 200,
        id: 2,
        created_at: "string",
        updated_at: "string",
      },
    ],
  });

  const [_error, setError] = useState(null);

  const _handleApiResponse = (response) => {
    /**No es un solo room, es un array de rooms */
    setRoom(response);
  };

  /**Component did mount */
  /**useEffect(() => {
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
**/
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
          <Text style={styles.infoText}>
            Encontramos {_room.rooms.length} lugares para alojarse
          </Text>
          <Separator></Separator>
          <ScrollView>
            {_room.rooms.map((item, index) => (
              <View key={item.id}>
                <BnbRoomPreview room={item}></BnbRoomPreview>
              </View>
            ))}
          </ScrollView>
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

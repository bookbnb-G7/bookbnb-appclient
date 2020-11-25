import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import BnbBodyView from "../components/BnbBodyView";
import BnbMainView from "../components/BnbMainView";
import BnbRoomPreview from "../components/BnbRoomPreview";
import fonts from "../config/fonts";
import Separator from "../components/Separator";

function SearchResultRooms(props) {
  const [_rooms, setRooms] = useState({});
  const [_error, setError] = useState(null);
  const [_is_loaded, setIsLoaded] = useState(false);
  const URL_ROOMS = "http://bookbnb-appserver.herokuapp.com/rooms/";

  useEffect(() => {
    fetch(URL_ROOMS)
      .then((response) => response.json())
      .then(
        (response) => {
          setRooms(response);
          setIsLoaded(true);
        },
        (error) => {
          setError(error);
          setIsLoaded(true);
        }
      );
  }, []);

  if (!_is_loaded) {
    return (
      <View style={styles.loading}>
        <Text>Cargando...</Text>
      </View>
    );
  } else if (_error) {
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
            Encontramos {_rooms.rooms.length} lugares para alojarse
          </Text>
          <Separator></Separator>
          <ScrollView>
            {_rooms.rooms.map((item, index) => (
              <View key={item.id}>
                <BnbRoomPreview
                  navigation={props.navigation}
                  room={item}
                ></BnbRoomPreview>
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

import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import BnbSecureStore from "../../classes/BnbSecureStore";
import BnbLoading from "../../components/BnbLoading";
import BnbMainView from "../../components/BnbMainView";
import BnbRoomPreview from "../../components/BnbRoomPreview";
import colors from "../../config/colors";
import fonts from "../../config/fonts";
import constants from "../../constant/constants";
import urls from "../../constant/urls";
import httpGetTokenRequest from "../../helpers/httpGetTokenRequest";

function ProfileRoomsScreen(props) {
  const [storedUser, setStoredUser] = useState();
  const [_rooms, setRooms] = useState({ amount: 0, rooms: [] });
  const [_is_loading, setIsLoading] = useState(true);
  const [_error, setError] = useState("");

  const _handleApiResponse = (rooms) => {
    setRooms(rooms);
    setIsLoading(false);
  };

  const _handleApiError = (error) => {
    setError(error);
    setIsLoading(false);
  };

  useEffect(() => {
    BnbSecureStore.read(constants.CACHE_USER_KEY).then((user) => {
      setStoredUser(user);
      httpGetTokenRequest(
        "GET",
        urls.URL_ME + "/rooms",
        { "x-access-token": user.auth_token },
        _handleApiResponse,
        _handleApiError
      );
    });
  }, []);

  if (_is_loading) {
    return <BnbLoading text="Cargando tus habitaciones..."></BnbLoading>;
  }

  return (
    <BnbMainView>
      {_error == "" && (
        <View style={styles.centerContainer}>
          <Text style={styles.titleText}>
            Tienes {_rooms.amount} habitaciones
          </Text>
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
        </View>
      )}
      {_error != "" && (
        <View>
          <Text style={{ color: colors.error }}>{_error.message}</Text>
        </View>
      )}
    </BnbMainView>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    alignItems: "center",
  },
  titleText: {
    fontSize: fonts.big,
  },
});

export default ProfileRoomsScreen;

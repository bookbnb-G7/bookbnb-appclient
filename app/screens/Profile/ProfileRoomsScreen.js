import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import BnbSecureStore from "../../classes/BnbSecureStore";
import BnbBodyView from "../../components/BnbBodyView";
import BnbError from "../../components/BnbError";
import BnbLoading from "../../components/BnbLoading";
import BnbMainView from "../../components/BnbMainView";
import BnbRoomPreview from "../../components/BnbRoomPreview";
import colors from "../../config/colors";
import fonts from "../../config/fonts";
import bnbStyleSheet from "../../constant/bnbStyleSheet";
import constants from "../../constant/constants";
import urls from "../../constant/urls";
import httpGetTokenRequest from "../../helpers/httpGetTokenRequest";

function ProfileRoomsScreen({ navigation }) {
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
    return function cleanup() {
      setError(undefined);
    };
  }, []);

  if (_error) {
    return <BnbError>{_error.message}</BnbError>;
  }

  if (_is_loading) {
    return <BnbLoading text="Cargando tus habitaciones..."></BnbLoading>;
  }

  return (
    <BnbMainView style={styles.mainContainer}>
      <Text style={bnbStyleSheet.headerText}>Tus publicaciones</Text>
      <BnbBodyView>
        <ScrollView>
          <Text style={{ ...bnbStyleSheet.subHeaderText }}>
            Tienes {_rooms.amount}{" "}
            {_rooms.amount === 1 ? "habitacion" : "habitaciones"}
          </Text>
          <View style={styles.roomsContainer}>
            {_rooms.rooms.map((item, index) => (
              <View key={item.id} style={styles.roomPreviewContainer}>
                <BnbRoomPreview
                  navigation={navigation}
                  room={item}
                  me_id={storedUser.userData.id}
                />
              </View>
            ))}
          </View>
        </ScrollView>
      </BnbBodyView>
    </BnbMainView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.redAirBNB,
    paddingHorizontal: 5,
    alignItems: "center",
  },
  subHeaderWhite: {
    alignSelf: "center",
    color: "white",
  },
  roomPreviewContainer: {
    alignSelf: "center",
    width: "90%",
  },
  roomsContainer: {
    width: "100%",
    alignSelf: "center",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
});

export default ProfileRoomsScreen;

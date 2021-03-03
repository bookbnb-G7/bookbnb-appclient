import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import BnbSecureStore from "../../classes/BnbSecureStore";
import BnbLoading from "../../components/BnbLoading";
import BnbMainView from "../../components/BnbMainView";
import BnbBookingPreview from "../../components/BnbBookingPreview";
import Separator from "../../components/Separator";
import colors from "../../config/colors";
import fonts from "../../config/fonts";
import constants from "../../constant/constants";
import urls from "../../constant/urls";
import httpGetTokenRequest from "../../helpers/httpGetTokenRequest";
import { ScrollView } from "react-native-gesture-handler";
import bnbStyleSheet from "../../constant/bnbStyleSheet";
import BnbBodyView from "../../components/BnbBodyView";
import BnbError from "../../components/BnbError";

/**Aca deberia aparecer una lista con todos los rooms del usuario y
 * que indique si estos tienen o no un booking esperando a ser aceptado/rechazado */
function ProfileBookingsScreen({ navigation }) {
  const [_bookings, setBookings] = useState();
  const [_is_loading, setIsLoading] = useState(true);
  const [_error, setError] = useState("");
  const [storedUser, setStoredUser] = useState();

  const _handleApiResponse = (data) => {
    setBookings(data);
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
        urls.URL_ME + "/bookings",
        { "x-access-token": user.auth_token },
        _handleApiResponse,
        _handleApiError
      );
    });
  }, []);

  if (_error) {
    return (
      <BnbError>
        {" "}
        Hubo un error al cargar las reservas: {_error.message}{" "}
      </BnbError>
    );
  }
  if (_is_loading) {
    return <BnbLoading text="Cargando reservas..."></BnbLoading>;
  } else {
    return (
      <BnbMainView>
        <BnbBodyView>
          <ScrollView>
            <Text style={bnbStyleSheet.headerTextBlack}>
              Tienes {_bookings.made.bookings.length} reservas hechas
            </Text>
            <View>
              {storedUser &&
                _bookings.made.bookings.map((item, index) => (
                  <View key={item.id}>
                    <Text>{item.room_id}</Text>
                    <BnbBookingPreview
                      navigation={navigation}
                      booking_id={item.id}
                      room_id={item.room_id}
                      auth_token={storedUser.auth_token}
                    />
                  </View>
                ))}
            </View>
            <Separator />
            <Text style={bnbStyleSheet.headerTextBlack}>
              Tienes {_bookings.received.bookings.length} solicitudes de reserva
            </Text>
            <View>
              {_bookings.received.bookings.map((item, index) => (
                <View key={item.id}>
                  <BnbBookingPreview
                    navigation={navigation}
                    booking_id={item.id}
                    room_id={item.room_id}
                    auth_token={storedUser.auth_token}
                  />
                  <Separator />
                </View>
              ))}
            </View>
          </ScrollView>
        </BnbBodyView>
      </BnbMainView>
    );
  }
}

const styles = StyleSheet.create({});

export default ProfileBookingsScreen;

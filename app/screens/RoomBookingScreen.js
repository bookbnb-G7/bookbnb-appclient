import React, { useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import BnbSecureStore from "../classes/BnbSecureStore";
import BnbButton from "../components/BnbButton";
import BnbLoading from "../components/BnbLoading";
import BnbMainView from "../components/BnbMainView";
import fonts from "../config/fonts";
import styling from "../config/styling";
import urls from "../constant/urls";
import httpGetTokenRequest from "../helpers/httpGetTokenRequest";
import httpPostTokenRequest from "../helpers/httpPostTokenRequest";

function RoomBookingScreen(props) {
  const { booking_id } = props.route.params;

  const [storedUser, setStoredUser] = useState();
  const [_booking, setBooking] = useState();
  const [_is_loading, setIsLoading] = useState(true);
  const [_error, setError] = useState("");

  const _handleApiResponse = (data) => {
    setBooking(data);
    setIsLoading(false);
  };

  const _handleApiError = (error) => {
    setError(error);
    setIsLoading(false);
  };

  const _handleBookingResponse = (data) => {
    setIsLoading(false);
  };

  const _handleAcceptBooking = () => {
    setIsLoading(true);
    setError("");
    httpPostTokenRequest(
      "POST",
      urls.URL_BOOKINGS + "/" + booking_id + "/accept",
      { "x-access-token": storedUser.auth_token },
      _handleBookingResponse
    );
  };

  const _handleRejectBooking = () => {
    setIsLoading(true);
    setError("");
    httpPostTokenRequest(
      "POST",
      urls.URL_BOOKINGS + "/" + booking_id + "/reject",
      { "x-access-token": storedUser.auth_token },
      _handleBookingResponse
    );
  };

  const showBookingStatus = (state) => {
    return (
      <View>
        {state === 1 && <Text style={styles.redText}>Pendiente</Text>}
        {state === 2 && <Text style={styles.greenText}>Aceptado</Text>}
      </View>
    );
  };

  useEffect(() => {
    BnbSecureStore.read(constants.CACHE_USER_KEY).then((user) => {
      setStoredUser(user);
      httpGetTokenRequest(
        "GET",
        urls.URL_BOOKINGS + "/" + booking_id,
        {},
        _handleApiResponse,
        _handleApiError
      );
    });
  }, []);

  if (_is_loading) {
    <BnbLoading></BnbLoading>;
  } else {
    return (
      <BnbMainView>
        <Text>Detalles de la reserva</Text>
        <View>{showBookingStatus(_booking.state)}</View>
        <Text style={styles.bookingInfoText}>Desde: {_booking.date_from}</Text>
        <Text style={styles.bookingInfoText}>Hasta: {_booking.date_to}</Text>
        <Text style={styles.bookingInfoText}>
          Estado de la reserva: {_booking.booking_status}
        </Text>
        <BnbButton
          style={styles.greenText}
          title="Confirmar reserva"
          onPress={_handleAcceptBooking}
        ></BnbButton>
        <BnbButton
          style={styles.redText}
          title="Rechazar reserva"
          onPress={_handleRejectBooking}
        ></BnbButton>
        {_error != "" && <Text style={styles.redText}>{_error}</Text>}
      </BnbMainView>
    );
  }
}

const styles = StyleSheet.create({
  roomImage: {
    width: "100%",
    height: 200,
    borderRadius: styling.mediumCornerRadius,
  },
  bookingInfoText: {
    fontWeight: "bold",
    fontSize: fonts.big,
  },
  redText: {
    color: "red",
  },
  greenText: {
    color: "green",
  },
});

export default RoomBookingScreen;

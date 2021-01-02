import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
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
  const [_booking, setBooking] = useState();
  const [_is_loading, setIsLoading] = useState(true);
  const [storedUser, setStoredUser] = useState();

  const _handleApiResponse = (data) => {
    setBooking(data);
    setIsLoading(false);
  };

  const _handleBookingResponse = (data) => {
    setIsLoading(false);
  };

  const _handleAcceptBooking = () => {
    setIsLoading(true);
    httpPostTokenRequest(
      "POST",
      urls.URL_ROOMS +
        "/" +
        roomBooking.room_id +
        "/bookings/" +
        roomBooking.booking_id +
        "/accept",
      { "x-access-token": storedUser.auth_token },
      _handleBookingResponse
    );
  };

  const _handleRejectBooking = () => {
    setIsLoading(true);
    httpPostTokenRequest(
      "POST",
      urls.URL_ROOMS +
        "/" +
        roomBooking.room_id +
        "/bookings/" +
        roomBooking.booking_id +
        "/reject",
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
        urls.URL_ROOMS +
          "/" +
          roomBooking.room_id +
          "/bookings/" +
          roomBooking.booking_id,
        {},
        _handleApiResponse
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
        <Text style={styles.bookingInfoText}>
          Desde: {_booking.date_begins}
        </Text>
        <Text style={styles.bookingInfoText}>Hasta: {_booking.date_ends}</Text>
        <Text style={styles.bookingInfoText}>
          Cantidad de personas: {_booking.amount_of_people}
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

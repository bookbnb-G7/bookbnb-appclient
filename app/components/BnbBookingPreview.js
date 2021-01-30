import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import fonts from "../config/fonts";
import styling from "../config/styling";
import urls from "../constant/urls";
import getUrlFromPhotos from "../helpers/getUrlFromPhotos";
import httpGetTokenRequest from "../helpers/httpGetTokenRequest";
import BnbButton from "./BnbButton";
import BnbImageSlider from "./BnbImageSlider";

const BnbBookingPreview = ({ navigation, booking_id }) => {
  const [_booking, setBooking] = useState();
  const [_photos_urls, setPhotos] = useState([]);
  const [_is_loading, setIsLoading] = useState(true);
  const [_error, setError] = useState();

  const _handleGoToBookingDetails = () => {
    navigation.navigate("RoomBooking", { booking_id: _booking.id });
  };

  /**TODO ver porq carajo recibe un state=undefined */
  const ShowBookingStatus = ({ state }) => {
    return (
      <View>
        {state === 1 && <Text style={styles.orangeText}>Pendiente</Text>}
        {state === 2 && <Text style={styles.greenText}>Aceptado</Text>}
        {state === 3 && <Text style={styles.redText}>Rechazado</Text>}
        {state === 1 && (
          <BnbButton title="Ver reserva" onPress={_handleGoToBookingDetails} />
        )}
      </View>
    );
  };

  const _handleImagePress = () => {};

  useEffect(() => {
    httpGetTokenRequest("GET", urls.URL_BOOKINGS + "/" + booking_id, {})
      .then((booking) => {
        setBooking(booking);
        return httpGetTokenRequest(
          "GET",
          urls.URL_ROOMS + "/" + booking.room_id + "/photos",
          {}
        );
      })
      .then((photos) => {
        setPhotos(getUrlFromPhotos(photos.room_photos));
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  if (_is_loading) {
    return <Text>Cargando...</Text>;
  }
  if (_error) {
    return <Text>{_error.message}</Text>;
  }
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity onPress={_handleImagePress}>
        <View style={styles.roomImageContainer}>
          <BnbImageSlider images={_photos_urls} />
        </View>
        <View style={styles.roomDescriptionContainer}>
          <ShowBookingStatus state={_booking.state} />
          <Text style={styles.bookingInfoText}>
            Desde: {_booking.date_from}
          </Text>
          <Text style={styles.bookingInfoText}>Hasta: {_booking.date_to}</Text>
          <Text style={styles.bookingInfoText}>
            Estado de reserva: {_booking.booking_status}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    //flex: 1,
    justifyContent: "center",
    marginVertical: styling.separator,
  },
  roomImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    //borderWidth: 1,
  },
  roomImage: {
    width: "100%",
    height: 200,
    borderRadius: styling.mediumCornerRadius,
  },
  roomDescriptionContainer: {
    //flex: 1,
    //borderWidth: 1,
    marginVertical: styling.separator,
  },
  roomReviewScore: {},
  roomTitleText: {
    fontSize: fonts.big,
  },
  bookingInfoText: {
    fontWeight: "bold",
    fontSize: fonts.big,
  },
  redText: {
    color: "red",
  },
  orangeText: {
    color: "orange",
  },
  greenText: {
    color: "green",
  },
});

export default BnbBookingPreview;

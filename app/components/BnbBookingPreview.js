import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import bnbStyleSheet from "../constant/bnbStyleSheet";
import constants from "../constant/constants";
import urls from "../constant/urls";
import getUrlFromPhotos from "../helpers/getUrlFromPhotos";
import httpGetTokenRequest from "../helpers/httpGetTokenRequest";
import BnbButton from "./BnbButton";
import BnbError from "./BnbError";
import BnbImageSlider from "./BnbImageSlider";
import BnbLoadingText from "./BnbLoadingText";
import RoomPreview from "./RoomPreview";

const BnbBookingPreview = ({ navigation, booking_id, room_id, auth_token }) => {
  const [_booking, setBooking] = useState();
  const [_photos_urls, setPhotos] = useState([]);
  const [_room, setRoom] = useState(null);
  const [_is_loading, setIsLoading] = useState(true);
  const [_error, setError] = useState();

  const _handleGoToBookingDetails = () => {
    navigation.navigate("RoomBooking", { booking_id: _booking.id });
  };

  const ShowBookingStatus = ({ status }) => {
    const showButton =
      status === constants.BOOKING_STATUS_PENDING ||
      status === constants.BOOKING_STATUS_ACCEPTED;

    return (
      <View>
        <View style={styles.bookingStatusContainer}>
          <Text style={bnbStyleSheet.normalText}>Estado de reserva: </Text>
          {status === constants.BOOKING_STATUS_PENDING && (
            <Text
              style={{ ...bnbStyleSheet.normalText, ...{ color: "orange" } }}
            >
              Pendiente
            </Text>
          )}
          {status === constants.BOOKING_STATUS_ACCEPTED && (
            <Text
              style={{ ...bnbStyleSheet.normalText, ...{ color: "green" } }}
            >
              Aceptado
            </Text>
          )}
          {status === constants.BOOKING_STATUS_REJECTED && (
            <Text style={{ ...bnbStyleSheet.normalText, ...{ color: "red" } }}>
              Rechazado
            </Text>
          )}
        </View>
        {showButton && (
          <BnbButton title="Ver reserva" onPress={_handleGoToBookingDetails} />
        )}
      </View>
    );
  };

  useEffect(() => {
    let is_focused = true;
    httpGetTokenRequest("GET", urls.URL_BOOKINGS + "/" + booking_id, {})
      .then((booking) => {
        if (is_focused) {
          setBooking(booking);
        }
        return httpGetTokenRequest(
          "GET",
          urls.URL_ROOMS + "/" + booking.room_id + "/photos",
          {}
        );
      })
      .then((photos) => {
        if (is_focused) {
          setPhotos(getUrlFromPhotos(photos.room_photos));
        }
        return httpGetTokenRequest("GET", urls.URL_ROOMS + "/" + room_id, {
          "x-access-token": auth_token,
        });
      })
      .then((room) => {
        if (is_focused) {
          setRoom(room);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        if (is_focused) {
          setError(error);
          setIsLoading(false);
        }
      });
    return function cleanup() {
      is_focused = false;
    };
  }, []);

  if (_is_loading) {
    return <BnbLoadingText>Cargando reserva...</BnbLoadingText>;
  }
  if (_error) {
    return <BnbError>Error al cargar la reserva: {_error.message}</BnbError>;
  }
  return (
    <View style={bnbStyleSheet.roomPreviewContainer}>
      <View style={styles.roomImageContainer}>
        <BnbImageSlider images={_photos_urls} />
      </View>
      {_room && <RoomPreview room={_room}></RoomPreview>}
      <View>
        <View style={styles.bookingDatesContainer}>
          <Text style={bnbStyleSheet.mediumText}>
            Desde: {_booking.date_from}
          </Text>
          <Text style={bnbStyleSheet.mediumText}>
            Hasta: {_booking.date_to}
          </Text>
        </View>
        {_booking && <ShowBookingStatus status={_booking.booking_status} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  roomImageContainer: {
    alignItems: "center",
  },
  bookingDatesContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  bookingStatusContainer: {
    flexDirection: "row",
    alignSelf: "center",
  },
});

export default BnbBookingPreview;

import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import BnbSecureStore from "../classes/BnbSecureStore";
import BnbButton from "../components/BnbButton";
import BnbLoading from "../components/BnbLoading";
import BnbMainView from "../components/BnbMainView";
import BnbBodyView from "../components/BnbBodyView";
import fonts from "../config/fonts";
import styling from "../config/styling";
import bnbStyleSheet from "../constant/bnbStyleSheet";
import constants from "../constant/constants";
import urls from "../constant/urls";
import httpGetTokenRequest from "../helpers/httpGetTokenRequest";
import httpPostTokenRequest from "../helpers/httpPostTokenRequest";
import BnbError from "../components/BnbError";
import Separator from "../components/Separator";
import BnbRoomInfo from "../components/BnbRoomInfo";
import { ScrollView } from "react-native-gesture-handler";

function RoomBookingScreen({ route, navigation }) {
  const { booking_id } = route.params;

  const [storedUser, setStoredUser] = useState();
  const [_booking, setBooking] = useState();
  const [_room, setRoom] = useState();
  const [_is_loading, setIsLoading] = useState(true);
  const [_error, setError] = useState();

  const [_is_owner, setIsOwner] = useState(false);

  const _handleApiError = (error) => {
    setError(error);
    setIsLoading(false);
  };

  const _handleBookingResponse = (response) => {
    fetchBookingData(storedUser);
  };

  const _handleAcceptBooking = () => {
    setIsLoading(true);
    httpPostTokenRequest(
      "POST",
      urls.URL_BOOKINGS + "/" + booking_id + "/accept",
      {},
      {
        "Content-Type": "application/json",
        "x-access-token": storedUser.auth_token,
      },
      _handleBookingResponse,
      _handleApiError
    );
  };

  const _handleRejectBooking = () => {
    setIsLoading(true);
    httpPostTokenRequest(
      "POST",
      urls.URL_BOOKINGS + "/" + booking_id + "/reject",
      {},
      {
        "Content-Type": "application/json",
        "x-access-token": storedUser.auth_token,
      },
      _handleBookingResponse,
      _handleApiError
    );
  };

  const _handleReviewUser = () => {
    /**Si soy el dueño de la room eso significa que el booking es de un guest
     * caso contario soy un guest calificando a un host
     */
    navigation.navigate("UserReview", {
      is_guest: _is_owner,
      reviewed_id: _is_owner ? _booking.booker_id : _booking.room_owner_id,
    });
  };

  const ShowBookingStatus = ({ status }) => {
    return (
      <View>
        <Text style={styles.bookingInfoText}>Estado de reserva:</Text>
        {status === constants.BOOKING_STATUS_PENDING && (
          <Text style={styles.orangeText}>Pendiente</Text>
        )}
        {status === constants.BOOKING_STATUS_ACCEPTED && (
          <Text style={styles.greenText}>Aceptado</Text>
        )}
      </View>
    );
  };

  const fetchBookingData = async (user) => {
    httpGetTokenRequest("GET", urls.URL_BOOKINGS + "/" + booking_id, {}).then(
      (booking) => {
        setBooking(booking);
        if (booking.room_owner_id === user.userData.id) {
          setIsOwner(true);
        }
        setIsLoading(false);
      },
      (error) => {
        setError(error);
        setIsLoading(false);
      }
    );
  };

  const fetchRoomData = async (room_id) => {
    httpGetTokenRequest("GET", urls.URL_ROOMS + "/" + room_id).then(
      (room) => {
        setRoom(room);
      },
      (error) => {
        setError(error);
        setIsLoading(false);
      }
    );
  };

  useEffect(() => {
    BnbSecureStore.read(constants.CACHE_USER_KEY).then((user) => {
      setStoredUser(user);
      fetchBookingData(user);
    });
  }, []);

  useEffect(() => {
    if (_booking) {
      fetchRoomData(_booking.room_id);
    }
  }, [_booking]);

  if (_error) {
    return <BnbError>{_error.message}</BnbError>;
  }

  if (_is_loading) {
    return <BnbLoading></BnbLoading>;
  } else {
    return (
      <BnbMainView>
        <ScrollView>
          <BnbBodyView>
            <Text style={bnbStyleSheet.headerTextBlack}>
              Detalles de la reserva
            </Text>
            {_room && storedUser && (
              <BnbRoomInfo
                room={_room}
                me_id={storedUser.userData.id}
                navigation={navigation}
              />
            )}
            <Separator />
            <Text style={bnbStyleSheet.headerTextBlack}>Reserva</Text>
            <Text style={styles.bookingInfoText}>
              Desde: {_booking.date_from}
            </Text>
            <Text style={styles.bookingInfoText}>
              Hasta: {_booking.date_to}
            </Text>
            {_booking && <ShowBookingStatus status={_booking.booking_status} />}
            {_is_owner &&
              _booking.booking_status === constants.BOOKING_STATUS_PENDING && (
                <View>
                  <BnbButton
                    buttonStyle={{
                      ...bnbStyleSheet.bnbButton,
                      backgroundColor: "green",
                      borderColor: "green",
                    }}
                    style={bnbStyleSheet.bnbButtonText}
                    title="Confirmar reserva"
                    onPress={_handleAcceptBooking}
                  ></BnbButton>
                  <BnbButton
                    buttonStyle={bnbStyleSheet.bnbButton}
                    style={bnbStyleSheet.bnbButtonText}
                    title="Rechazar reserva"
                    onPress={_handleRejectBooking}
                  ></BnbButton>
                </View>
              )}
            {_booking.booking_status === constants.BOOKING_STATUS_ACCEPTED && (
              <View style={styles.reviewUserContainer}>
                <Text style={bnbStyleSheet.headerTextBlack}>
                  Deja tu reseña
                </Text>
                <BnbButton
                  buttonStyle={bnbStyleSheet.bnbButton}
                  style={bnbStyleSheet.bnbButtonText}
                  title="Crear reseña"
                  onPress={_handleReviewUser}
                />
              </View>
            )}
          </BnbBodyView>
        </ScrollView>
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
    fontSize: fonts.big,
  },
  redText: {
    fontSize: fonts.big,
    color: "red",
  },
  orangeText: {
    fontSize: fonts.big,
    color: "orange",
  },
  greenText: {
    fontSize: fonts.big,
    color: "green",
  },
});

export default RoomBookingScreen;

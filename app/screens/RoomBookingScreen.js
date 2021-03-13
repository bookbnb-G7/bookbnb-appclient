import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import BnbSecureStore from "../classes/BnbSecureStore";
import BnbButton from "../components/BnbButton";
import BnbLoading from "../components/BnbLoading";
import BnbMainView from "../components/BnbMainView";
import BnbBodyView from "../components/BnbBodyView";
import bnbStyleSheet from "../constant/bnbStyleSheet";
import constants from "../constant/constants";
import urls from "../constant/urls";
import httpGetTokenRequest from "../helpers/httpGetTokenRequest";
import httpPostTokenRequest from "../helpers/httpPostTokenRequest";
import BnbError from "../components/BnbError";
import Separator from "../components/Separator";
import BnbRoomInfo from "../components/BnbRoomInfo";
import { ScrollView } from "react-native-gesture-handler";
import RoomRating from "../components/RoomRating";
import RoomReviews from "../components/RoomReviews";
import BnbBookerInfo from "../components/BnbBookerInfo";

function RoomBookingScreen({ route, navigation }) {
  const { booking_id } = route.params;

  const [storedUser, setStoredUser] = useState();
  const [_booking, setBooking] = useState();
  const [_room, setRoom] = useState();
  const [_is_loading, setIsLoading] = useState(true);
  const [_error, setError] = useState();

  const [_can_review, setCanReview] = useState();
  const [_is_owner, setIsOwner] = useState(false);

  const _handleApiError = (error) => {
    setError(error);
    setIsLoading(false);
  };

  const _handleApiResponse = () => {
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
    navigation.navigate("ReviewUser", {
      is_guest: _is_owner,
      reviewed_id: _is_owner ? _booking.booker_id : _booking.room_owner_id,
    });
  };

  const ShowBookingStatus = ({ status }) => {
    return (
      <View style={styles.bookingStatusContainer}>
        <Text style={bnbStyleSheet.mediumText}>Estado de reserva:</Text>
        {status === constants.BOOKING_STATUS_PENDING && (
          <Text style={{ ...bnbStyleSheet.normalText, ...{ color: "orange" } }}>
            Pendiente
          </Text>
        )}
        {status === constants.BOOKING_STATUS_ACCEPTED && (
          <Text style={{ ...bnbStyleSheet.normalText, ...{ color: "green" } }}>
            {" "}
            Aceptado
          </Text>
        )}
        {status === constants.BOOKING_STATUS_REJECTED && (
          <Text style={{ ...bnbStyleSheet.normalText, ...{ color: "red" } }}>
            {" "}
            Rechazado
          </Text>
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
    httpGetTokenRequest("GET", urls.URL_ROOMS + "/" + room_id, {
      "x-access-token": storedUser.auth_token,
    }).then(
      (room) => {
        setRoom(room);
      },
      (error) => {
        setError(error);
        setIsLoading(false);
      }
    );
  };

  const _handleRateRoomButtonPress = (quantity) => {
    if (quantity !== 0) {
      setIsLoading(true);
      httpPostTokenRequest(
        "POST",
        urls.URL_ROOMS + "/" + _room.id + "/ratings",
        {
          rating: quantity,
        },

        {
          "Content-Type": "application/json",
          "x-access-token": storedUser.auth_token,
        },
        _handleApiResponse,
        _handleApiError
      );
    } else {
      alert("Puntaje no puede ser 0");
    }
  };

  useEffect(() => {
    BnbSecureStore.read(constants.CACHE_USER_KEY).then((user) => {
      setStoredUser(user);
      fetchBookingData(user);
    });
  }, []);

  useEffect(() => {
    if (_booking && storedUser) {
      fetchRoomData(_booking.room_id);
    }
  }, [_booking, storedUser]);

  /**Determino si la fecha hoy supera a la fecha de finalizacion de la estadia para habilitar
   * el review
   */
  useEffect(() => {
    if (_booking) {
      const today = new Date();
      const date_end = new Date(_booking.date_to);
      setCanReview(today > date_end);
    }
  }, [_booking]);

  if (_error) {
    return <BnbError>{_error.message}</BnbError>;
  }

  if (_is_loading) {
    return <BnbLoading text="Cargando reserva..."></BnbLoading>;
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
                auth_token={storedUser.auth_token}
                navigation={navigation}
              />
            )}
            <Separator />
            <View>
              <View style={styles.bookingDatesContainer}>
                <Text style={bnbStyleSheet.mediumText}>
                  Desde: {_booking.date_from}
                </Text>
                <Text style={bnbStyleSheet.mediumText}>
                  Hasta: {_booking.date_to}
                </Text>
              </View>
              {storedUser && (
                <View style={{ alignSelf: "center" }}>
                  <BnbBookerInfo
                    booker_id={_booking.booker_id}
                    me_id={storedUser.userData.id}
                    navigation={navigation}
                  />
                </View>
              )}
              {_booking && (
                <ShowBookingStatus status={_booking.booking_status} />
              )}
            </View>
            {_is_owner &&
              _booking.booking_status === constants.BOOKING_STATUS_PENDING && (
                <View>
                  <Separator />
                  <BnbButton
                    buttonStyle={{
                      ...bnbStyleSheet.bnbButton,
                      backgroundColor: "green",
                      borderColor: "green",
                    }}
                    style={bnbStyleSheet.bnbButtonText}
                    title="Confirmar reserva"
                    onPress={_handleAcceptBooking}
                  />
                  <BnbButton
                    buttonStyle={bnbStyleSheet.bnbButton}
                    style={bnbStyleSheet.bnbButtonText}
                    title="Rechazar reserva"
                    onPress={_handleRejectBooking}
                  />
                </View>
              )}
            {_booking.booking_status === constants.BOOKING_STATUS_ACCEPTED && (
              <View>
                <Separator />
                <Text style={bnbStyleSheet.headerTextBlack}>
                  Deja tu reseña al {_is_owner ? "inquilino" : "anfitrión"}
                </Text>
              </View>
            )}
            {_booking.booking_status === constants.BOOKING_STATUS_ACCEPTED &&
              _can_review && (
                <View>
                  <View style={styles.reviewUserContainer}>
                    <BnbButton
                      buttonStyle={bnbStyleSheet.bnbButton}
                      style={bnbStyleSheet.bnbButtonText}
                      title="Crear reseña"
                      onPress={_handleReviewUser}
                    />
                  </View>
                  <View>
                    {_room && (
                      <RoomReviews
                        me_id={storedUser.userData.id}
                        room_id={_room.id}
                        is_owner={_is_owner}
                        token={storedUser.auth_token}
                        read_only={false}
                        navigation={navigation}
                      />
                    )}
                    <RoomRating
                      is_owner={_is_owner}
                      onRateRoom={_handleRateRoomButtonPress}
                    />
                  </View>
                </View>
              )}
            {_booking.booking_status === constants.BOOKING_STATUS_ACCEPTED &&
              !_can_review && (
                <View>
                  <Text style={bnbStyleSheet.normalText}>
                    Para poder dar una reseña debe finaliza el periodo de
                    estadia
                  </Text>
                </View>
              )}
          </BnbBodyView>
        </ScrollView>
      </BnbMainView>
    );
  }
}

const styles = StyleSheet.create({
  bookingDatesContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    height: 20,
  },
  bookingStatusContainer: {
    flexDirection: "row",
    alignSelf: "center",
  },
});

export default RoomBookingScreen;

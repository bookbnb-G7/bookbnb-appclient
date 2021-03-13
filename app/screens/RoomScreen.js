import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Calendar } from "react-native-calendars";
import { Overlay } from "react-native-elements";
import BnbBodyView from "../components/BnbBodyView";
import BnbButton from "../components/BnbButton";
import BnbMainView from "../components/BnbMainView";
import colors from "../config/colors";
import constants from "../constant/constants";
import Separator from "../components/Separator";
import httpPostTokenRequest from "../helpers/httpPostTokenRequest";
import urls from "../constant/urls";
import BnbSecureStore from "../classes/BnbSecureStore";
import httpGetTokenRequest from "../helpers/httpGetTokenRequest";
import BnbLoading from "../components/BnbLoading";
import bnbStyleSheet from "../constant/bnbStyleSheet";
import RoomReviews from "../components/RoomReviews";
import RoomComments from "../components/RoomComments";
import BnbAlert from "../components/BnbAlert";
import formatDate from "../helpers/formatDate";
import BnbRoomInfo from "../components/BnbRoomInfo";
import BnbError from "../components/BnbError";
import BookingDatePicker from "./BookingDatePicker";

function RoomScreen({ route, navigation }) {
  const room_id = route.params?.room_id;

  const [_room, setRoom] = useState();
  const [storedUser, setStoredUser] = useState();
  const [_is_owner, setIsOwner] = useState();
  const [_is_loading, setIsLoading] = useState(true);
  const [_error, setError] = useState();

  const [_bookings, setBookings] = useState();
  const [_owner, setOwner] = useState();
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const _handleRoomDetailsButtonPress = () => {
    navigation.navigate("RoomDetails", { room_id: _room.id });
  };

  const _confirmRoomBooking = (date_from, date_to) => {
    setIsLoading(true);
    httpPostTokenRequest(
      "POST",
      urls.URL_BOOKINGS,
      {
        room_id: room_id,
        date_from: date_from,
        date_to: date_to,
      },
      {
        "Content-Type": "application/json",
        "x-access-token": storedUser.auth_token,
      }
    ).then(
      (response) => {
        setIsLoading(false);
        BnbAlert(
          "Reserva",
          "Solicitud de reserva realizada con exito",
          "Entendido"
        );
      },
      (error) => {
        setIsLoading(false);
        BnbAlert(
          "Reserva",
          `Ocurrio un problema al intentar reservar la habitación: Fondos insuficientes`,
          "Entendido"
        );
      }
    );
  };

  const _handleRoomBooking = () => {
    toggleOverlay();
    if (!route.params.searchForm) {
      Alert.alert(
        "Reserva",
        "Debe elegir una fecha de Check-in y otra de Check-out"
      );
      return;
    }
    let date_from = formatDate(route.params.searchForm.dateBegin);
    let date_to = formatDate(route.params.searchForm.dateEnd);
    Alert.alert(
      "Reservar Alojamiento",
      `Desea reservar el alojamiento desde ${date_from} al ${date_to}, por el monto de ` +
        _room.price_per_day +
        " ether por dia?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Confirmar Reserva",
          onPress: () => {
            _confirmRoomBooking(date_from, date_to);
          },
        },
      ]
    );
  };

  const fetchRoomData = async () => {
    return httpGetTokenRequest("GET", urls.URL_ROOMS + "/" + room_id, {
      "x-access-token": storedUser.auth_token,
    }).then(
      (room) => {
        setRoom(room);
        return Promise.resolve(room);
      },
      (error) => {
        setIsLoading(false);
        setError(error);
        return Promise.reject(null);
      }
    );
  };

  useEffect(() => {
    BnbSecureStore.read(constants.CACHE_USER_KEY).then((storedUser) => {
      setStoredUser(storedUser);
    });
  }, []);

  useEffect(() => {
    if (storedUser) {
      fetchRoomData().then(
        (room) => {
          setIsOwner(storedUser.userData.id === room.owner_uuid);
          httpGetTokenRequest(
            "GET",
            urls.URL_USERS + "/" + room.owner_uuid,
            {}
          ).then(
            (owner) => {
              setOwner(owner);
              setIsLoading(false);
              httpGetTokenRequest(
                "GET",
                urls.URL_BOOKINGS +
                  "?" +
                  new URLSearchParams({ roomId: room.id }),
                {}
              ).then(
                (bookings) => {
                  let markedDates = {};
                  for (let i = 0; i < bookings.amount; i++) {
                    markedDates[bookings.bookings[i]["date_from"]] = {
                      startingDay: true,
                      textColor: "#d9e1e8",
                    };
                    markedDates[bookings.bookings[i]["date_to"]] = {
                      endingDay: true,
                      textColor: "#d9e1e8",
                    };
                  }
                  setBookings(markedDates);
                },
                (error) => {
                  console.log("bookings error");
                }
              );
            },
            (error) => {
              console.log("owner error");
            }
          );
        },
        (error) => {
          console.log("room error");
        }
      );
    }
  }, [route.params.room_id, storedUser]);

  if (_error) {
    return <BnbError>Error al carga la publicación: {_error.message}</BnbError>;
  }

  if (_is_loading || !storedUser) {
    return <BnbLoading text={"Cargando habitacion..."} />;
  } else {
    return (
      <BnbMainView>
        <ScrollView keyboardShouldPersistTaps="always">
          <BnbBodyView style={styles.bodyView}>
            {_room && storedUser && (
              <BnbRoomInfo
                room={_room}
                me_id={storedUser.userData.id}
                auth_token={storedUser.auth_token}
                navigation={navigation}
                onChange={fetchRoomData}
              />
            )}
            <RoomReviews
              me_id={storedUser.userData.id}
              room_id={room_id}
              is_owner={_is_owner}
              token={storedUser.auth_token}
              read_only={true}
              navigation={navigation}
            />
            <RoomComments
              room_id={room_id}
              me_id={storedUser.userData.id}
              is_owner={_is_owner}
              token={storedUser.auth_token}
              navigation={navigation}
            />
            <Separator style={{ width: "90%", marginTop: 15 }} />
            <Text style={bnbStyleSheet.headerTextBlack}>Disponibilidad</Text>
            <View style={styles.calendarContainer}>
              <Calendar
                minDate={Date()}
                markedDates={_bookings}
                markingType={"period"}
                enableSwipeMonths={true}
                style={{
                  borderWidth: 1,
                  borderColor: "#d9e1e8",
                  borderRadius: 10,
                }}
                theme={{
                  todayTextColor: colors.redAirBNBSoft,
                  arrowColor: colors.redAirBNBSoft,
                }}
              />
            </View>
            {!_is_owner && (
              <View>
                <BnbButton
                  style={styles.center}
                  title="Reservar"
                  onPress={() =>
                    navigation.navigate("BookingDatePicker", {
                      room_id: _room.id,
                      room_price: _room.price_per_day,
                    })
                  }
                />
              </View>
            )}
            <Separator />
            {_is_owner && _room && (
              <BnbButton
                style={styles.center}
                title="Detalles"
                onPress={_handleRoomDetailsButtonPress}
              />
            )}
          </BnbBodyView>
        </ScrollView>
      </BnbMainView>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    alignSelf: "center",
  },
  bodyView: {
    paddingTop: 0,
  },
  calendarContainer: {
    paddingHorizontal: 10,
  },
});

export default RoomScreen;

import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Calendar } from "react-native-calendars";
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

function RoomScreen({ route, navigation }) {
  const room_id = route.params?.room_id;

  const [_room, setRoom] = useState();
  const [storedUser, setStoredUser] = useState();
  const [_is_owner, setIsOwner] = useState();
  const [_is_loading, setIsLoading] = useState(true);
  const [_error, setError] = useState();

  const [_bookings, setBookings] = useState();
  const [_owner, setOwner] = useState();

  const _handleRoomDetailsButtonPress = () => {
    navigation.navigate("RoomDetails", { room_id: _room.id });
  };

  const _handleRoomBooking = () => {
    let date_from = formatDate(route.params.searchForm.dateBegin);
    let date_to = formatDate(route.params.searchForm.dateEnd);
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
        setError(error);
      }
    );
  };

  const fetchRoomData = async () => {
    httpGetTokenRequest("GET", urls.URL_ROOMS + "/" + room_id, {})
      .then((room) => {
        setRoom(room);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  /**Fetcheo los datos del room cada vez que el parametro cambia */
  useEffect(() => {
    fetchRoomData();
  }, [route.params?.room_id]);

  useEffect(() => {
    BnbSecureStore.read(constants.CACHE_USER_KEY).then((storedUser) => {
      setStoredUser(storedUser);
    });
  }, []);

  useEffect(() => {
    /**Debe coincidir el id del Secure Store con el id del dueño del cuarto*/
    if (_room && storedUser) {
      setIsOwner(storedUser.userData.id === _room.owner_uuid);
    }
  }, [_room, storedUser]);

  /**Fetcheo el owner aca para no tocar la cadena de promesa del room fetch*/
  useEffect(() => {
    /**Fetcheo el owner si es la primera vez o cambio el id respecto a la ultima vez*/
    if (_room && (!_owner || _owner.id !== _room.owner_uuid)) {
      setIsLoading(true);
      httpGetTokenRequest(
        "GET",
        urls.URL_USERS + "/" + _room.owner_uuid,
        {}
      ).then(
        (owner) => {
          setOwner(owner);
          setIsLoading(false);
        },
        (error) => {
          setError(error);
          setIsLoading(false);
        }
      );
    }
  }, [_room]);

  //Fetchear bookings y convertirlos al formato que pide el componente del calendario
  useEffect(() => {
    if (_room) {
      httpGetTokenRequest(
        "GET",
        urls.URL_BOOKINGS + "?" + new URLSearchParams({ roomId: _room.id }),
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
          setError(error);
        }
      );
    }
  }, [_room]);

  if (_is_loading || !storedUser) {
    return <BnbLoading text={"Cargando habitacion..."} />;
  } else {
    return (
      <BnbMainView>
        <ScrollView>
          <BnbBodyView>
            {_room && storedUser && (
              <BnbRoomInfo
                room={_room}
                me_id={storedUser.userData.id}
                navigation={navigation}
              />
            )}
            <RoomReviews
              room_id={room_id}
              is_owner={_is_owner}
              token={storedUser.auth_token}
              read_only={true}
            />
            <RoomComments
              room_id={room_id}
              me_id={storedUser.userData.id}
              is_owner={_is_owner}
              token={storedUser.auth_token}
              navigation={navigation}
            />
            <Text style={bnbStyleSheet.headerTextBlack}>Disponibilidad</Text>
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
            {!_is_owner && (
              <View>
                <BnbButton
                  style={styles.center}
                  title="Reservar"
                  onPress={_handleRoomBooking}
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
});

export default RoomScreen;

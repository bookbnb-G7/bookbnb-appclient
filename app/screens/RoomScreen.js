import React, { useEffect, useState } from "react";
import { Alert, Dimensions, Image, StyleSheet, Text, View } from "react-native";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";
import { Calendar } from "react-native-calendars";
import BnbBodyView from "../components/BnbBodyView";
import BnbButton from "../components/BnbButton";
import BnbMainView from "../components/BnbMainView";
import colors from "../config/colors";
import fonts from "../config/fonts";
import styling from "../config/styling";
import constants from "../constant/constants";
import Separator from "../components/Separator";
import httpPostTokenRequest from "../helpers/httpPostTokenRequest";
import urls from "../constant/urls";
import BnbSecureStore from "../classes/BnbSecureStore";
import httpGetTokenRequest from "../helpers/httpGetTokenRequest";
import BnbImageSlider from "../components/BnbImageSlider";
import BnbLoading from "../components/BnbLoading";
import getUrlFromPhotos from "../helpers/getUrlFromPhotos";
import bnbStyleSheet from "../constant/bnbStyleSheet";
import BnbIconText from "../components/BnbIconText";
import RoomReviews from "../components/RoomReviews";
import RoomRating from "../components/RoomRating";
import getAverage from "../helpers/getAverage";
import RoomComments from "../components/RoomComments";
import BnbAlert from "../components/BnbAlert";

function RoomScreen({ route, navigation }) {
  const room_id = route.params?.room_id;

  const [_room, setRoom] = useState();
  const [_is_owner, setIsOwner] = useState();
  const [_is_loading, setIsLoading] = useState(true);
  const [storedUser, setStoredUser] = useState();

  const [_average_rating, setAverageRating] = useState(0);

  const [_error, setError] = useState();
  const [_photos_url, setPhotosUrl] = useState([]);

  const [_bookings, setBookings] = useState();
  const [_owner, setOwner] = useState();

  const _handleApiResponse = (data) => {
    fetchRoomRatings();
    setIsLoading(false);
  };

  const _handleApiError = (error) => {
    setError(error);
    setIsLoading(false);
  };

  const _handleRoomDetailsButtonPress = () => {
    navigation.navigate("RoomDetails", { room_id: _room.id });
  };

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

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

  const _handleRoomOwnerPress = () => {
    if (_owner.id == storedUser.userData.id) {
      navigation.navigate("ProfileStack", { screen: "Profile" });
    } else {
      navigation.navigate("User", { user_id: _owner.id });
    }
  };

  /**Defino funcion fetch ratings */
  const fetchRoomRatings = async () => {
    httpGetTokenRequest(
      "GET",
      urls.URL_ROOMS + "/" + room_id + "/ratings",
      {}
    ).then(
      (ratings) => {
        setAverageRating(getAverage(ratings.ratings, "rating"));
      },
      (error) => {}
    );
  };

  /**Fetcheo los datos del room */
  const fetchRoomData = async () => {
    httpGetTokenRequest(
      "GET",
      urls.URL_ROOMS + "/" + room_id,
      {},
      null,
      _handleApiError
    )
      .then((room) => {
        setRoom(room);
        return httpGetTokenRequest(
          "GET",
          urls.URL_ROOMS + "/" + room_id + "/photos",
          {},
          null,
          _handleApiError
        );
      })
      .then((photos) => {
        setPhotosUrl(getUrlFromPhotos(photos.room_photos));
        fetchRoomRatings().then(() => {
          setIsLoading(false);
        });
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchRoomData();
  }, [route.params?.room_id]);

  useEffect(() => {
    BnbSecureStore.read(constants.CACHE_USER_KEY).then((storedUser) => {
      setStoredUser(storedUser);
    });
  }, []);

  useEffect(() => {
    /**Debe coincider el id del Secure Store con el id del dueño del cuarto*/
    if (_room && storedUser) {
      setIsOwner(storedUser.userData.id === _room.owner_uuid);
    }
  }, [_room, storedUser]);

  /**Fetcheo el owner aca para no tocar la cadena de promesa del room fetch */
  useEffect(() => {
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

  // Fetchear bookings y convertirlos al formato que pide el componente del calendario
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
    return <BnbLoading text={"Cargando habitacion..."}></BnbLoading>;
  } else {
    return (
      <BnbMainView>
        <ScrollView>
          <BnbBodyView>
            {_room && (
              <Text style={bnbStyleSheet.headerTextBlack}>
                {_room.description}
              </Text>
            )}
            <View style={styles.imageSlider}>
              <BnbImageSlider images={_photos_url} width={200}></BnbImageSlider>
            </View>
            <View style={styles.roomInfoContainer}>
              <Text style={bnbStyleSheet.subHeaderText}>Puntuacion</Text>
              <Text>
                {isNaN(_average_rating)
                  ? "Sin puntaje"
                  : _average_rating + " de 5 estrellas"}
              </Text>
              {_room && (
                <View>
                  <Text style={bnbStyleSheet.subHeaderText}>
                    Precio por dia
                  </Text>
                  <Text>{_room.price_per_day}</Text>
                  <Text style={bnbStyleSheet.subHeaderText}>Categoria</Text>
                  <Text>{_room.type}</Text>
                  <Text style={bnbStyleSheet.subHeaderText}>Dueño</Text>
                </View>
              )}
              {_owner && (
                <TouchableOpacity onPress={_handleRoomOwnerPress}>
                  <BnbIconText logo={_owner.photo}>
                    {_owner.firstname} {_owner.lastname}
                  </BnbIconText>
                </TouchableOpacity>
              )}
            </View>
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
  roomImage: {
    width: "100%",
    height: 200,
    borderRadius: styling.mediumCornerRadius,
  },
  imageSlider: {
    flex: 1,
    alignItems: "center",
  },
  roomInfoContainer: {
    marginVertical: styling.separator,
  },
  roomTitleText: {
    fontSize: fonts.big,
  },
  priceText: {
    fontSize: fonts.big,
    fontWeight: fonts.bold,
  },
  reviewsContainer: {},
  writeAReviewContainer: {},
  titleText: {
    alignSelf: "center",
    color: "black",
  },
  textInput: {
    borderRadius: styling.smallCornerRadius,
    backgroundColor: colors.graySoft,
    borderWidth: 1,
    marginVertical: styling.separator,
  },
  center: {
    alignSelf: "center",
  },
});

export default RoomScreen;

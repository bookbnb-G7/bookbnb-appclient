import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import BnbSecureStore from "../classes/BnbSecureStore";
import colors from "../config/colors";
import fonts from "../config/fonts";
import styling from "../config/styling";
import constants from "../constant/constants";
import urls from "../constant/urls";
import httpGetTokenRequest from "../helpers/httpGetTokenRequest";
import BnbButton from "./BnbButton";
import BnbLoading from "./BnbLoading";

const BnbBookingPreview = (navigation, roomBooking) => {
  const room_image = require("../assets/bookbnb_1.png");
  const [_booking, setBooking] = useState();
  const [_is_loading, setIsLoading] = useState(true);

  const _handleApiResponse = (data) => {
    setBooking(data);
    setIsLoading(false);
  };

  const showBookingStatus = (state) => {
    return (
      <View>
        {state === 1 && <Text style={styles.redText}>Pendiente</Text>}

        {state === 2 && <Text style={styles.greenText}>Aceptado</Text>}
        {state === 1 && (
          <BnbButton
            title="Ver reserva"
            onPress={_handleGoToBookingDetails}
          ></BnbButton>
        )}
      </View>
    );
  };

  const _handleGoToBookingDetails = () => {};

  const _handleImagePress = () => {};

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
    return <BnbLoading text="Cargando Reserva"></BnbLoading>;
  } else {
    return (
      <View style={styles.mainContainer}>
        <TouchableOpacity onPress={_handleImagePress}>
          <View style={styles.roomImageContainer}>
            <Image source={room_image} style={styles.roomImage}></Image>
          </View>
          <View style={styles.roomDescriptionContainer}>
            <View>{showBookingStatus(_booking.state)}</View>
            <Text style={styles.bookingInfoText}>
              Desde: {_booking.date_begins}
            </Text>
            <Text style={styles.bookingInfoText}>
              Hasta: {_booking.date_ends}
            </Text>
            <Text style={styles.bookingInfoText}>
              Cantidad de personas: {_booking.amount_of_people}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
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
  greenText: {
    color: "green",
  },
});

export default BnbBookingPreview;

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
import BnbImageSlider from "./BnbImageSlider";
import BnbLoading from "./BnbLoading";

const BnbBookingPreview = ({ navigation, booking }) => {
  const showBookingStatus = (state) => {
    return (
      <View>
        {state === 1 && <Text style={styles.redText}>Pendiente</Text>}
        {state === 2 && <Text style={styles.greenText}>Aceptado</Text>}
        {state === 1 && (
          <BnbButton title="Ver reserva" onPress={_handleGoToBookingDetails} />
        )}
      </View>
    );
  };

  const _handleGoToBookingDetails = () => {
    navigation.navigate("RoomBooking", { booking_id: booking.id });
  };

  const _handleImagePress = () => {};

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity onPress={_handleImagePress}>
        <View style={styles.roomImageContainer}>
          <BnbImageSlider />
        </View>
        <View style={styles.roomDescriptionContainer}>
          <View>{showBookingStatus(booking.state)}</View>
          <Text style={styles.bookingInfoText}>Desde: {booking.date_from}</Text>
          <Text style={styles.bookingInfoText}>Hasta: {booking.date_to}</Text>
          <Text style={styles.bookingInfoText}>
            Estado de reserva: {booking.booking_status}
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
  greenText: {
    color: "green",
  },
});

export default BnbBookingPreview;

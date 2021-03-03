import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import colors from "../config/colors";
import fonts from "../config/fonts";
import bnbStyleSheet from "../constant/bnbStyleSheet";
import urls from "../constant/urls";
import getAverage from "../helpers/getAverage";
import httpGetTokenRequest from "../helpers/httpGetTokenRequest";
import BnbError from "./BnbError";
import BnbLoadingText from "./BnbLoadingText";

function RoomPreview({ room_id, token }) {
  const [_room, setRoom] = useState(null);
  const [_error, setError] = useState(null);
  const [_is_loading, setIsLoading] = useState(null);

  useEffect(() => {
    httpGetTokenRequest("GET", urls.URL_ROOMS + "/" + room_id, {
      "x-access-token": token,
    }).then((room) => {
      setRoom(room),
        (error) => {
          setError(error);
        };
    });
  }, [room_id]);

  if (_is_loading) {
    return <BnbLoadingText>Cargando...</BnbLoadingText>;
  }

  if (_error) {
    return <BnbError>{_error.message}</BnbError>;
  }

  return (
    <View style={styles.roomDescriptionContainer}>
      <Text style={styles.roomTitleText}>{_room.title}</Text>
      <View style={styles.profileAndRoomDetalisContainer}>
        <View style={styles.roomInfoContainer}>
          <Text style={bnbStyleSheet.normalText}>{_room.type}</Text>
          <Text style={bnbStyleSheet.normalText}>
            Precio por dia: ${_room.price_per_day}
          </Text>
        </View>
        <BnbFormBubbleInfo
          iconName="star"
          iconColor={colors.golden}
          iconSize={24}
          text={
            _ratings.ratings.length > 0
              ? getAverage(_ratings.ratings, "rating")
              : "-"
          }
          textStyle={styles.ratingText}
          style={styles.ratingContainer}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  roomDescriptionContainer: {
    marginVertical: styling.separator,
    marginHorizontal: 10,
  },
  roomTitleText: {
    fontFamily: "Raleway_700Bold",
    fontSize: 22,
  },
  roomPriceText: {
    fontWeight: "bold",
    fontSize: fonts.big,
  },
  ratingText: {
    color: colors.black,
    fontSize: 20,
  },
  ratingContainer: {
    marginVertical: 0,
    paddingHorizontal: 0,
    flex: 1,
  },
  roomTypeText: {
    fontSize: fonts.big,
  },
  profileAndRoomDetalisContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  roomInfoContainer: {
    flex: 3,
  },
});

export default RoomPreview;

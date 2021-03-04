import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import colors from "../config/colors";
import fonts from "../config/fonts";
import styling from "../config/styling";
import bnbStyleSheet from "../constant/bnbStyleSheet";
import urls from "../constant/urls";
import getAverage from "../helpers/getAverage";
import httpGetTokenRequest from "../helpers/httpGetTokenRequest";
import BnbError from "./BnbError";
import BnbFormBubbleInfo from "./BnbFormBubbleInfo";
import BnbLoadingText from "./BnbLoadingText";

function RoomPreview({ room, ratings }) {
  /**ratings es opcional */
  return (
    <View style={styles.roomDescriptionContainer}>
      <Text style={styles.roomTitleText}>{room.title}</Text>
      <View style={styles.profileAndRoomDetalisContainer}>
        <View style={styles.roomInfoContainer}>
          <Text style={bnbStyleSheet.normalText}>{room.type}</Text>
          <Text style={bnbStyleSheet.normalText}>
            Precio por dia: ${room.price_per_day}
          </Text>
        </View>
        {ratings && (
          <BnbFormBubbleInfo
            iconName="star"
            iconColor={colors.golden}
            iconSize={24}
            text={
              ratings.ratings.length > 0
                ? getAverage(ratings.ratings, "rating")
                : "-"
            }
            textStyle={styles.ratingText}
            style={styles.ratingContainer}
          />
        )}
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

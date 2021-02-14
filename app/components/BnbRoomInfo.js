import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Rating } from "react-native-elements";
import styling from "../config/styling";
import bnbStyleSheet from "../constant/bnbStyleSheet";
import urls from "../constant/urls";
import getAverage from "../helpers/getAverage";
import getUrlFromPhotos from "../helpers/getUrlFromPhotos";
import httpGetTokenRequest from "../helpers/httpGetTokenRequest";
import BnbError from "./BnbError";
import BnbIconText from "./BnbIconText";
import BnbImageSlider from "./BnbImageSlider";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "../config/colors";
import { Divider } from "react-native-elements";
import Separator from "./Separator";
import httpPostTokenRequest from "../helpers/httpPostTokenRequest";
import BnbImage from "./BnbImage";

const BnbRoomInfo = ({ room, me_id, auth_token, navigation }) => {
  const [_average_rating, setAverageRating] = useState(0);
  const [_photos_urls, setPhotosUrls] = useState();
  const [_error, setError] = useState();
  const [_roomOwner, setRoomOwner] = useState();

  const _handleRoomOwnerPress = () => {
    if (_roomOwner.id === me_id) {
      navigation.navigate("ProfileStack", { screen: "Profile" });
    } else {
      navigation.navigate("SearchRooms", {
        screen: "User",
        params: { user_id: _roomOwner.id },
      });
    }
  };

  const _handleAddToFavorites = () => {
    console.log("add to favorites");
    /**httpPostTokenRequest(
      "POST",
      urls.URL_ME + "/favorites",
      { room_id: room.id },
      { "x-access-token": auth_token }
    ).then(
      (response) => {},
      (error) => {
        setError(error);
      }
    );*/
  };

  useEffect(() => {
    httpGetTokenRequest(
      "GET",
      urls.URL_ROOMS + "/" + room.id + "/ratings",
      {}
    ).then(
      (ratings) => {
        setAverageRating(getAverage(ratings.ratings, "rating"));
      },
      (error) => {
        setError(error);
      }
    );
  }, []);

  useEffect(() => {
    httpGetTokenRequest(
      "GET",
      urls.URL_ROOMS + "/" + room.id + "/photos",
      {}
    ).then(
      (photos) => {
        setPhotosUrls(getUrlFromPhotos(photos.room_photos));
      },
      (error) => {
        setError(error);
      }
    );
  }, []);

  useEffect(() => {
    httpGetTokenRequest("GET", urls.URL_USERS + "/" + room.owner_uuid, {}).then(
      (owner) => {
        setRoomOwner(owner);
      },
      (error) => {
        setError(error);
      }
    );
  }, []);

  if (_error) {
    return <BnbError>{_error.message}</BnbError>;
  }

  return (
    <View>
      <View style={styles.imageSlider}>
        {_photos_urls && <BnbImageSlider images={_photos_urls} />}
      </View>
      <View style={styles.roomInfoContainer}>
        <Text style={styles.roomTitleText}>{room.title}</Text>
        {_roomOwner && (
          <View style={styles.typeOwnerContainer}>
            <View style={styles.typeContainer}>
              <Text numberOfLines={1} style={styles.typeText}>
                {room.type} en {room.location.split(",")[0]}
              </Text>
              <View style={styles.inlineTextButton}>
                <Text style={styles.hostedByText}>Hosteado por </Text>
                <TouchableOpacity onPress={_handleRoomOwnerPress}>
                  <Text style={styles.clickableText}>
                    {_roomOwner.firstname}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <BnbImage
              onPress={_handleRoomOwnerPress}
              uri={_roomOwner.photo}
              imageStyle={styles.profilePic}
            />
          </View>
        )}
        {_roomOwner && _roomOwner.id !== me_id && (
          <TouchableOpacity onPress={_handleAddToFavorites}>
            <BnbIconText
              iconName="star"
              style={styles.addToFavoritesContainer}
              textStyle={styles.addToFavoritesText}
              iconStyle={styles.addToFavoritesIcon}
              iconSize={30}
            >
              Agregar a favoritos
            </BnbIconText>
          </TouchableOpacity>
        )}
        <Separator style={{ width: "100%", marginVertical: 10 }} />
        <View style={styles.priceNGuestsContainer}>
          <View style={styles.iconText}>
            <Ionicons name="logo-usd" style={styles.iconStyle} size={15} />
            <Text style={styles.priceText}>{room.price_per_day} </Text>
            <Text style={styles.priceNGuests}>por noche</Text>
          </View>
          <View style={styles.iconText}>
            <Ionicons name="people" style={styles.iconStyle} size={16} />
            <Text style={styles.priceNGuests}>
              {room.capacity} persona{room.capacity > 1 ? "s" : ""}
            </Text>
          </View>
        </View>
        <View styles={styles.ratingContainer}>
          <Text style={styles.priceNGuests}>
            {isNaN(_average_rating) ? "Sin puntaje" : `${_average_rating}/5`}
          </Text>
          <Rating
            imageSize={20}
            minValue={0}
            ratingCount={5}
            ratingImage="star"
            readonly
            startingValue={_average_rating || 0}
            type="star"
          />
        </View>
        <Separator style={{ width: "100%", marginTop: 20 }} />
        <View>
          <Text style={styles.description}>{room.description}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageSlider: {
    flex: 1,
    alignItems: "center",
  },
  roomInfoContainer: {
    paddingHorizontal: 10,
  },
  roomTitleText: {
    fontFamily: "Raleway_700Bold",
    fontSize: 32,
    color: "#46484e",
    paddingTop: 15,
    paddingBottom: 10,
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 60,
  },
  typeOwnerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  typeContainer: {
    justifyContent: "center",
    width: "75%",
  },
  typeText: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: 17,
  },
  hostedByText: {
    fontFamily: "Raleway_400Regular",
    fontSize: 16,
  },
  clickableText: {
    textDecorationLine: "underline",
    fontFamily: "Raleway_400Regular",
    fontSize: 16,
    color: colors.redAirBNB,
  },
  inlineTextButton: {
    flexDirection: "row",
    fontFamily: "Raleway_400Regular",
  },
  priceNGuests: {
    fontFamily: "Raleway_400Regular",
    fontSize: 17,
    color: "#404040",
    alignSelf: "center",
  },
  priceNGuestsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 5,
  },
  iconText: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  iconStyle: {
    alignSelf: "center",
    paddingRight: 5,
  },
  addToFavoritesContainer: {
    alignSelf: "center",
    alignItems: "center",
    height: 30,
  },
  addToFavoritesText: {
    fontFamily: "Raleway_500Medium",
    fontSize: 15,
    color: "yellow",
  },
  addToFavoritesIcon: {
    color: "yellow",
  },
  priceText: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: 17,
  },
  ratingContainer: {
    flex: 1,
    justifyContent: "center",
  },
  description: {
    fontFamily: "Raleway_500Medium",
    fontSize: 15,
    color: "#5f5f5f",
  },
});

export default BnbRoomInfo;

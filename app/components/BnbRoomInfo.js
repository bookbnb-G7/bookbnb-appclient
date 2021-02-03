import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styling from "../config/styling";
import bnbStyleSheet from "../constant/bnbStyleSheet";
import urls from "../constant/urls";
import getAverage from "../helpers/getAverage";
import getUrlFromPhotos from "../helpers/getUrlFromPhotos";
import httpGetTokenRequest from "../helpers/httpGetTokenRequest";
import BnbError from "./BnbError";
import BnbIconText from "./BnbIconText";
import BnbImageSlider from "./BnbImageSlider";

const BnbRoomInfo = ({ room, me_id, navigation }) => {
  const [_average_rating, setAverageRating] = useState(0);
  const [_photos_urls, setPhotosUrls] = useState();
  const [_error, setError] = useState();
  const [_roomOwner, setRoomOwner] = useState();

  const _handleRoomOwnerPress = () => {
    if (_roomOwner.id == me_id) {
      navigation.navigate("ProfileStack", { screen: "Profile" });
    } else {
      navigation.navigate("User", { user_id: _roomOwner.id });
    }
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
      <Text style={bnbStyleSheet.headerTextBlack}>{room.description}</Text>
      <View style={styles.imageSlider}>
        {_photos_urls && <BnbImageSlider images={_photos_urls} width={200} />}
      </View>
      <View style={styles.roomInfoContainer}>
        <Text style={bnbStyleSheet.subHeaderText}>Puntuacion</Text>
        <Text>
          {isNaN(_average_rating)
            ? "Sin puntaje"
            : _average_rating + " de 5 estrellas"}
        </Text>
        <View>
          <Text style={bnbStyleSheet.subHeaderText}>Precio por dia</Text>
          <Text>{room.price_per_day}</Text>
          <Text style={bnbStyleSheet.subHeaderText}>Categoria</Text>
          <Text>{room.type}</Text>
          <Text style={bnbStyleSheet.subHeaderText}>Dueño</Text>
          {_roomOwner && (
            <TouchableOpacity onPress={_handleRoomOwnerPress}>
              <BnbIconText logo={_roomOwner.photo}>
                {_roomOwner.firstname} {_roomOwner.lastname}
              </BnbIconText>
            </TouchableOpacity>
          )}
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
    marginVertical: styling.separator,
  },
});

export default BnbRoomInfo;

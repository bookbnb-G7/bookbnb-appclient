import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import styling from "../config/styling";
import bnbStyleSheet from "../constant/bnbStyleSheet";
import urls from "../constant/urls";
import httpGetTokenRequest from "../helpers/httpGetTokenRequest";
import BnbButton from "./BnbButton";
import BnbError from "../components/BnbError";
import colors from "../config/colors";
import constants from "../constant/constants";
import Separator from "./Separator";
import httpPostTokenRequest from "../helpers/httpPostTokenRequest";
import BnbUserPost from "./BnbUserPost";

/**Se encarga del fetcheo y manejo de las reviews del RoomScreen */
function RoomReviews({
  me_id,
  room_id,
  is_owner,
  token,
  read_only,
  navigation,
}) {
  const [_room_reviews, setRoomReviews] = useState();
  const [_is_loading, setIsLoading] = useState(true);
  const [_error, setError] = useState();
  const [_review_input, setReviewInput] = useState("");

  /**Codigo copiado de RoomComments */
  const _handleUsernameTap = (user_id) => {
    if (user_id == me_id) {
      navigation.navigate("ProfileStack", { screen: "Profile" });
    } else {
      navigation.navigate("SearchRooms", {
        screen: "User",
        params: { user_id: user_id },
      });
    }
  };

  const _handlePostReview = () => {
    if (_review_input != "") {
      setIsLoading(true);
      httpPostTokenRequest(
        "POST",
        urls.URL_ROOMS + "/" + room_id + "/reviews",
        {
          review: _review_input,
        },
        {
          "Content-Type": "application/json",
          "x-access-token": token,
        }
      ).then(
        (response) => {
          fetchRoomReviews();
          setIsLoading(false);
        },
        (error) => {
          setError(error);
          setIsLoading(false);
        }
      );
    } else {
      alert("No puede publicar una reseña vacia");
    }
  };

  const fetchRoomReviews = async () => {
    httpGetTokenRequest(
      "GET",
      urls.URL_ROOMS + "/" + room_id + "/reviews",
      {}
    ).then(
      (reviews) => {
        setRoomReviews(reviews);
        setIsLoading(false);
      },
      (error) => {
        setError(error);
        setIsLoading(false);
      }
    );
  };

  useEffect(() => {
    fetchRoomReviews();
    return function cleanup() {
      setError(undefined);
    };
  }, []);

  if (_error) {
    return <BnbError>{_error.message}</BnbError>;
  }
  if (_is_loading) {
    return <Text>Cargando reviews...</Text>;
  }
  return (
    <View>
      <Separator />
      <Text style={bnbStyleSheet.headerTextBlack}>Reseñas habitación</Text>
      <View style={styles.roomReviewsContainer}>
        {_room_reviews &&
          _room_reviews.reviews.map((item, index) => (
            <View key={item.id}>
              <BnbUserPost
                user_id={item.reviewer_id}
                time={item.date}
                text={item.review}
                onUsernameTap={_handleUsernameTap}
              />
            </View>
          ))}
      </View>
      {!is_owner && !read_only && (
        <View style={styles.writeAReviewContainer}>
          <TextInput
            multiline
            placeholder="Escribe aqui tu reseña"
            maxLength={constants.maxTextLength}
            onChangeText={setReviewInput}
            style={styles.textInput}
          />
          <BnbButton title="Publicar" onPress={_handlePostReview} />
        </View>
      )}
      <Separator />
    </View>
  );
}

const styles = StyleSheet.create({
  roomReviewsContainer: {
    marginLeft: 10,
  },
  writeAReviewContainer: {},
  textInput: {
    borderRadius: styling.smallCornerRadius,
    backgroundColor: colors.graySoft,
    borderWidth: 1,
    marginVertical: styling.separator,
  },
});

export default RoomReviews;

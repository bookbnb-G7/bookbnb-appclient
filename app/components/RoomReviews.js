import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import styling from "../config/styling";
import bnbStyleSheet from "../constant/bnbStyleSheet";
import urls from "../constant/urls";
import httpGetTokenRequest from "../helpers/httpGetTokenRequest";
import BnbButton from "./BnbButton";
import BnbError from "../components/BnbError";
import RoomReview from "./RoomReview";
import colors from "../config/colors";
import constants from "../constant/constants";
import Separator from "./Separator";

/**Se encarga del fetcheo y manejo de las reviews del RoomScreen */
function RoomReviews({ room_id, is_owner, onPostReview }) {
  const [_room_reviews, setRoomReviews] = useState();
  const [_is_loading, setIsLoading] = useState(true);
  const [_error, setError] = useState();
  const [_review_input, setReviewInput] = useState("");

  const _handlePostReview = () => {
    onPostReview(_review_input);
  };
  useEffect(() => {
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
      <View style={styles.roomReviewsContainer}>
        <Text style={bnbStyleSheet.headerTextBlack}>Reseñas</Text>
        {_room_reviews &&
          _room_reviews.reviews.map((item, index) => (
            <View key={item.id}>
              <RoomReview
                reviewer={item.reviewer}
                date={item.date}
                review={item.review}
              ></RoomReview>
            </View>
          ))}
      </View>
      {!is_owner && (
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
    borderWidth: 1,
  },
  writeAReviewContainer: {
    borderWidth: 1,
  },
  textInput: {
    borderRadius: styling.smallCornerRadius,
    backgroundColor: colors.graySoft,
    borderWidth: 1,
    marginVertical: styling.separator,
  },
});

export default RoomReviews;

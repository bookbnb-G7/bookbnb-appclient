import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import BnbSecureStore from "../classes/BnbSecureStore";
import BnbLoading from "../components/BnbLoading";
import BnbMainView from "../components/BnbMainView";
import Separator from "../components/Separator";
import constants from "../constant/constants";
import urls from "../constant/urls";
import httpPostTokenRequest from "../helpers/httpPostTokenRequest";

/**Esta pantalla sirve para tanto Guest como Host e incluye reviews cualitativos y cuantitativos */
function ReviewUserScreen({ route, navigation }) {
  /**is_guest true para reseñar a un guest o false para reseñar un host*/
  const { is_guest, reviewed_id } = route.params;

  const [storedUser, setStoredUser] = useState();
  const [_is_loading, setIsLoading] = useState(true);
  const [_review_text, setReviewText] = useState("");
  const [_rating, setRating] = useState({ quantity: 0 });

  useEffect(() => {
    BnbSecureStore.read(constants.CACHE_USER_KEY).then((user) => {
      setStoredUser(user);
      setIsLoading(false);
    });
  }, []);

  const _handleRatingChange = (counter, offset) => {
    const new_quantity = _rating.quantity + offset;
    setRating((prevState) => ({
      ...prevState,
      quantity: new_quantity,
    }));
  };

  const _handleApiResponse = () => {
    setIsLoading(false);
  };

  const _handlePostReview = () => {
    if (_review_text != "") {
      setIsLoading(true);
      const url =
        urls.URL_USERS + "/" + reviewed_id + is_guest
          ? "/guest_review"
          : "/host_reviews";
      httpPostTokenRequest(
        "POST",
        url,
        {
          review: _review_text,
          reviewer: storedUser.userData.firstname,
          reviewer_id: storedUser.userData.id,
        },
        {
          "Content-Type": "application/json",
          "x-access-token": storedUser.auth_token,
        },
        _handleApiResponse
      );
    } else {
      alert(constants.ERR_EMPTY_REVIEW);
    }
  };

  const _handleRateUserButtonPress = () => {
    if (_rating.quantity !== 0) {
      setIsLoading(true);
      const url =
        urls.URL_USERS + "/" + reviewed_id + is_guest
          ? "/guest_ratings"
          : "/host_ratings";
      httpPostTokenRequest(
        "POST",
        url,
        {
          rating: _rating,
          reviewer: storedUser.userData.firstname,
          reviewer_id: storedUser.userData.id,
        },
        {
          "Content-Type": "application/json",
          "x-access-token": storedUser.auth_token,
        },
        _handleApiResponse
      );
      setRating({ quantity: 0 });
    } else {
      alert(constants.ERR_RATING_ZERO);
    }
  };

  if (_is_loading) {
    return <BnbLoading></BnbLoading>;
  }

  return (
    <BnbMainView>
      <Text>Reseña sobre un usuario</Text>
      <TextInput
        multiline
        placeholder={
          "Escriba una reseña sobre el " + is_guest ? "inquilino" : "dueño"
        }
        style={styles.reviewText}
        value={_review_text}
        onChangeText={setReviewText}
      ></TextInput>
      <BnbButton title="Publicar Reseña" onPress={_handlePostReview} />
      <Separator></Separator>
      <Text>Puntuar a un usuario</Text>
      <View>
        <Counter
          title="Rating"
          onIncrement={_handleRatingChange}
          counter={_rating}
          maxCount={constants.maxRating}
        ></Counter>
        <BnbButton title="Puntuar" onPress={_handleRateUserButtonPress} />
      </View>
    </BnbMainView>
  );
}

const styles = StyleSheet.create({
  titleText: {
    alignSelf: "center",
    color: "black",
  },
  reviewText: {
    borderRadius: styling.smallCornerRadius,
    backgroundColor: colors.graySoft,
    borderWidth: 1,
    marginVertical: styling.separator,
  },
});

export default ReviewUserScreen;

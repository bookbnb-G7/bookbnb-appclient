import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import BnbSecureStore from "../classes/BnbSecureStore";
import BnbLoading from "../components/BnbLoading";
import BnbMainView from "../components/BnbMainView";
import Separator from "../components/Separator";
import constants from "../constant/constants";
import urls from "../constant/urls";
import httpPostTokenRequest from "../helpers/httpPostTokenRequest";
import bnbStyleSheet from "../constant/bnbStyleSheet";
import styling from "../config/styling";
import colors from "../config/colors";
import BnbButton from "../components/BnbButton";
import Counter from "../components/Counter";
import BnbBodyView from "../components/BnbBodyView";

/**Esta pantalla sirve para tanto Guest como Host e incluye reviews cualitativos y cuantitativos */
function ReviewUserScreen({ route, navigation }) {
  /**is_guest true para reseñar a un guest o false para reseñar un host*/
  const { is_guest, reviewed_id } = route.params;

  const [storedUser, setStoredUser] = useState();
  const [_is_loading, setIsLoading] = useState(true);
  const [_review_text, setReviewText] = useState("");
  const [_rating, setRating] = useState({ quantity: 0 });
  const [_error, setError] = useState();

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

  const _handleApiError = (error) => {
    setError(error);
    setIsLoading(false);
  };

  const _handlePostReview = () => {
    if (_review_text != "") {
      setIsLoading(true);
      const url =
        urls.URL_USERS + "/" + reviewed_id + is_guest
          ? "/guest_reviews"
          : "/host_reviews";
      httpPostTokenRequest(
        "POST",
        url,
        {
          review: _review_text,
          reviewer:
            storedUser.userData.firstname + " " + storedUser.userData.lastname,
          reviewer_id: storedUser.userData.id,
        },
        {
          "Content-Type": "application/json",
          "x-access-token": storedUser.auth_token,
        },
        _handleApiResponse,
        _handleApiError
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
          rating: _rating.quantity,
          reviewer:
            storedUser.userData.firstname + " " + storedUser.userData.lastname,
          reviewer_id: storedUser.userData.id,
        },
        {
          "Content-Type": "application/json",
          "x-access-token": storedUser.auth_token,
        },
        _handleApiResponse,
        _handleApiError
      );
      setRating({ quantity: 0 });
    } else {
      alert(constants.ERR_RATING_ZERO);
    }
  };

  if (_error) {
    <Text style={bnbStyleSheet.centerText}>{_error}</Text>;
  }

  if (_is_loading) {
    return <Text style={bnbStyleSheet.centerText}>Cargando...</Text>;
  }

  return (
    <BnbMainView>
      <View style={bnbStyleSheet.centerView}>
        <Text style={bnbStyleSheet.headerTextBlack}>
          Escriba una reseña al {is_guest ? "inquilino" : "dueño"}
        </Text>
      </View>
      <TextInput
        multiline
        style={styles.reviewText}
        value={_review_text}
        onChangeText={setReviewText}
      ></TextInput>
      <BnbButton title="Publicar Reseña" onPress={_handlePostReview} />
      <Text style={bnbStyleSheet.headerTextBlack}>
        Puntuar {is_guest ? "inquilino" : "dueño"}
      </Text>
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
  reviewText: {
    borderRadius: styling.smallCornerRadius,
    backgroundColor: colors.graySoft,
    borderWidth: 1,
    marginVertical: styling.separator,
    padding: 1,
  },
});

export default ReviewUserScreen;

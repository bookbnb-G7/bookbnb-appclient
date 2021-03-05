import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import BnbBodyView from "../../components/BnbBodyView";
import BnbError from "../../components/BnbError";
import BnbLoading from "../../components/BnbLoading";
import BnbMainView from "../../components/BnbMainView";
import urls from "../../constant/urls";
import httpGetTokenRequest from "../../helpers/httpGetTokenRequest";
import bnbStyleSheet from "../../constant/bnbStyleSheet";
import colors from "../../config/colors";
import Separator from "../../components/Separator";
import BnbUserPost from "../../components/BnbUserPost";

function ProfileReviewsScreen({ route, navigation }) {
  const user_id = route.params.user_id;
  const [_hostReviews, setHostReviews] = useState();
  const [_guestReviews, setGuestReviews] = useState();
  const [_is_loading, setIsLoading] = useState(true);
  const [_error, setError] = useState();
  const _handleApiError = (error) => {
    setError(error);
    setIsLoading(false);
  };

  useEffect(() => {
    httpGetTokenRequest(
      "GET",
      urls.URL_USERS + "/" + user_id + "/guest_reviews",
      {}
    )
      .then((guestRatings) => {
        setGuestReviews(guestRatings);
        return httpGetTokenRequest(
          "GET",
          urls.URL_USERS + "/" + user_id + "/host_reviews",
          {}
        );
      })
      .then((hostRatings) => {
        setHostReviews(hostRatings);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  const _handleUsernameTap = () => {};

  /**Si defino un componente a parte renderiza dos veces y no se porque
   * para el BnbUserPost
   */

  if (_error) {
    return <BnbError>{_error.message}</BnbError>;
  }

  if (_is_loading) {
    return <BnbLoading text="Cargando reseñas..."></BnbLoading>;
  }

  return (
    <BnbMainView>
      <BnbBodyView>
        <Text style={bnbStyleSheet.headerTextBlack}>
          Reseñas como anfitrión
        </Text>
        {_hostReviews.reviews.length === 0 && (
          <Text style={bnbStyleSheet.normalText}>
            Todavia no ha recibido ninguna reseña como anfitrión
          </Text>
        )}
        {_hostReviews.reviews.map((item, index) => (
          <View key={item.id}>
            <BnbUserPost
              user_id={item.reviewer_id}
              text={item.review}
              onUsernameTap={_handleUsernameTap}
            />
            {_hostReviews.reviews.length > 1 && <Separator />}
          </View>
        ))}
        <Text style={bnbStyleSheet.headerTextBlack}>
          Reseñas como inquilino
        </Text>
        {_guestReviews.reviews.length === 0 && (
          <Text style={bnbStyleSheet.normalText}>
            Todavia no ha recibido ninguna reseña como inquilino
          </Text>
        )}
        {_guestReviews.reviews.map((item, index) => (
          <View key={item.id}>
            <BnbUserPost
              user_id={item.reviewer_id}
              text={item.review}
              onUsernameTap={_handleUsernameTap}
            />
            {_guestReviews.reviews.length > 1 && <Separator />}
          </View>
        ))}
      </BnbBodyView>
    </BnbMainView>
  );
}

const styles = StyleSheet.create({
  bodyContainer: {
    alignItems: "center",
  },
  reviewContainer: {
    marginLeft: 15,
    paddingLeft: 5,
    marginBottom: 15,
  },
  reviewText: {
    marginLeft: 10,
  },
});

export default ProfileReviewsScreen;

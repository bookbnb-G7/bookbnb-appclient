import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import BnbBodyView from "../../components/BnbBodyView";
import BnbError from "../../components/BnbError";
import BnbLoading from "../../components/BnbLoading";
import BnbMainView from "../../components/BnbMainView";
import urls from "../../constant/urls";
import httpGetTokenRequest from "../../helpers/httpGetTokenRequest";
import bnbStyleSheet from "../../constant/bnbStyleSheet";

function ProfileReviewsScreen({ route, navigation }) {
  const user_id = route.params.user_id;
  const [_hostRatings, setHostRatings] = useState();
  const [_guestRatings, setGuestRatings] = useState();
  const [_is_loading, setIsLoading] = useState(true);
  const [_error, setError] = useState();

  const _handleApiError = (error) => {
    setError(error);
    setIsLoading(false);
  };

  useEffect(() => {
    httpGetTokenRequest(
      "GET",
      urls.URL_USERS + "/" + user_id + "/guest_ratings",
      {},
      null,
      _handleApiError
    )
      .then((guestRatings) => {
        setGuestRatings(guestRatings);
        return httpGetTokenRequest(
          "GET",
          urls.URL_USERS + "/" + user_id + "/host_ratings",
          {},
          null,
          _handleApiError
        );
      })
      .then((hostRatings) => {
        setHostRatings(hostRatings);
        setIsLoading(false);
      });
  }, []);

  if (_error) {
    return <BnbError>{_error.message}</BnbError>;
  }

  if (_is_loading) {
    return <BnbLoading></BnbLoading>;
  }

  return (
    <BnbMainView>
      <BnbBodyView style={styles.bodyContainer}>
        <Text style={bnbStyleSheet.headerTextBlack}>Reviews como Dueño</Text>
        {_hostRatings.ratings.length === 0 && (
          <Text style={bnbStyleSheet.normalText}>
            {" "}
            Todavia no ha recibido ninguna reseña como dueño{" "}
          </Text>
        )}
        {_hostRatings.ratings.map((item, index) => {
          <View key={index}>
            <Text>{item.reviewer}</Text>
            <Text>{item.rating}</Text>
          </View>;
        })}
        <Text style={bnbStyleSheet.headerTextBlack}>Reviews como Huesped</Text>
        {_guestRatings.ratings.length === 0 && (
          <Text style={bnbStyleSheet.normalText}>
            {" "}
            Todavia no ha recibido ninguna reseña como huesped{" "}
          </Text>
        )}
        {_guestRatings.ratings.map((item, index) => {
          <View key={index}>
            <Text>{item.reviewer}</Text>
            <Text>{item.rating}</Text>
          </View>;
        })}
      </BnbBodyView>
    </BnbMainView>
  );
}

const styles = StyleSheet.create({
  bodyContainer: {
    alignItems: "center",
  },
});

export default ProfileReviewsScreen;

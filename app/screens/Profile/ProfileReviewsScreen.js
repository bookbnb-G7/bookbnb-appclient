import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import BnbBodyView from "../../components/BnbBodyView";
import BnbError from "../../components/BnbError";
import BnbLoading from "../../components/BnbLoading";
import BnbMainView from "../../components/BnbMainView";
import urls from "../../constant/urls";
import httpGetTokenRequest from "../../helpers/httpGetTokenRequest";

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
    return <BnbError>{_error}</BnbError>;
  }

  if (_is_loading) {
    return <BnbLoading></BnbLoading>;
  }

  return (
    <BnbMainView>
      <BnbBodyView>
        <Text>Reviews como Dueño</Text>
        {_hostRatings.ratings.map((item, index) => {
          <View key={index}>
            <Text>{item.reviewer}</Text>
            <Text>{item.rating}</Text>
          </View>;
        })}
        <Text>Reviews como Huesped</Text>
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

export default ProfileReviewsScreen;

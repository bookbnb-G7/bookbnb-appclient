import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, StatusBar } from "react-native";
import colors from "../../config/colors";
import fonts from "../../config/fonts";

import Separator from "../../components/Separator";
import BnbMainView from "../../components/BnbMainView";
import BnbBodyView from "../../components/BnbBodyView";
import BnbSecureStore from "../../classes/BnbSecureStore";
import constants from "../../constant/constants";
import BnbButton from "../../components/BnbButton";
import BnbImage from "../../components/BnbImage";
import httpGetTokenRequest from "../../helpers/httpGetTokenRequest";
import urls from "../../constant/urls";
import BnbLoading from "../../components/BnbLoading";
import { color } from "react-native-reanimated";
import { Divider } from "react-native-elements";
import bnbStyleSheet from "../../constant/bnbStyleSheet";
import BnbFormBubbleInfo from "../../components/BnbFormBubbleInfo";
import getAverage from "../../helpers/getAverage";
import { ScrollView } from "react-native-gesture-handler";

/**Este es de solo lectura, generico y debe sevir para cualquier usuario */
function Profile({ route, navigation }) {
  /**user_id es el id del perfil del usuario que queremos ver */
  let user_id = route?.params?.user_id;
  const [user, setUser] = useState();
  const [_is_loading, setIsLoading] = useState(user_id === 0);
  const [_guestRatings, setGuestRatings] = useState();
  const [_hostRatings, setHostRatings] = useState();
  const [_error, setError] = useState();

  const _handleApiResponse = (user) => {
    setUser(user);
    setIsLoading(false);
  };

  const _handleApiError = (error) => {
    setError(error);
    setIsLoading(false);
  };

  const _handleProfileEdit = () => {
    navigation.navigate("ProfileEdit");
  };

  const _handleReviewUser = () => {
    navigation.navigate("ReviewUser", {
      is_guest: false,
      reviewed_id: user.id,
    });
  };

  const _handleProfileReviewsButtonPress = () => {
    navigation.navigate("ProfileReviews");
  };

  useEffect(() => {
    /**Si no me pasaron el user id es porque soy el dueño, asi que obtengo el user_id del dueño */
    BnbSecureStore.read(constants.CACHE_USER_KEY).then((user) => {
      let async_user_id = user_id;
      if (user) {
        async_user_id = user.userData.id;
      }
      httpGetTokenRequest(
        "GET",
        urls.URL_USERS + "/" + async_user_id,
        {},
        _handleApiResponse
      ).then((user) => {
        setUser(user);
        setIsLoading(false);
        httpGetTokenRequest(
          "GET",
          urls.URL_USERS + "/" + async_user_id + "/host_ratings",
          {}
        ).then((hostRatings) => {
          setHostRatings(hostRatings);
          httpGetTokenRequest(
            "GET",
            urls.URL_USERS + "/" + async_user_id + "/guest_ratings",
            {}
          ).then((guestRatings) => {
            setGuestRatings(guestRatings);
          });
        });
      });
    });
  }, []);

  return (
    <BnbMainView>
      <BnbBodyView>
        <ScrollView>
          <View style={styles.userInfoContainer}>
            {user && (
              <BnbImage
                imageStyle={styles.userLogo}
                uri={user.photo}
              ></BnbImage>
            )}

            {user && (
              <Text style={styles.userName}>
                {user.firstname} {user.lastname}
              </Text>
            )}
            {user && <Text style={styles.userName}>{user.email}</Text>}
            <BnbFormBubbleInfo
              iconName="star"
              iconColor={colors.golden}
              iconSize={24}
              text={
                _guestRatings?.ratings.length > 0
                  ? getAverage(_ratings.ratings, "rating")
                  : "-"
              }
              textStyle={{ color: "black" }}
            />
            <BnbFormBubbleInfo
              iconName="star"
              iconColor={colors.golden}
              iconSize={24}
              text={
                _hostRatings?.ratings.length > 0
                  ? getAverage(_ratings.ratings, "rating")
                  : "-"
              }
              textStyle={{ color: "black" }}
            />
          </View>

          <Divider style={bnbStyleSheet.divider} />
          <View style={styles.buttonsContainer}>
            {!user_id && (
              <BnbButton
                title="Editar perfil"
                onPress={_handleProfileEdit}
              ></BnbButton>
            )}
            {!user_id && (
              <BnbButton
                title="Escribir una reseña"
                onPress={_handleReviewUser}
              ></BnbButton>
            )}
            <BnbButton title="Ver reseñas"></BnbButton>
          </View>
        </ScrollView>
      </BnbBodyView>
    </BnbMainView>
  );
}

const styles = StyleSheet.create({
  userInfoContainer: {
    alignItems: "center",
  },
  userLogo: {
    width: 100,
    height: 100,
    backgroundColor: colors.graySoft,
    borderRadius: 50,
  },
  userName: {
    fontSize: fonts.big,
  },
});

export default Profile;

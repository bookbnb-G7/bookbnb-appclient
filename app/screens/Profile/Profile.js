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
import BnbError from "../../components/BnbError";

/**Este es de solo lectura, generico y debe sevir para cualquier usuario */
function Profile({ route, navigation }) {
  /**user_id es el id del perfil del usuario que queremos ver */
  let user_id = route?.params?.user_id;
  const [user, setUser] = useState();
  const [_is_loading, setIsLoading] = useState(user_id === 0);
  const [_guestRatings, setGuestRatings] = useState();
  const [_hostRatings, setHostRatings] = useState();
  const [_error, setError] = useState();

  const [_is_owner, setIsOwner] = useState(false);

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
    navigation.navigate("ProfileReviews", { user_id: user.id });
  };

  const _handleChatButtonPress = () => {
    if (!_is_owner) {
      /**El other_uuid es el del perfil que estoy viendo en este momento */
      navigation.navigate("UserChat", { other_uuid: user.id });
    } else {
      console.error(
        "No puedes chatear contigo mismo, el boton no deberia poder verse en tu propio perfil"
      );
    }
  };

  useEffect(() => {
    /**Si no me pasaron el user id es porque soy el dueño, asi que obtengo el user_id del dueño */
    BnbSecureStore.read(constants.CACHE_USER_KEY)
      .then((user) => {
        let async_user_id = user_id;
        console.log("prop:" + user_id + "vs" + user.userData.id);
        if (!user_id || user_id === user.userData.id) {
          async_user_id = user.userData.id;
          setIsOwner(true);
        }
        httpGetTokenRequest(
          "GET",
          urls.URL_USERS + "/" + async_user_id,
          {},
          null
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
      })
      .catch((error) => {
        setError(error);
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
            <View style={styles.ratingsRow}>
              <BnbFormBubbleInfo
                iconName="star"
                iconColor={colors.golden}
                iconSize={24}
                text={`Host rating: ${
                  _guestRatings?.ratings.length > 0
                    ? getAverage(_ratings.ratings, "rating")
                    : "-"
                }`}
                textStyle={{ color: "black" }}
              />
              <BnbFormBubbleInfo
                iconName="star"
                iconColor={colors.golden}
                iconSize={24}
                text={`Guest rating: ${
                  _hostRatings?.ratings.length > 0
                    ? getAverage(_ratings.ratings, "rating")
                    : "-"
                }`}
                textStyle={{ color: "black" }}
              />
            </View>
            {!_is_owner && (
              <BnbButton title="Mensaje" onPress={_handleChatButtonPress} />
            )}
          </View>
          <Divider style={bnbStyleSheet.divider} />
          {user && (
            <View style={styles.buttonsContainer}>
              {_is_owner && (
                <BnbButton
                  title="Editar perfil"
                  onPress={_handleProfileEdit}
                ></BnbButton>
              )}
              {_is_owner && (
                <BnbButton
                  title="Escribir una reseña"
                  onPress={_handleReviewUser}
                ></BnbButton>
              )}
              {_is_owner && (
                <BnbButton
                  title="Ver reseñas"
                  onPress={_handleProfileReviewsButtonPress}
                ></BnbButton>
              )}
            </View>
          )}
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
  ratingsRow: {
    flexDirection: "row",
  },
});

export default Profile;

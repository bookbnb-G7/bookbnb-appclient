import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, StatusBar } from "react-native";
import colors from "../../config/colors";
import fonts from "../../config/fonts";

import BnbMainView from "../../components/BnbMainView";
import BnbBodyView from "../../components/BnbBodyView";
import BnbSecureStore from "../../classes/BnbSecureStore";
import constants from "../../constant/constants";
import BnbButton from "../../components/BnbButton";
import BnbImage from "../../components/BnbImage";
import httpGetTokenRequest from "../../helpers/httpGetTokenRequest";
import urls from "../../constant/urls";
import BnbLoading from "../../components/BnbLoading";
import { Divider } from "react-native-elements";
import bnbStyleSheet from "../../constant/bnbStyleSheet";
import BnbFormBubbleInfo from "../../components/BnbFormBubbleInfo";
import getAverage from "../../helpers/getAverage";
import { ScrollView } from "react-native-gesture-handler";
import BnbError from "../../components/BnbError";
import ProfileEdit from "./ProfileEdit";
import { useFocusEffect } from "@react-navigation/native";

/**Este es de solo lectura, generico y debe sevir para cualquier usuario */
function Profile({ route, navigation }) {
  /**user_id es el id del perfil del usuario que queremos ver */
  let user_id = route.params?.user_id;
  const [user, setUser] = useState();
  const [_is_loading, setIsLoading] = useState(false);
  const [_guestRatings, setGuestRatings] = useState();
  const [_hostRatings, setHostRatings] = useState();
  const [_error, setError] = useState();
  const [_is_owner, setIsOwner] = useState(false);

  const [_show_info, setShowInfo] = useState(false);

  const _handleGoToOwnerScreen = () => {
    navigation.navigate("ProfileOwner");
  };

  const _handleProfileImagePress = () => {
    navigation.navigate("ImagePick");
  };

  const _handleProfileReviewsButtonPress = () => {
    navigation.navigate(_is_owner ? "ProfileReviews" : "UserReviews", {
      user_id: user.id,
    });
  };

  const _handleChatButtonPress = () => {
    if (!_is_owner) {
      /**El other_uuid es el del perfil que estoy viendo en este momento */
      navigation.navigate("ChatStack", {
        screen: "UserChat",
        params: { other_uuid: user.id },
      });
    } else {
      console.error(
        "No puedes chatear contigo mismo, el boton no deberia poder verse en tu propio perfil"
      );
    }
  };

  const _toggleShowProfileEdit = () => {
    setShowInfo(!_show_info);
  };

  const _handleTextChange = (key, value) => {
    setUser((previous) => ({ ...previous, [key]: value }));
  };

  const fetchUserData = () => {
    BnbSecureStore.read(constants.CACHE_USER_KEY)
      .then((user) => {
        let async_user_id = user_id;
        if (!user_id || user_id == user.userData.id) {
          async_user_id = user.userData.id;
          setIsOwner(true);
        }
        return async_user_id;
      })
      .then((async_user_id) => {
        return httpGetTokenRequest(
          "GET",
          urls.URL_USERS + "/" + async_user_id,
          {}
        );
      })
      .then((user) => {
        setUser(user);
        setIsLoading(false);
        return httpGetTokenRequest(
          "GET",
          urls.URL_USERS + "/" + user.id + "/host_ratings",
          {}
        );
      })
      .then((hostRatings) => {
        setHostRatings(hostRatings);
        return httpGetTokenRequest(
          "GET",
          urls.URL_USERS + "/" + hostRatings.userId + "/guest_ratings",
          {}
        );
      })
      .then((guestRatings) => {
        setGuestRatings(guestRatings);
        setError(null);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, [route.params?.user_id])
  );

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
                onPress={_is_owner ? _handleProfileImagePress : null}
              />
            )}
            {user && (
              <Text style={styles.userName}>
                {user.firstname} {user.lastname}
              </Text>
            )}
            {user && <Text style={styles.userEmail}>{user.email}</Text>}
            <View style={styles.ratingsRow}>
              <BnbFormBubbleInfo
                iconName="star"
                iconColor={colors.golden}
                iconSize={24}
                text={`Host rating: ${
                  _hostRatings?.ratings.length > 0
                    ? getAverage(_hostRatings.ratings, "rating")
                    : "-"
                }`}
                textStyle={{ color: "black" }}
              />
              <BnbFormBubbleInfo
                iconName="star"
                iconColor={colors.golden}
                iconSize={24}
                text={`Guest rating: ${
                  _guestRatings?.ratings.length > 0
                    ? getAverage(_guestRatings.ratings, "rating")
                    : "-"
                }`}
                textStyle={{ color: "black" }}
              />
            </View>
            {!_is_owner && user && (
              <BnbButton title="Mensaje" onPress={_handleChatButtonPress} />
            )}
          </View>
          <Divider style={bnbStyleSheet.divider} />
          {user && (
            <View style={styles.buttonsContainer}>
              <BnbButton
                title="Ver reseñas"
                onPress={_handleProfileReviewsButtonPress}
              />
              {_is_owner && (
                <BnbButton
                  title="Habitaciones y Reservas"
                  onPress={_handleGoToOwnerScreen}
                />
              )}
              {_is_owner && user && (
                <BnbButton
                  title={!_show_info ? "Ver detalles perfil" : "Contraer"}
                  onPress={_toggleShowProfileEdit}
                />
              )}
            </View>
          )}
          {_show_info && user && (
            <ProfileEdit
              me={user}
              navigation={navigation}
              onTextChange={_handleTextChange}
            />
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
    marginTop: 10,
    fontSize: fonts.big,
    fontFamily: "Raleway_700Bold",
  },
  userEmail: {
    color: colors.textSoftBlack,
  },
  ratingsRow: {
    flexDirection: "row",
  },
});

export default Profile;

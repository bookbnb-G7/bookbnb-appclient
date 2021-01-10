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

/**Este es de solo lectura, generico y debe sevir para cualquier usuario */
function Profile({ route, navigation }) {
  /**user_id es el id del perfil del usuario que queremos ver */
  const user_id = route?.params?.user_id ? route.params.user_id : 0;
  const [user, setUser] = useState();
  const [_is_loading, setIsLoading] = useState(user_id === 0);

  const _handleApiResponse = (user) => {
    setUser(user);
    setIsLoading(false);
  };

  const _handleProfileEdit = () => {
    navigation.navigate("ProfileEdit");
  };

  const _handleReviewUser = () => {
    navigation.navigate("ReviewUser", {
      is_guest: false,
      reviewed_id: user_id,
    });
  };

  useEffect(() => {
    if (user_id !== 0) {
      httpGetTokenRequest(
        "GET",
        urls.URL_USERS + "/" + user_id,
        {},
        _handleApiResponse
      );
    }
  }, []);

  useEffect(() => {
    if (user_id === 0) {
      BnbSecureStore.read(constants.CACHE_USER_KEY).then((user) => {
        setUser(user.userData);
        setIsLoading(false);
      });
    }
  }, []);

  return (
    <BnbMainView>
      <BnbBodyView>
        <View style={styles.userInfoContainer}>
          {user && (
            <BnbImage imageStyle={styles.userLogo} uri={user.photo}></BnbImage>
          )}

          {user && (
            <Text style={styles.userName}>
              {user.firstname} {user.lastname}
            </Text>
          )}
          {user && <Text style={styles.userName}>{user.email}</Text>}
        </View>

        <Divider style={bnbStyleSheet.divider} />
        <View style={styles.buttonsContainer}>
          {user_id === 0 && (
            <BnbButton
              title="Editar perfil"
              onPress={_handleProfileEdit}
            ></BnbButton>
          )}
          {user_id === 0 && (
            <BnbButton
              title="Escribir una reseña"
              onPress={_handleReviewUser}
            ></BnbButton>
          )}
        </View>
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

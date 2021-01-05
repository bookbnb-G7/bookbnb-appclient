import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, StatusBar } from "react-native";
import colors from "../../config/colors";
import fonts from "../../config/fonts";

import Separator from "../../components/Separator";
import BnbMainView from "../../components/BnbMainView";
import BnbBodyView from "../../components/BnbBodyView";
import BnbIconText from "../../components/BnbIconText";
import { TouchableOpacity } from "react-native-gesture-handler";
import BnbSecureStore from "../../classes/BnbSecureStore";
import constants from "../../constant/constants";
import BnbButton from "../../components/BnbButton";
import firebase from "../../database/firebase";
import BnbImage from "../../components/BnbImage";
import httpGetTokenRequest from "../../helpers/httpGetTokenRequest";
import urls from "../../constant/urls";
import BnbLoading from "../../components/BnbLoading";
import { color } from "react-native-reanimated";

/**Este es de solo lectura, generico y debe sevir para cualquier usuario */
function Profile({ route, navigation }) {
  /**user_id es el id del perfil del usuario que queremos ver */
  const user_id = route?.params?.user_id ? route.params.user_id : 0;
  const [user, setUser] = useState();
  const [_is_loading, setIsLoading] = useState(true);

  const _handleApiResponse = (user) => {
    setUser(user);
    setIsLoading(false);
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

  const _handleProfileEdit = () => {
    navigation.navigate("ProfileEdit");
  };

  return (
    <BnbMainView
      style={{
        paddingTop: StatusBar.currentHeight,
        backgroundColor: "white",
      }}
    >
      <BnbBodyView>
        <View style={styles.twoColumns}>
          <View style={styles.leftColumn}>
            <View style={styles.logoContainer}>
              {user && (
                <BnbImage
                  imageStyle={styles.userLogo}
                  uri={user ? user.photo : ""}
                ></BnbImage>
              )}
            </View>
          </View>
          <View style={styles.rightColumn}>
            {user && <Text style={styles.userName}>{user.email}</Text>}
          </View>
        </View>
        <Separator></Separator>
        {user_id === 0 && (
          <BnbButton
            style={styles.center}
            title="Editar perfil"
            onPress={_handleProfileEdit}
          ></BnbButton>
        )}
      </BnbBodyView>
    </BnbMainView>
  );
}

const styles = StyleSheet.create({
  center: {
    alignSelf: "center",
  },
  twoColumns: {
    //flex: 1,
    flexDirection: "row",
  },
  leftColumn: {
    //flex: 2,
    backgroundColor: colors.white,
    //alignItems: "center",
    //justifyContent: "center",
  },
  logoContainer: {
    //alignItems: "center",
  },
  userLogo: {
    width: 100,
    height: 100,
    backgroundColor: colors.graySoft,
  },
  rightColumn: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 20,
  },
  userName: {
    fontSize: fonts.big,
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default Profile;

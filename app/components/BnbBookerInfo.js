import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import colors from "../config/colors";
import bnbStyleSheet from "../constant/bnbStyleSheet";
import urls from "../constant/urls";
import httpGetTokenRequest from "../helpers/httpGetTokenRequest";
import BnbError from "./BnbError";
import BnbUserLogo from "./BnbUserLogo";

const BnbBookerInfo = ({ booker_id, me_id, navigation }) => {
  const [_user, setUser] = useState();
  const [_is_loading, setIsLoading] = useState(true);
  const [_error, setError] = useState();

  const _handleUsernameTap = () => {
    if (booker_id == me_id) {
      navigation.navigate("ProfileStack", { screen: "Profile" });
    } else {
      navigation.navigate("SearchRooms", {
        screen: "User",
        params: { user_id: booker_id },
      });
    }
  };

  useEffect(() => {
    httpGetTokenRequest("GET", urls.URL_USERS + "/" + booker_id, {}).then(
      (user) => {
        setUser(user);
        setIsLoading(false);
      },
      (error) => {
        setError(error);
        setIsLoading(false);
      }
    );
  }, []);

  if (_error) {
    <BnbError>{_error.message}</BnbError>;
  }

  if (_is_loading) {
    <Text>Cargando inquilino...</Text>;
  }

  return (
    <View>
      <TouchableHighlight
        activeOpacity={0.2}
        underlayColor={colors.redAirBNBSoft}
        onPress={() => _handleUsernameTap()}
      >
        {_user && (
          <View style={styles.userContainer}>
            <Text style={bnbStyleSheet.mediumText}>Solicitado por: </Text>
            <BnbUserLogo user_id={booker_id} imageStyle={styles.userImage} />
            <Text style={bnbStyleSheet.mediumText}>
              {_user.firstname} {_user.lastname}
            </Text>
          </View>
        )}
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  userImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.graySoft,
    marginRight: 10,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  menuItemText: {
    fontFamily: "Raleway_400Regular",
  },
  boldText: {
    fontSize: 18,
    fontFamily: "Raleway_700Bold",
  },
});

export default BnbBookerInfo;

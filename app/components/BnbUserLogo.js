import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import colors from "../config/colors";
import urls from "../constant/urls";
import httpGetTokenRequest from "../helpers/httpGetTokenRequest";

const BnbUserLogo = ({ user_id, imageStyle }) => {
  const [_user, setUser] = useState();

  useEffect(() => {
    httpGetTokenRequest("GET", urls.URL_USERS + "/" + user_id, {}).then(
      (user) => {
        setUser(user);
      },
      (error) => {}
    );
  }, []);

  return (
    <View>
      <Image
        style={{ ...styles.image, ...imageStyle }}
        source={
          !_user || _user.photo === "null"
            ? require("../assets/profile_icon.png")
            : { uri: _user.photo }
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.graySoft,
    marginRight: 10,
  },
});

export default BnbUserLogo;

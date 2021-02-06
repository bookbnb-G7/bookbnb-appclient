import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { error } from "react-native-gifted-chat/lib/utils";
import colors from "../config/colors";
import urls from "../constant/urls";
import httpGetTokenRequest from "../helpers/httpGetTokenRequest";
import BnbError from "./BnbError";

const BnbUserPost = ({ user_id, time, text, onUsernameTap }) => {
  const [_user, setUser] = useState();
  const [_is_loading, setIsLoading] = useState(true);
  const [_error, setError] = useState();

  useEffect(() => {
    httpGetTokenRequest("GET", urls.URL_USERS + "/" + user_id, {}).then(
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
    <Text>Cargando usuario...</Text>;
  }

  return (
    <View>
      <View style={styles.header}>
        <TouchableHighlight
          activeOpacity={0.2}
          underlayColor={colors.redAirBNBSoft}
          onPress={() => onUsernameTap(user_id)}
        >
          {_user && (
            <View style={styles.userContainer}>
              <Image
                style={styles.image}
                source={
                  _user.photo === "null"
                    ? require("../assets/profile_icon.png")
                    : { uri: _user.photo }
                }
              />
              <View style={styles.rightUserContainer}>
                <Text style={styles.boldText}>
                  {_user.firstname} {_user.lastname}
                </Text>
                {time && (
                  <Text style={styles.menuItemText}>Publicado: {time.split("T")[0]}</Text>
                )}
              </View>
            </View>
          )}
        </TouchableHighlight>
      </View>
      <View style={styles.body}>
        <Text style={styles.menuItemText}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {},
  image: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.graySoft,
    marginRight: 10,
  },
  header: {},
  body: {
    margin: 10,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightUserContainer: {},
  menuItemText: {
    fontFamily: "Raleway_400Regular",
  },
  boldText: {
    fontFamily: "Raleway_700Bold",
  },
});

export default BnbUserPost;

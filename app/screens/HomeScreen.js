import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, ImageBackground, Text } from "react-native";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import BnbButton from "../components/BnbButton";
import BnbMainView from "../components/BnbMainView";
import styling from "../config/styling";
import BnbSecureStore from "../classes/BnbSecureStore";
import constants from "../constant/constants";
import firebase from "firebase";
import BnbImageSlider from "../components/BnbImageSlider";
import httpPostTokenRequest from "../helpers/httpPostTokenRequest";
import urls from "../constant/urls";
import colors from "../config/colors";
import BnbWindow from "../components/BnbWindow";
import BnbBodyView from "../components/BnbBodyView";
import { ScrollView } from "react-native-gesture-handler";
import Separator from "../components/Separator";
import { useFocusEffect } from "@react-navigation/native";
import httpGetTokenRequest from "../helpers/httpGetTokenRequest";
import BnbRoomPreview from "../components/BnbRoomPreview";
import bnbStyleSheet from "../constant/bnbStyleSheet";

function HomeScreen({ navigation }) {
  const [storedUser, setStoredUser] = useState();
  const [_recommendedRooms, setRecommendedRooms] = useState();

  useEffect(() => {
    const get_user_credentials = async () => {
      const user = await BnbSecureStore.readUnsafe(constants.CACHE_USER_KEY);
      if (user) {
        BnbSecureStore.read(constants.CACHE_USER_KEY).then((response) => {
          setStoredUser(response);
        });
      }
    };
    get_user_credentials();
  }, []);

  useEffect(() => {
    const registerForPushNotificationsAsync = async () => {
      if (Constants.isDevice) {
        const {
          status: existingStatus,
        } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== "granted") {
          alert("Failed to get push token for push notification!");
          return;
        }
        const token = (await Notifications.getDevicePushTokenAsync()).data;

        console.log(token);

        /**Ojo que al logear/signear el BnbSecureStore.remember puede llegar mas tarde
         * y no estar guardado para el momento que haces el .read =>
         * Unhandled Promise reject user.auth_token is null
         */
        const user = await BnbSecureStore.readUnsafe(constants.CACHE_USER_KEY);
        if (user) {
          await httpPostTokenRequest(
            "POST",
            urls.URL_NOTIFICATION_TOKEN,
            {
              push_token: token,
            },
            {
              "Content-Type": "application/json",
              "x-access-token": user.auth_token,
            }
          );
        }
      } else {
        alert("Must use physical device for Push Notifications");
      }

      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }
    };
    registerForPushNotificationsAsync();
  });

  const _handleLogOutButton = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log(storedUser.userData.email + " Cerro sesion"))
      .then(() => navigation.navigate("HomeStack", { isLoggedIn: false }))
      .then(() => BnbSecureStore.clear(constants.CACHE_USER_KEY));
  };

  const fetchRecommendations = async (is_focused) => {
    httpGetTokenRequest("GET", urls.URL_RECOMMENDATIONS, {}).then(
      (recommendedRooms) => {
        if (is_focused) {
          setRecommendedRooms(recommendedRooms);
        }
      },
      (error) => {}
    );
  };

  useFocusEffect(
    useCallback(() => {
      let is_focused = true;
      fetchRecommendations(is_focused);
      return () => {
        is_focused = false;
      };
    }, [])
  );

  return (
    <BnbMainView style={styles.mainContainer}>
      <BnbBodyView style={styles.bodyContainer}>
        <ScrollView>
          <View style={styles.homeContentContainer}>
            <View style={styles.imageSlider}>
              <BnbImageSlider
                images={[require("../assets/Bookbnb_logo.png")]}
                width={200}
              />
            </View>
            <BnbWindow navigation={navigation} style={styles.window} />
            <View style={styles.optionsContainer}>
              <View>
                <BnbButton
                  title="DEBUG Cerrar sesion"
                  onPress={_handleLogOutButton}
                />
                <BnbButton
                  title="DEBUG Room/Profile by id"
                  onPress={() => {
                    navigation.navigate("DebugGoToRoomProfile");
                  }}
                />
              </View>
            </View>
          </View>
          <Separator />
          {_recommendedRooms && storedUser && (
            <View style={styles.roomRecommendationsContainer}>
              <Text style={bnbStyleSheet.headerText}>
                Publicaciones que te pueden interesar
              </Text>
              {_recommendedRooms.rooms.map((item, index) => (
                <View key={index} style={styles.roomPreviewContainer}>
                  {item.owner_uuid != storedUser.userData.id && (
                    <BnbRoomPreview
                      room={item}
                      me_id={storedUser.userData.id}
                      navigation={navigation}
                    />
                  )}
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </BnbBodyView>
    </BnbMainView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.white,
  },
  imageSlider: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 30,
  },
  optionsContainer: {
    flex: 1,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  bodyContainer: {},
  window: {
    marginTop: 0,
  },
  homeContentContainer: {
    justifyContent: "space-around",
    flex: 1,
  },
  roomPreviewContainer: {
    alignSelf: "center",
    width: "90%",
  },
  roomRecommendationsContainer: {
    width: "100%",
    alignSelf: "center",
    backgroundColor: colors.redAirBNBSoft,
    borderRadius: 20,
  },
});

export default HomeScreen;

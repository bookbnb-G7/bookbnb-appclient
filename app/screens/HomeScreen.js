import React, { useEffect, useState } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import BnbButton from "../components/BnbButton";
import BnbMainView from "../components/BnbMainView";
import styling from "../config/styling";
import BnbSecureStore from "../classes/BnbSecureStore";
import constants from "../constant/constants";
import firebase from "firebase";
import "firebase/messaging";
import BnbImageSlider from "../components/BnbImageSlider";
import httpPostTokenRequest from "../helpers/httpPostTokenRequest";
import urls from "../constant/urls";
import colors from "../config/colors";

function HomeScreen({ navigation }) {
  const [storedUser, setStoredUser] = useState();

  useEffect(() => {
    BnbSecureStore.read(constants.CACHE_USER_KEY).then((response) => {
      setStoredUser(response);
    });
  }, []);

  useEffect(() => {
    const registerForPushNotificationsAsync = async () => {
      if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!');
          return;
        }
        const token = (await Notifications.getDevicePushTokenAsync()).data;

        console.log(token);
  
        const user = await BnbSecureStore.read(constants.CACHE_USER_KEY);
  
        await httpPostTokenRequest("POST", urls.URL_NOTIFICATION_TOKEN, {
          push_token: token,
        }, {
          "Content-Type": "application/json",
          "x-access-token": user.auth_token,
        });
  
      } else {
        alert('Must use physical device for Push Notifications');
      }
  
      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
    };
    registerForPushNotificationsAsync();
  }, [])

  function _handleSearchRoomsButton() {
    navigation.navigate("SearchRooms");
  }

  const _handleLogOutButton = () => {
    firebase.auth()
      .signOut()
      .then(() => console.log(storedUser.userData.email + " Cerro sesion"))
      .then(() => navigation.navigate("HomeStack"))
      .then(() => BnbSecureStore.clear(constants.CACHE_USER_KEY));
  };

  return (
    <BnbMainView style={styles.mainContainer}>
      <View style={styles.imageSlider}>
        <BnbImageSlider
          images={[require("../assets/Bookbnb_logo.png")]}
          width={200}
          onPress={() => {
            console.log("HOla");
          }}
        />
      </View>
      <View style={styles.optionsContainer}>
        <View>
          <BnbButton
            onPress={_handleSearchRoomsButton}
            title={"Buscar Habitaciones"}
          />
          <BnbButton
            title="DEBUG Cerrar sesion"
            onPress={_handleLogOutButton}
          />
        </View>
      </View>
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
  },
  optionsContainer: {
    flex: 1,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  bodyContainer: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    borderWidth: 1,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    borderRadius: styling.bigCornerRadius,
    backgroundColor: "white",
  },
  background: {
    flex: 1,
    paddingVertical: 10,
    //width: "100%",
    //resizeMode: "repeat",
  },
});

export default HomeScreen;

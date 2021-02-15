import React, { useEffect, useState } from "react";
import BnbMainView from "../../components/BnbMainView";
import BnbBodyView from "../../components/BnbBodyView";
import { ScrollView } from "react-native-gesture-handler";
import httpGetTokenRequest from "../../helpers/httpGetTokenRequest";
import urls from "../../constant/urls";
import BnbSecureStore from "../../classes/BnbSecureStore";
import constants from "../../constant/constants";
import BnbError from "../../components/BnbError";
import BnbRoomPreview from "../../components/BnbRoomPreview";
import { View, Text } from "react-native";
import bnbStyleSheet from "../../constant/bnbStyleSheet";
import BnbButton from "../../components/BnbButton";

function ProfileFavoritesScreen({ navigation }) {
  const [_favorite_rooms, setFavoritesRooms] = useState();
  const [storedUser, setStoredUser] = useState();
  const [_error, setError] = useState();

  useEffect(() => {
    BnbSecureStore.read(constants.CACHE_USER_KEY).then((user) => {
      setStoredUser(user);
    });
  }, []);

  useEffect(() => {
    if (storedUser) {
      httpGetTokenRequest("GET", urls.URL_ME + "/favorite_rooms", {
        "x-access-token": storedUser.auth_token,
      }).then(
        (favorites) => {
          setFavoritesRooms(favorites);
        },
        (error) => {
          setError(error);
        }
      );
    }
  }, [storedUser]);

  if (_error) {
    return <BnbError>{_error.message}</BnbError>;
  }

  return (
    <BnbMainView>
      <BnbBodyView>
        <Text style={bnbStyleSheet.headerTextBlack}>
          Tus Habitaciones Favoritas
        </Text>
        <ScrollView>
          {_favorite_rooms &&
            storedUser &&
            _favorite_rooms.rooms.map((item, index) => (
              <View key={index}>
                <BnbRoomPreview
                  room={item}
                  me_id={storedUser.userData.id}
                  navigation={navigation}
                />
                <BnbButton iconName="star" title={"Quitar de favoritos"} />
              </View>
            ))}
        </ScrollView>
      </BnbBodyView>
    </BnbMainView>
  );
}

export default ProfileFavoritesScreen;

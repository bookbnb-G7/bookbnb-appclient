import React, { useEffect, useState } from "react";
import BnbMainView from "../../components/BnbMainView";
import BnbBodyView from "../../components/BnbBodyView";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import colors from "../../config/colors";
import httpGetTokenRequest from "../../helpers/httpGetTokenRequest";
import urls from "../../constant/urls";
import BnbSecureStore from "../../classes/BnbSecureStore";
import constants from "../../constant/constants";
import BnbError from "../../components/BnbError";
import BnbRoomPreview from "../../components/BnbRoomPreview";
import { View, Text, StyleSheet } from "react-native";
import bnbStyleSheet from "../../constant/bnbStyleSheet";

const categoryTab = [
  { state: "Todos" },
  { state: "Casa" },
  { state: "Apartamento" },
  { state: "Hotel" },
  { state: "Cabaña" },
  { state: "Hostel" },
  { state: "Loft" },
];

function ProfileFavoritesScreen({ navigation }) {
  const [_favorite_rooms, setFavoritesRooms] = useState();
  const [storedUser, setStoredUser] = useState();
  const [_error, setError] = useState();

  const [_category, setCategory] = useState("Todos");

  const CategoryFilterTab = ({ state, onButtonPress }) => {
    return (
      <View>
        <View style={styles.filterTab}>
          {categoryTab.map((item, index) => (
            <View key={item.state}>
              {index < 4 && (
                <TouchableOpacity
                  style={[
                    styles.filterButton,
                    state === item.state && styles.filterButtonActive,
                  ]}
                  onPress={() => onButtonPress(item.state)}
                >
                  <Text style={styles.filterButtonText}>
                    {item.state.substring(0, 6)}
                    {item.state.length >= 6 ? "." : ""}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
        <View style={styles.filterTab}>
          {categoryTab.map((item, index) => (
            <View key={item.state}>
              {index > 3 && (
                <TouchableOpacity
                  style={[
                    styles.filterButton,
                    state === item.state && styles.filterButtonActive,
                  ]}
                  onPress={() => onButtonPress(item.state)}
                >
                  <Text style={styles.filterButtonText}>{item.state}</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      </View>
    );
  };

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
        <CategoryFilterTab state={_category} onButtonPress={setCategory} />
        <ScrollView>
          {_favorite_rooms && _favorite_rooms.rooms.length === 0 && (
            <Text style={bnbStyleSheet.normalText}>
              Todavia no ha agregado ninguna publicación a su lista de favoritos
            </Text>
          )}
          {_favorite_rooms &&
            storedUser &&
            _favorite_rooms.rooms.map((item, index) => (
              <View key={index}>
                {(_category === "Todos" || _category === item.type) && (
                  <BnbRoomPreview
                    room={item}
                    me_id={storedUser.userData.id}
                    navigation={navigation}
                  />
                )}
              </View>
            ))}
        </ScrollView>
      </BnbBodyView>
    </BnbMainView>
  );
}

const styles = StyleSheet.create({
  filterTab: {
    flexDirection: "row",
    alignSelf: "center",
    borderWidth: 1,
    justifyContent: "space-between",
    marginVertical: 2,
  },
  filterButton: {
    width: 80,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
  },
  filterButtonText: {
    fontFamily: "Raleway_500Medium",
  },
  filterButtonActive: {
    backgroundColor: colors.redAirBNBSoft,
  },
});

export default ProfileFavoritesScreen;

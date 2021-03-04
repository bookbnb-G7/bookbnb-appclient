import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import BnbBodyView from "../../components/BnbBodyView";
import BnbButton from "../../components/BnbButton";
import BnbMainView from "../../components/BnbMainView";
import Separator from "../../components/Separator";

function ProfileRoomsOptionsScreen({ navigation }) {
  const _handleCreateRoomButtonPress = () => {
    navigation.navigate("RoomCreate");
  };

  const _handleBookingRequests = () => {
    navigation.navigate("ProfileBookings");
  };

  const _handleMyRoomsButton = () => {
    navigation.navigate("ProfileRooms");
  };

  const _handleMyFavoritesButton = () => {
    navigation.navigate("ProfileFavorites");
  };

  const ROOMS_OPTIONS = [
    { id: 0, title: "Crear habitacion" },
    { id: 1, title: "Mis reservas" },
    { id: 2, title: "Mis habitaciones" },
    { id: 3, title: "Favoritos" },
  ];
  const HANDLERS = [
    _handleCreateRoomButtonPress,
    _handleBookingRequests,
    _handleMyRoomsButton,
    _handleMyFavoritesButton,
  ];

  return (
    <BnbMainView>
      <BnbBodyView>
        <ScrollView>
          <View>
            {ROOMS_OPTIONS.map((element) => (
              <View key={element.id}>
                <Separator />
                <BnbButton
                  title={element.title}
                  onPress={HANDLERS[element.id]}
                  style={styles.button}
                ></BnbButton>
              </View>
            ))}
          </View>
        </ScrollView>
      </BnbBodyView>
    </BnbMainView>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
  },
});

export default ProfileRoomsOptionsScreen;

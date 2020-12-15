import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import BnbBodyView from "../../components/BnbBodyView";
import BnbButton from "../../components/BnbButton";
import BnbMainView from "../../components/BnbMainView";
import Separator from "../../components/Separator";

function ProfileRoomsScreen({ navigation }) {
  const _handleCreateRoomButtonPress = () => {
    navigation.navigate("RoomCreate");
  };

  const ROOMS_OPTIONS = [{ id: 0, title: "Crear habitacion" }];
  const HANDLERS = [_handleCreateRoomButtonPress];

  return (
    <BnbMainView>
      <BnbBodyView>
        <ScrollView>
          <Text>DEBUG: aca deberian aparecer los rooms del usuario</Text>
          <View style={styles.bodyContainer}>
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
  bodyContainer: {
    //flex: 1,
    //alignItems: "center",
  },
  button: {
    width: "100%",
  },
});

export default ProfileRoomsScreen;

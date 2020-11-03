import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import BnbBodyView from "../components/BnbBodyView";
import BnbBubbleView from "../components/BnbBubbleView";
import BnbButton from "../components/BnbButton";
import BnbFooterView from "../components/BnbFooterView";
import BnbHeaderView from "../components/BnbHeaderView";
import BnbMainView from "../components/BnbMainView";
import BnbTitleText from "../components/BnbTitleText";
import colors from "../config/colors";

bnb_book_logo = require("../assets/airbnb.png");

function HomeScreen({ navigation }) {
  function _handleMakeAPostButton() {
    navigation.navigate("Posts");
  }

  function _handleMakeANoteButton() {
    navigation.navigate("Notes");
  }

  function _handleGoRoomsButton() {
    navigation.navigate("Rooms");
  }

  function _handleProfileButton() {
    navigation.navigate("Profile");
  }
  return (
    <BnbMainView>
      <BnbHeaderView>
        <BnbTitleText>BnbBook</BnbTitleText>
      </BnbHeaderView>
      <BnbBodyView>
        <Image style={styles.logo} source={bnb_book_logo}></Image>
        <BnbBubbleView>
          <Text>
            Por favor seleccione que tipo de accion desea hacer a continuacion
          </Text>
        </BnbBubbleView>
        <View style={styles.optionsContainer}>
          <BnbButton onPress={_handleMakeAPostButton} title={"Make a post"} />
          <BnbButton onPress={_handleMakeANoteButton} title={"Make a note"} />
          <BnbButton onPress={_handleGoRoomsButton} title={"Go to rooms"} />
          <BnbButton onPress={_handleProfileButton} title={"Profile"} />
        </View>
      </BnbBodyView>
      <BnbFooterView>
        <Text>footer</Text>
      </BnbFooterView>
    </BnbMainView>
  );
}

const styles = StyleSheet.create({
  optionsContainer: {
    flex: 2,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },
});

export default HomeScreen;

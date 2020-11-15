import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import BnbBodyView from "../components/BnbBodyView";
import BnbBubbleView from "../components/BnbBubbleView";
import BnbButton from "../components/BnbButton";
import BnbFooterView from "../components/BnbFooterView";
import BnbHeaderView from "../components/BnbHeaderView";
import BnbMainView from "../components/BnbMainView";
import BnbTitleText from "../components/BnbTitleText";
import Separator from "../helpers/Separator";

bnb_book_logo = require("../assets/airbnb.png");

function HomeScreen({ navigation }) {
  function _handleProfileButton() {
    navigation.navigate("Profile");
  }

  function _handleSearchRoomsButton() {
    navigation.navigate("SearchRooms");
  }
  return (
    <BnbMainView>
      <Separator />
      <BnbBodyView>
        <Image style={styles.logo} source={bnb_book_logo}></Image>
        <View style={styles.optionsContainer}>
          <BnbButton onPress={_handleProfileButton} title={"Profile"} />
          <BnbButton onPress={_handleSearchRoomsButton} title={"Search"} />
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

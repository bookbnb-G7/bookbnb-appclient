import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import BnbBodyView from "../components/BnbBodyView";
import BnbButton from "../components/BnbButton";
import BnbFooterView from "../components/BnbFooterView";
import BnbHeaderView from "../components/BnbHeaderView";
import BnbMainView from "../components/BnbMainView";

import BnbTitleText from "../components/BnbTitleText";
import colors from "../config/colors";

const room_photo = require("../assets/icon.png");

function ReviewRoomScreen({ navigation }) {
  function _handlePostReviewButtonPress() {
    alert("(Mock)Review posted");
  }

  function _handleClearButtonPress() {
    alert("(Mock)Clear");
  }

  function _handleGoHomeButtonPress() {
    navigation.navigate("Home");
  }

  function _handleGoBackButtonPress() {
    navigation.goBack();
  }

  return (
    <BnbMainView>
      <BnbHeaderView>
        <BnbTitleText>Review Room</BnbTitleText>
      </BnbHeaderView>
      <BnbBodyView>
        <View style={styles.roomPhotoContainer}>
          <Text>
            {"<"}Name of the room{">"}
          </Text>
          <Image source={room_photo}></Image>
        </View>
        <View style={styles.roomDescriptionContainer}>
          <Text>
            {"<"}Room description Room description Room description Room
            description Room description Room description Room description Room
            description Room description{">"}
          </Text>
        </View>
        <View style={styles.userInputContainer}>
          <TextInput multiline placeholder="Write down your review"></TextInput>
        </View>
        <View style={styles.reviewOptionsContainer}>
          <BnbButton
            onPress={_handlePostReviewButtonPress}
            title="Post Review"
          />
          <BnbButton onPress={_handleClearButtonPress} title="Clear" />
        </View>
      </BnbBodyView>
      <BnbFooterView style={styles.footerContainer}>
        <BnbButton onPress={_handleGoHomeButtonPress} title="Go to Home" />
        <BnbButton onPress={_handleGoBackButtonPress} title="Go Back" />
      </BnbFooterView>
    </BnbMainView>
  );
}

const styles = StyleSheet.create({
  roomPhotoContainer: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  bodyContainer: {
    justifyContent: "space-between",
  },
  roomDescriptionContainer: {
    marginVertical: 4,
  },
  userInputContainer: {
    flex: 1,
    backgroundColor: colors.graySoft,
  },
  reviewOptionsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default ReviewRoomScreen;

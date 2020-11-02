import React from "react";
import { StyleSheet, View, Text } from "react-native";
import colors from "../config/colors";

const profile_logo = require("../assets/Octocat.png");

function Profile({ navigation }) {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.twoColumns}>
        <View style={styles.leftColumn}>
          <Text>ph</Text>
          <Text>ph</Text>
        </View>
        <View style={styles.rightColumn}>
          <Text>ph</Text>
          <Text>ph</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.warning,
  },
  twoColumns: {
    flexDirection: "row",
  },
  leftColumn: {
    backgroundColor: colors.white,
    flex: 1,
  },
  rightColumn: {
    backgroundColor: colors.pinkBg,
    flex: 2,
  },
});

export default Profile;

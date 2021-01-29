import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "../config/colors";
import bnbStyleSheet from "../constant/bnbStyleSheet";

const BnbWindow = ({ navigation, style }) => {
  const icon_size = 60;
  return (
    <View style={{ ...styles.windowContainer, ...style }}>
      <View style={styles.windowRow}>
        <TouchableOpacity onPress={() => navigation.navigate("SearchRooms")}>
          <View style={styles.windowIcon}>
            <Ionicons name="ios-search" size={icon_size} />
            <Text style={bnbStyleSheet.normalText}>Buscar</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ProfileStack", { screen: "ProfileWallet" })
          }
        >
          <View style={styles.windowIcon}>
            <Ionicons name="ios-wallet" size={icon_size} />
            <Text style={bnbStyleSheet.normalText}>Billetera</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.windowRow}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ProfileStack", { screen: "ProfileBookings" })
          }
        >
          <View style={styles.windowIcon}>
            <Ionicons name="ios-book" size={icon_size} />
            <Text style={bnbStyleSheet.normalText}>Reservas</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ProfileStack", { screen: "ProfileRooms" })
          }
        >
          <View style={styles.windowIcon}>
            <Ionicons name="ios-bed" size={icon_size} />
            <Text style={bnbStyleSheet.normalText}>Habitaciones</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  windowContainer: {
    borderWidth: 4,
    borderColor: colors.redAirBNBSoft,
    alignSelf: "center",
    borderRadius: 5,
  },
  windowRow: {
    flexDirection: "row",
  },
  windowIcon: {
    borderWidth: 2,
    borderColor: colors.redAirBNB,
    paddingLeft: 4,
    alignItems: "center",
    width: 94,
  },
});

export default BnbWindow;

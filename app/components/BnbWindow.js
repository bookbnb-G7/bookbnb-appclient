import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "../config/colors";
import bnbStyleSheet from "../constant/bnbStyleSheet";

const BnbWindow = ({ navigation, style }) => {
  const icon_size = 60;
  return (
    <View style={styles.windowContainerContainer}>
      <View style={{ ...styles.windowContainer, ...style }}>
        <View style={styles.windowRow}>
          <TouchableOpacity onPress={() => navigation.navigate("SearchRooms")}>
            <View style={{...styles.windowIcon, borderRightWidth: 2}}>
              <Ionicons name="ios-search" size={icon_size} color={colors.white}/>
              <Text style={styles.windowLabelText}>Buscar</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ProfileStack", { screen: "ProfileWallet" })
            }
          >
            <View style={{...styles.windowIcon}}>
              <Ionicons name="ios-wallet" size={icon_size} color={colors.white}/>
              <Text style={styles.windowLabelText}>Billetera</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.windowRow}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ProfileStack", { screen: "ProfileBookings" })
            }
          >
            <View style={{...styles.windowIcon, borderRightWidth: 2, borderTopWidth: 2}}>
              <Ionicons name="ios-book" size={icon_size} color={colors.white}/>
              <Text style={styles.windowLabelText}>Reservas</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ProfileStack", {
                screen: "ProfileRoomsOptions",
              })
            }
          >
            <View style={{...styles.windowIcon, borderTopWidth: 2}}>
              <Ionicons name="ios-bed" size={icon_size} color={colors.white}/>
              <Text style={styles.windowLabelText}>Habitaciones</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  windowContainer: {
    borderRadius: 9,
    borderColor: colors.redAirBNBSoft,
    overflow: "hidden",
  },
  windowContainerContainer: {
    borderRadius: 9,
    paddingHorizontal: 2,
    paddingTop: 3,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 3,
  },
  windowRow: {
    flexDirection: "row",
  },
  windowIcon: {
    paddingVertical: 5,
    borderColor: colors.white,
    alignItems: "center",
    backgroundColor: colors.redAirBNBSoft,
    width: 94,
  },
  windowLabelText: {
    ...bnbStyleSheet.normalText,
    color: colors.white,
  }
});

export default BnbWindow;

import React from "react";
import { StyleSheet, View } from "react-native";
import colors from "../config/colors";
import styling from "../config/styling";

const BnbHeaderView = (props) => (
  <View style={styles.headerContainer}>{props.children}</View>
);

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderTopLeftRadius: styling.smallCornerRadius,
    borderTopRightRadius: styling.smallCornerRadius,
    borderBottomColor: colors.redSoft,
    borderBottomWidth: 1,
  },
});

export default BnbHeaderView;

import React from "react";
import { StyleSheet, View } from "react-native";
import colors from "../config/colors";
import styling from "../config/styling";

const BnbFooterView = (props) => (
  <View style={{ ...styles.footerContainer, ...props.style }}>
    {props.children}
  </View>
);

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: styling.smallCornerRadius,
    borderBottomRightRadius: styling.smallCornerRadius,
    alignItems: "center",
    justifyContent: "center",
    borderTopColor: colors.redSoft,
    borderTopWidth: 1,
    flex: 0.1,
  },
});

export default BnbFooterView;

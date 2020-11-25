import React from "react";
import { StyleSheet, View } from "react-native";
import colors from "../config/colors";
import styling from "../config/styling";

const BnbBodyView = (props) => (
  <View style={{ ...styles.bodyContainer, ...props.style }}>
    {props.children}
  </View>
);

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: styling.mediumCornerRadius,
    borderTopRightRadius: styling.mediumCornerRadius,
    paddingHorizontal: styling.bodyHPadding,
    paddingVertical: styling.separator,
    //borderWidth: 1,
  },
});

export default BnbBodyView;

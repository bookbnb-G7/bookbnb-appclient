import React from "react";
import { StyleSheet, View } from "react-native";
import colors from "../config/colors";

function Separator(props) {
  return (
    <View
      style={{
        marginVertical: 4,
        borderBottomColor: colors.separator,
        borderBottomWidth: StyleSheet.hairlineWidth,
      }}
    ></View>
  );
}

export default Separator;

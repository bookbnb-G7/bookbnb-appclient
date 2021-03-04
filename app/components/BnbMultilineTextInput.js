import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import colors from "../config/colors";
import styling from "../config/styling";
import constants from "../constant/constants";

const BnbMultilineTextInput = ({ container, textInput, onChangeText }) => {
  const [_text, setText] = useState("");
  const _handleTextChange = (value) => {
    setText(value);
    if (onChangeText) {
      onChangeText(value);
    }
  };
  return (
    <View style={{ ...styles.container, ...container }}>
      <TextInput
        style={{ ...styles.textInput, ...textInput }}
        multiline
        numberOfLines={3}
        maxLength={constants.maxTextLength}
        onChangeText={(value) => _handleTextChange(value)}
        value={_text}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderRadius: styling.smallCornerRadius,
    borderWidth: 1,
    backgroundColor: colors.graySoft,
    marginVertical: styling.separator,
    paddingLeft: 10,
  },
});

export default BnbMultilineTextInput;

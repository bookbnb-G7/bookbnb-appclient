import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import colors from "../config/colors";
import fonts from "../config/fonts";
import styling from "../config/styling";

const BnbTextInput = (props) => {
  return (
    <View style={styles.mainContainer}>
      <Text style={{ ...styles.keyText, ...props.style }}>{props.left}</Text>
      <TextInput
        style={{ ...styles.valueText, ...props.style }}
        defaultValue={props.value}
        editable={props.editable}
        onChangeText={(text) => props.onChange(props.id, text)}
        multiline
      ></TextInput>
    </View>
  );
};

BnbTextInput.defaultProps = {
  value: "No Text",
};

const styles = StyleSheet.create({
  mainContainer: {
    //flexDirection: "row",
    //alignItems: "center",
  },
  keyText: {
    fontSize: fonts.semi,
    // flex: 1,
  },
  valueText: {
    // flex: 1.5,
    fontSize: fonts.semi,
    backgroundColor: colors.graySoft,
    borderWidth: 1,
    borderColor: colors.redSoft,
    borderRadius: styling.smallCornerRadius,
    paddingHorizontal: styling.textHPadding,
  },
});

export default BnbTextInput;

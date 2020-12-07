import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import colors from "../config/colors";
import fonts from "../config/fonts";
import styling from "../config/styling";

// Simil BnbTextInput pero pasando un objeto como parametro en vez de un valor
const BnbTextInputObject = (props) => {
  return (
    <View style={styles.mainContainer}>
      <Text style={{ ...styles.keyText, ...props.style }}>{props.left}</Text>
      <TextInput
        style={{ ...styles.valueText, ...props.style }}
        defaultValue={props.object[props.id].toString()}
        editable={props.editable}
        onChangeText={(text) => props.onChange(props.id, text)}
        multiline
      ></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {},
  keyText: {
    fontSize: fonts.semi,
  },
  valueText: {
    fontSize: fonts.semi,
    backgroundColor: colors.graySoft,
    borderWidth: 1,
    borderColor: colors.redSoft,
    borderRadius: styling.smallCornerRadius,
    paddingHorizontal: styling.textHPadding,
  },
});

export default BnbTextInputObject;
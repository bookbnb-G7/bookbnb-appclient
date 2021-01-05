import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import colors from "../config/colors";
import fonts from "../config/fonts";
import styling from "../config/styling";
import bnbStyleSheet from "../constant/bnbStyleSheet";
import Separator from "./Separator";

// Simil BnbTextInput pero pasando un objeto como parametro en vez de un valor
const BnbTextInputObject = (props) => {
  return (
    <View style={styles.mainContainer}>
      <Separator style={{ borderBottomWidth: 0 }}></Separator>

      <Text style={{ ...bnbStyleSheet.subTitle, ...props.keyText }}>
        {props.name}
      </Text>
      <View
        elevation={5}
        style={{ ...styles.customStyle, ...props.customStyle }}
      >
        <TextInput
          style={{ ...styles.valueText, ...props.style }}
          defaultValue={props.object[props.id].toString()}
          editable={props.editable}
          onChangeText={(text) => props.onChange(props.id, text)}
          multiline
        ></TextInput>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {},

  customStyle: {
    backgroundColor: colors.graySoft,
  },
  valueText: {
    fontSize: fonts.semi,
    fontFamily: "Raleway_400Regular",
    //backgroundColor: colors.graySoft,
    /**borderWidth: 1,
    borderColor: colors.redSoft,
    borderRadius: styling.smallCornerRadius,
    paddingHorizontal: styling.textHPadding,*/
  },
});

export default BnbTextInputObject;

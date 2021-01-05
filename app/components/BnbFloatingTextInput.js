import React from "react";
import { StyleSheet, View } from "react-native";
import { FloatingLabelInput } from 'react-native-floating-label-input';
import styling from "../config/styling";
import fonts from "../config/fonts";
import {TextInput} from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/MaterialCommunityIcons";


const BnbFloatingTextInput = (props) => (
  <View style={styles.viewContainer}>
    <FloatingLabelInput
      label={props.name}
      isPassword={props.isPassword ? props.isPassword : false}
      editable={props.editable ? props.editable : true}
      customShowPasswordComponent={<Ionicons name="eye" size={22}/>}
      customHidePasswordComponent={<Ionicons name="eye-off" size={22}/>}
      inputStyles={{...styles.input, ...props.inputStyle}}
      labelStyles={{...styles.label, ...props.labelStyle}}
      containerStyles={{...styles.container, ...props.containerStyle}}
      value={props.object[props.id].toString()}
      onChangeText={(text) => props.onChange(props.id, text)}
      onSubmit={props.onSubmit}
      mask={props.mask}
      hint={props.hint}
      ref={props.inputRef}
      returnKeyType={props.returnKeyType}
      keyboardType={props.keyboardType}
      autoFocus={props.autoFocus}
      blurOnSubmit={false}
    />
  </View>
)

const styles = StyleSheet.create({
  input: {
    fontFamily: "Raleway_400Regular",
    paddingHorizontal: 5,
  },
  label: {
    fontFamily: "Raleway_400Regular"
  },
  container: {
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 40,
    height: 50,
  },
  viewContainer: {
    marginBottom: 10,
  }
});

export default BnbFloatingTextInput;
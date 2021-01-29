import React, {useEffect, useRef} from 'react';
import { StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {Input} from "react-native-elements";
import Ionicons from "@expo/vector-icons/MaterialCommunityIcons";
import colors from "../config/colors";

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

const GooglePlacesInput = (props) => {

  return (
    <GooglePlacesAutocomplete
      placeholder={props.placeholder}
      query={{
        key: GOOGLE_PLACES_API_KEY,
        language: 'es',
        types: props.locationType,
      }}
      fetchDetails={true}
      onPress={(data, details=null) => {
        props.onEndEditing(data.description, {
          "latitude": details.geometry.location.lat,
          "longitude": details.geometry.location.lng,
        });
      }}
      enablePoweredByContainer={false}
      minLength={3}
      textInputProps={{
        InputComp: Input,
        placeholder: props.placeholder,
        onChangeText: props.onChangeText,
        value: props.value,
        disabledInputStyle: { background: "#ddd" },
        leftIcon: <Ionicons name="map-search-outline" size={17} />,
        inputContainerStyle: {
          ...styles.inputContainerStyle,
          ...props.inputContainerStyle
        },
        inputStyle: {
          ...styles.inputStyle,
          ...props.inputStyle,
        },
        errorMessage: "",
        errorStyle: {
          ...styles.errorStyle,
          ...props.errorStyle,
        },
      }}
      styles={{
        listView: {
          ...styles.listView,
          ...props.listView,
        },
        predefinedPlacesDescription: {
          ...styles.predefinedPlacesDescription,
          ...props.predefinedPlacesDescription,
        },
        separator: {
          ...styles.separator,
          ...props.separator,
        },
        textInputContainer: {
          ...styles.textInputContainer,
          ...props.textInputContainer,
        },
        container: {
          ...styles.container,
          ...props.container,
        },
      }}
    />
  );
};

const styles = StyleSheet.create({
  inputContainerStyle: {
    borderRadius: 10,
    borderWidth: 1,
    paddingLeft: 14,
    backgroundColor: colors.white,
  },
  inputStyle: {
    paddingLeft: 5,
    marginRight: 15,
  },
  errorStyle: {
    height: 0,
    margin: 0,
  },
  listView: {
    marginLeft: 37,
  },
  predefinedPlacesDescription: {
    color: '#1faadb',
  },
  separator: {
    width: "95%",
  },
  textInputContainer: {
    flexDirection: "row",
    margin: 0,
  },
  container: {
    overflow: "visible",
  },
});

export default GooglePlacesInput;
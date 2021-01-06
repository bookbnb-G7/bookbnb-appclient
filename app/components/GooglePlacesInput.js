import React, {useEffect, useRef} from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {Input} from "react-native-elements";
import Ionicons from "@expo/vector-icons/MaterialCommunityIcons";
import colors from "../config/colors";

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

const GooglePlacesInput = (props) => {
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      props.onEndEditing();
    }
  }, [props.stateVar]);
  return (
    <GooglePlacesAutocomplete
      placeholder={props.placeholder}
      query={{
        key: GOOGLE_PLACES_API_KEY,
        language: 'es',
        types: "(cities)",
      }}
      fetchDetails={true}
      onPress={(data, details=null) => {
        props.onPress(data.description);
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
          borderRadius: 10,
          borderWidth: 1,
          paddingLeft: 14,
          backgroundColor: colors.white,
        },
        inputStyle: {
          paddingLeft: 5,
          marginRight: 15,
        },
        errorMessage: "",
        errorStyle: {
          height: 0,
          margin: 0,
        },
      }}
      styles={{
        listView: {
          marginLeft: 37,
        },
        predefinedPlacesDescription: {
          color: '#1faadb',
        },
        separator: {
          //backgroundColor: "white",
          width: "95%",
        },
        textInputContainer: {
          flexDirection: "row",
          margin: 0,
        },
        container: {
          overflow: "visible",
        },
      }}
    />
  );
};

export default GooglePlacesInput;
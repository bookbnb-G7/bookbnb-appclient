import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import BnbBodyView from "../components/BnbBodyView";
import BnbMainView from "../components/BnbMainView";
import fonts from "../config/fonts";
import colors from "../config/colors";
import GooglePlacesInput from "../components/GooglePlacesInput";

function SearchInputScreen({ navigation }) {
  const [tempLocation, setTempLocation] = useState("");
  const [_location_input, setLocationInput] = useState("");

  const _handleEndEditing = (_location_input, _coordinates_input) => {
    navigation.navigate("SearchDateTimePicker", {
      "location": _location_input,
      "coordinates": _coordinates_input,
    });
  };

  return (
    <BnbMainView style={styles.background}>
      <Text style={styles.headerText}>¿A donde quieres ir?</Text>
      <BnbBodyView style={styles.bodyView}>
        <GooglePlacesInput
          placeholder="¿A donde vas?"
          onChangeText={setTempLocation}
          onEndEditing={_handleEndEditing}
          onPress={setLocationInput}
          value={tempLocation}
          stateVar={_location_input}
        />
      </BnbBodyView>
    </BnbMainView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.redAirBNB,
    paddingLeft: 5,
    paddingRight: 5,
    alignItems: "center",
  },
  searchInputText: {
    fontSize: fonts.big,
  },
  bodyView: {
    paddingTop: 10,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
  },
  headerText: {
    fontFamily: "Raleway_700Bold",
    fontSize: 25,
    paddingLeft: 11,
    paddingVertical: 15,
    color: colors.white,
  },
});

export default SearchInputScreen;

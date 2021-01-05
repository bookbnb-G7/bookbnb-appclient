import React, { useState } from "react";
import { Image, StyleSheet, Text } from "react-native";
import BnbBodyView from "../components/BnbBodyView";
import BnbIconText from "../components/BnbIconText";
import BnbMainView from "../components/BnbMainView";
import fonts from "../config/fonts";
import Separator from "../components/Separator";
import colors from "../config/colors";
import GooglePlacesInput from "../components/GooglePlacesInput";

const icon = require("../assets/bookbnb_1.png");


function SearchInputScreen({ navigation }) {
  const [tempLocation, setTempLocation] = useState("");
  const [_location_input, setLocationInput] = useState("");



  /**Lo creo aca y lo voy pasando como props a cada screen que lo va completando */
  const [searchForm, setSearchForm] = useState({
    date_ends: "",
    date_begins: "",
    amount_of_people: 0,
    user_id: 0,
  });

  const _handleEndEditing = () => {
    console.log("Lo que recibio es: " + _location_input);
    navigation.navigate("SearchDateTimePicker", {
      location: _location_input,
      searchForm: searchForm,
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
    alignItems: "center"
  },
  searchInputText: {
    fontSize: fonts.big,
  },
  bodyView: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    paddingTop: 10,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
  },
  headerText: {
    fontFamily: "Raleway_700Bold",
    fontSize: 30,
    paddingLeft: 11,
    paddingBottom: 10,
    paddingTop: 10,
    color: colors.white,
  },
});

export default SearchInputScreen;

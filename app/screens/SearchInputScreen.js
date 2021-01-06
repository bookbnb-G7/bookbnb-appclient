import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import BnbBodyView from "../components/BnbBodyView";
import BnbMainView from "../components/BnbMainView";
import fonts from "../config/fonts";
import colors from "../config/colors";
import GooglePlacesInput from "../components/GooglePlacesInput";
import bnbStyleSheet from "../constant/bnbStyleSheet";
import BnbButton from "../components/BnbButton";

function SearchInputScreen({ navigation }) {
  const [tempLocation, setTempLocation] = useState("");
  const [_location_input, setLocationInput] = useState("");

  /**
  Lo creo aca y lo voy pasando como props a cada screen que lo va completando
  const [searchForm, setSearchForm] = useState({
    date_ends: "",
    date_begins: "",
    amount_of_people: 0,
    user_id: 0,
  });
  **/

  const _handleEndEditing = () => {
    navigation.navigate("SearchDateTimePicker", {
      location: _location_input,
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

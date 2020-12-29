import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import BnbBodyView from "../components/BnbBodyView";
import BnbIconText from "../components/BnbIconText";
import BnbMainView from "../components/BnbMainView";
import fonts from "../config/fonts";
import Separator from "../components/Separator";
import colors from "../config/colors";

const icon = require("../assets/bookbnb_1.png");

function SearchInputScreen({ navigation }) {
  const [_location_input, setLocationInput] = useState("");

  /**Lo creo aca y lo voy pasando como props a cada screen que lo va completando */
  const [_searchForm, setSearchForm] = useState({
    location: "",
    date_from: "",
    date_until: "",
    adult_qty: 0,
    children_qty: 0,
  });

  const _handleEndEditing = () => {
    navigation.navigate("SearchDateTimePicker", { location: _location_input });
  };

  return (
    <BnbMainView style={styles.background}>
      <Separator style={{ borderBottomWidth: 0 }}></Separator>
      <BnbBodyView>
        <TextInput
          placeholder="¿A donde vas?"
          style={styles.searchInputText}
          onChangeText={setLocationInput}
          onEndEditing={_handleEndEditing}
          value={_location_input}
        ></TextInput>
        <Separator></Separator>
        <BnbIconText logo={icon}>Descubri los destinos cercanos</BnbIconText>
      </BnbBodyView>
    </BnbMainView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.redBackground,
  },
  searchInputText: {
    fontSize: fonts.big,
  },
});

export default SearchInputScreen;

import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import BnbBodyView from "../components/BnbBodyView";
import BnbBubbleView from "../components/BnbBubbleView";
import BnbButton from "../components/BnbButton";
import BnbMainView from "../components/BnbMainView";
import fonts from "../config/fonts";
import Separator from "../helpers/Separator";

function SearchUsersScreen({ navigation }) {
  const [_username, setUsername] = useState("");

  const _handleSearchUserButtonPress = () => {
    if (_username != "") {
      navigation.navigate("SearchUsersResult", { search: _username });
    }
  };

  return (
    <BnbMainView>
      <Separator style={{ borderBottomWidth: 0 }}></Separator>
      <BnbBodyView>
        <BnbBubbleView style={{ alignItems: "flex-start" }}>
          <TextInput
            placeholder="Nombre del usuario"
            style={styles.searchInputText}
            onChangeText={setUsername}
            value={_username}
          />
        </BnbBubbleView>
        <Separator />
        <BnbButton
          title="Buscar Usuario"
          onPress={_handleSearchUserButtonPress}
        />
      </BnbBodyView>
    </BnbMainView>
  );
}

const styles = StyleSheet.create({
  searchInputText: {
    fontSize: fonts.big,
  },
});

export default SearchUsersScreen;

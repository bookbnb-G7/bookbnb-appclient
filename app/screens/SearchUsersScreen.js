import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import BnbBodyView from "../components/BnbBodyView";
import BnbBubbleView from "../components/BnbBubbleView";
import BnbButton from "../components/BnbButton";
import BnbMainView from "../components/BnbMainView";
import fonts from "../config/fonts";
import Separator from "../components/Separator";
import BnbFooterView from "../components/BnbFooterView";

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
      <BnbBodyView></BnbBodyView>
      <BnbFooterView>
        <BnbBubbleView style={{ alignItems: "flex-start" }}>
          <TextInput
            placeholder="Nombre de usuario (id)"
            style={styles.searchInputText}
            onChangeText={setUsername}
            value={_username}
          />
        </BnbBubbleView>
        <Separator style={{ borderBottomWidth: 0 }} />
        <BnbBubbleView style={{ alignItems: "flex-start" }}>
          <TextInput placeholder="Contraseña" style={styles.searchInputText} />
        </BnbBubbleView>
        <Separator />
        <BnbButton title="Ingresar" onPress={_handleSearchUserButtonPress} />
      </BnbFooterView>
    </BnbMainView>
  );
}

const styles = StyleSheet.create({
  searchInputText: {
    fontSize: fonts.big,
  },
});

export default SearchUsersScreen;

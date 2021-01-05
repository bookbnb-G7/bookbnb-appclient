import React from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import BnbBodyView from "../components/BnbBodyView";
import BnbBubbleView from "../components/BnbBubbleView";
import BnbMainView from "../components/BnbMainView";
import Separator from "../components/Separator";

function SearchRoomsScreen({ navigation }) {
  const _handleSearchButtonPress = () => {
    navigation.navigate("SearchInput");
  };
  return (
    <BnbMainView>
      <Separator style={{borderBottomWidth: 0}}/>
      <BnbBodyView>
        <BnbBubbleView>
          <TouchableOpacity onPress={_handleSearchButtonPress}>
            <Text>¿A dónde vas?</Text>
          </TouchableOpacity>
        </BnbBubbleView>
      </BnbBodyView>
    </BnbMainView>
  );
}

export default SearchRoomsScreen;

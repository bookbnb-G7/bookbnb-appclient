import React from "react";
import { StyleSheet, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import BnbBodyView from "../components/BnbBodyView";
import BnbButton from "../components/BnbButton";
import BnbMainView from "../components/BnbMainView";
import colors from "../config/colors";
import fonts from "../config/fonts";
import styling from "../config/styling";
import Separator from "../helpers/Separator";

function CalendarScreen({ route, navigation }) {
  const { location } = route.params;
  const _handleNextButtonPress = () => {
    navigation.navigate("SearchCounters");
  };
  return (
    <BnbMainView>
      <Text style={styles.bigText}>¿Cuando vas a estar ahí?</Text>
      <BnbBodyView>
        <Text style={styles.locationText}> {location}</Text>
        <Separator style={{ borderBottomWidth: 0 }} />
        <TextInput placeholder="Desde (dd/mm/yyyy)"></TextInput>
        <Separator></Separator>
        <TextInput placeholder="Hasta (dd/mm/yyyy)"></TextInput>
        <Separator></Separator>
        <BnbButton
          title="Siguiente"
          onPress={_handleNextButtonPress}
        ></BnbButton>
      </BnbBodyView>
    </BnbMainView>
  );
}

const styles = StyleSheet.create({
  bigText: {
    color: colors.graySoft,
    fontSize: fonts.bigBig,
    width: "60%",
    marginHorizontal: styling.bodyHPadding,
  },
  locationText: {
    alignSelf: "center",
    fontWeight: "bold",
  },
});

export default CalendarScreen;

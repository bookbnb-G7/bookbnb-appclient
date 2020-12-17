import React, { useState } from "react";
import BnbMainView from "../components/BnbMainView";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button, Platform, StyleSheet, Text, View } from "react-native";
import BnbBodyView from "../components/BnbBodyView";
import colors from "../config/colors";
import fonts from "../config/fonts";
import styling from "../config/styling";
import BnbButton from "../components/BnbButton";
import Separator from "../components/Separator";
import BnbTitleText from "../components/BnbTitleText";

function SearchDateTimePicker({ route, navigation }) {
  const { location } = route.params;
  const _handleNextButtonPress = () => {
    navigation.navigate("SearchCounters");
  };

  const [dateBegin, setDateBegin] = useState(new Date(1598051730000));
  const [dateEnd, setDateEnd] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [showBegin, setShowBegin] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  const onChangeBegin = (event, selectedDate) => {
    const currentDate = selectedDate || dateBegin;
    setShowBegin(Platform.OS === "ios");
    setDateBegin(currentDate);
  };

  const onChangeEnd = (event, selectedDate) => {
    const currentDate = selectedDate || dateEnd;
    setShowEnd(Platform.OS === "ios");
    setDateEnd(currentDate);
  };

  const showDatepicker = () => {
    setMode("date");
    setShowBegin(true);
  };

  const showDatepickerEnd = () => {
    setMode("date");
    setShowEnd(true);
  };

  return (
    <BnbMainView>
      <Text style={styles.bigText}>¿Cuando vas a estar ahí?</Text>
      <BnbBodyView>
        <Text style={styles.locationText}> {location}</Text>

        <View>
          <Text style={styles.date}>Fecha de inicio</Text>
          <Text style={styles.date}>
            {dateBegin.getDate()}-{dateBegin.getMonth()}-
            {dateBegin.getFullYear()}
          </Text>
        </View>
        <View>
          <Button onPress={showDatepicker} title="Fecha de inicio" />
        </View>
        <Separator></Separator>
        <View>
          <Text style={styles.date}>Fecha fin</Text>
          <Text style={styles.date}>
            {dateEnd.getDate()}-{dateEnd.getMonth()}-{dateEnd.getFullYear()}
          </Text>
        </View>
        <View>
          <Button onPress={showDatepickerEnd} title="Fecha fin" />
        </View>
        {showBegin && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dateBegin}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChangeBegin}
          />
        )}
        {showEnd && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dateEnd}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChangeEnd}
          />
        )}
        <Separator></Separator>
        <BnbButton
          title="Siguiente"
          onPress={_handleNextButtonPress}
          style={styles.button}
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
  date: {
    fontSize: fonts.big,
  },
  button: {
    width: "100%",
  },
});

export default SearchDateTimePicker;

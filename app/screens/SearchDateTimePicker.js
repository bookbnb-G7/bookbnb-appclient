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
  const { location, searchForm } = route.params;

  const [dateBegin, setDateBegin] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [showBegin, setShowBegin] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  const [pickedBeginDate, setPicked] = useState(false);
  const [pickedEndDate, setPickedEnd] = useState(false);

  const _handleNextButtonPress = () => {
    navigation.navigate("SearchCounters", { searchForm: searchForm });
  };

  const onChangeBegin = (event, selectedDate) => {
    const currentDate = selectedDate || dateBegin;
    if (currentDate < dateEnd || !pickedBeginDate) {
      setShowBegin(Platform.OS === "ios");
      setDateBegin(currentDate);
      setPicked(true);
      searchForm["date_begins"] = dateBegin.toISOString();
    } else {
      alert(
        "No puede elegir una fecha de comienzo posterior a la fecha de fin"
      );
    }
  };

  const onChangeEnd = (event, selectedDate) => {
    const currentDate = selectedDate || dateEnd;
    if (currentDate > dateBegin) {
      setShowEnd(Platform.OS === "ios");
      setDateEnd(currentDate);
      setPickedEnd(true);
      searchForm["date_ends"] = dateEnd.toISOString();
    } else {
      alert("No puede elegir una fecha de fin anterior a la fecha de comienzo");
    }
  };

  const showDatepicker = () => {
    setMode("date");
    setShowBegin(true);
  };

  const showDatepickerEnd = () => {
    setMode("date");
    setShowEnd(true);
  };

  const getMonth = (date) => {
    return date.getMonth() + 1;
  };

  return (
    <BnbMainView style={styles.background}>
      <Text style={styles.bigText}>¿Cuando vas a estar ahí?</Text>
      <BnbBodyView>
        <Text style={styles.locationText}> {location}</Text>

        <View>
          <Text style={styles.date}>Fecha de inicio</Text>
          <Text style={styles.date}>
            {dateBegin.getDate()}-{getMonth(dateBegin)}-
            {dateBegin.getFullYear()}
          </Text>
        </View>
        <View>
          <Button onPress={showDatepicker} title="Fecha de inicio" />
        </View>
        <Separator></Separator>
        {pickedBeginDate && (
          <View>
            <View>
              <Text style={styles.date}>Fecha fin</Text>
              <Text style={styles.date}>
                {dateEnd.getDate()}-{getMonth(dateEnd)}-{dateEnd.getFullYear()}
              </Text>
            </View>
            <View>
              <Button onPress={showDatepickerEnd} title="Fecha fin" />
            </View>
          </View>
        )}
        {showBegin && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dateBegin}
            mode={mode}
            is24Hour={true}
            display="default"
            minimumDate={new Date()}
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
            minimumDate={new Date()}
            onChange={onChangeEnd}
          />
        )}
        <Separator></Separator>
        {pickedBeginDate && pickedEndDate && (
          <BnbButton
            title="Siguiente"
            onPress={_handleNextButtonPress}
            style={styles.button}
          ></BnbButton>
        )}
      </BnbBodyView>
    </BnbMainView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.redBackground,
  },
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

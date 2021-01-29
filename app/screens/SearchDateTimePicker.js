import React, { useState } from "react";
import BnbMainView from "../components/BnbMainView";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform, StyleSheet, Text, View } from "react-native";
import BnbBodyView from "../components/BnbBodyView";
import colors from "../config/colors";
import fonts from "../config/fonts";
import styling from "../config/styling";
import BnbButton from "../components/BnbButton";
import Separator from "../components/Separator";
import BnbFormBubbleInfo from "../components/BnbFormBubbleInfo";

function SearchDateTimePicker({ route, navigation }) {
  const { location, coordinates } = route.params;

  const [dateBegin, setDateBegin] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [showBegin, setShowBegin] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  const [pickedBeginDate, setPicked] = useState(false);
  const [pickedEndDate, setPickedEnd] = useState(false);

  const _handleNextButtonPress = () => {
    navigation.navigate("SearchCounters", {
      location: location,
      dateBegin: dateBegin.toISOString(),
      dateEnd: dateEnd.toISOString(),
      coordinates: coordinates,
    });
  };

  const onChangeBegin = (event, selectedDate) => {
    const currentDate = selectedDate || dateBegin;
    setShowBegin(Platform.OS === "ios");
    if (currentDate < dateEnd || !pickedBeginDate) {
      setDateBegin(currentDate);
      setPicked(true);
    } else {
      alert(
        "No puede elegir una fecha de comienzo posterior a la fecha de fin"
      );
    }
  };

  const onChangeEnd = (event, selectedDate) => {
    const currentDate = selectedDate || dateEnd;
    setShowEnd(Platform.OS === "ios");
    if (currentDate >= dateBegin) {
      setDateEnd(currentDate);
      setPickedEnd(true);
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
      <Text style={styles.headerText}>¿Cuando vas a estar ahí?</Text>

      <View style={styles.innerContainer}>
        <BnbFormBubbleInfo
          iconName="location-sharp"
          iconColor={colors.white}
          text={location}
          style={styles.locationContainer}
        />
        <BnbBodyView style={styles.bodyView}>
          <View style={styles.dateTextAndButton}>
            <View style={styles.dateTextContainer}>
              <Text style={styles.dateTitle}>Fecha de inicio:</Text>
              <Text style={styles.date}>
                {dateBegin.getDate()}-{getMonth(dateBegin)}-
                {dateBegin.getFullYear()}
              </Text>
            </View>
            <View>
              <BnbButton
                onPress={showDatepicker}
                title="Fecha de inicio"
                buttonStyle={styles.dateButton}
                style={styles.dateButtonText}
              />
            </View>
          </View>
          <Separator />
          {pickedBeginDate && (
            <View style={styles.dateTextAndButton}>
              <View style={styles.dateTextContainer}>
                <Text style={styles.dateTitle}>Fecha de fin:</Text>
                <Text style={styles.date}>
                  {dateEnd.getDate()}-{getMonth(dateEnd)}-
                  {dateEnd.getFullYear()}
                </Text>
              </View>
              <View>
                <BnbButton
                  onPress={showDatepickerEnd}
                  title="Fecha de fin"
                  buttonStyle={styles.dateButton}
                  style={styles.dateButtonText}
                />
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
          {pickedBeginDate && pickedEndDate && <Separator />}
          {pickedBeginDate && pickedEndDate && (
            <BnbButton
              title="Siguiente"
              onPress={_handleNextButtonPress}
              buttonStyle={styles.nextButton}
              style={styles.nextButtonText}
            />
          )}
        </BnbBodyView>
      </View>
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
  bigText: {
    color: colors.graySoft,
    fontSize: fonts.bigBig,
    width: "60%",
    marginHorizontal: styling.bodyHPadding,
  },
  date: {
    fontSize: fonts.semi,
    fontFamily: "Raleway_500Medium",
  },
  dateTitle: {
    fontSize: fonts.big,
    textDecorationLine: "underline",
    fontFamily: "Raleway_500Medium",
    paddingBottom: 2,
  },
  dateTextContainer: {
    paddingBottom: 10,
    alignItems: "center",
  },
  dateButton: {
    borderRadius: 10,
    padding: 5,
    backgroundColor: colors.redAirBNB,
  },
  dateButtonText: {
    color: colors.white,
  },
  nextButton: {
    backgroundColor: colors.redAirBNB,
    borderRadius: 15,
    marginTop: 40,
  },
  nextButtonText: {
    color: colors.white,
  },
  headerText: {
    fontFamily: "Raleway_700Bold",
    fontSize: 25,
    paddingLeft: 11,
    paddingVertical: 15,
    color: colors.white,
  },
  bodyView: {
    width: "100%",
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  headersContainer: {
    alignItems: "center",
    paddingVertical: 10,
  },
  innerContainer: {
    width: "100%",
    flex: 1,
    backgroundColor: colors.redAirBNBSoft,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
  },
  dateTextAndButton: {
    paddingVertical: 5,
  },
  locationContainer: {
    justifyContent: "center",
    alignSelf: "center",
  },
});

export default SearchDateTimePicker;

import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {ButtonGroup, Divider} from "react-native-elements";
import BnbBodyView from "../components/BnbBodyView";
import BnbIconTextInput from "../components/BnbIconTextInput";
import BnbMainView from "../components/BnbMainView";
import colors from "../config/colors";
import BnbButton from "../components/BnbButton";
import { ScrollView } from "react-native-gesture-handler";

const OptionalFiltersScreen = ({ route, navigation }) => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [propertyTypesIndex, setPropertyTypesIndex] = useState([]);

  const propertyTypes = [
    "Casa",
    "Apartamento",
    "Hotel",
    "Cabaña",
    "Hostel",
    "Loft"
  ];

  const [errorMessage, setErrorMessage] = useState("");
  const searchForm = route.params;

  const handleMinPriceChange = (newValue) => {
    if (maxPrice !== "" && 
      (isNaN(newValue) || 
      parseInt(newValue) > parseInt(maxPrice) ||
      parseInt(newValue) < 0)) {
        setErrorMessage("Ingrese valores validos para los precios")
    } else {
      setErrorMessage("");
    }
    setMinPrice(newValue);
  }

  const handleMaxPriceChange = (newValue) => {
    if (minPrice !== "" && 
      (isNaN(newValue) || 
      parseInt(minPrice) > parseInt(newValue) ||
      parseInt(newValue) < 0)) {
        setErrorMessage("Ingrese valores validos para los precios")
    } else {
      setErrorMessage("");
    }
    setMaxPrice(newValue);
  }

  const handleButtonPress = (index) => {
    if (propertyTypesIndex.includes(index)) {
      setPropertyTypesIndex(propertyTypesIndex.filter((value) => value != index));
    } else {
      setPropertyTypesIndex(propertyTypesIndex.concat([index]));
    }
  }

  const handleNextButtonPress = () => {
    navigation.navigate("SearchResultRooms", {
      ...searchForm,
      "minPrice": minPrice,
      "maxPrice": maxPrice,
      "propertyTypes": propertyTypesIndex.map((index) => propertyTypes[index]),
    })
  }

  return (
    <BnbMainView style={styles.background}>
    <Text style={styles.headerText}>Filtros opcionales</Text>

    <BnbBodyView style={styles.bodyView}>
      <ScrollView>
        <Text style={styles.filterHeader}>Rango de precios:</Text>
        <View style={styles.priceContainer}>
          <BnbIconTextInput
            iconName="currency-usd"
            placeholder="Precio min."
            onChangeText={handleMinPriceChange}
            value={minPrice}
            style={{...styles.priceInputStyle, marginLeft: 0}}
            inputStyle={styles.normalText}
            keyboardType="numeric"
          />
          <Text>-</Text>
          <BnbIconTextInput
            iconName="currency-usd"
            placeholder="Precio max."
            onChangeText={handleMaxPriceChange}
            value={maxPrice}
            style={{...styles.priceInputStyle, marginRight: 0}}
            inputStyle={styles.normalText}
            keyboardType="numeric"
          />
        </View>

        <Divider style={{ width: "80%", margin: 20 }} />

        <Text style={styles.filterHeader}>Tipo de propiedad:</Text>

        <ButtonGroup
          containerStyle={{
            marginHorizontal: 0,
            borderWidth: 0,
          }}
          buttonStyle={{
            borderWidth: 1,
            borderRadius: 5,
            paddingVertical: 5,
          }}
          buttonContainerStyle={{
            flex: 0,
            marginVertical: 3,
          }}
          buttons={propertyTypes}
          onPress={handleButtonPress}
          selectedButtonStyle={{ backgroundColor: colors.redAirBNB }}
          selectedIndexes={propertyTypesIndex}
          vertical
        />

        <BnbButton
          title="Siguiente"
          onPress={handleNextButtonPress}
          buttonStyle={styles.nextButton}
          style={styles.nextButtonText}
        />
      </ScrollView>
      <Text style={styles.errorText}>{errorMessage}</Text>

    </BnbBodyView>

</BnbMainView>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.redAirBNB,
    paddingLeft: 5,
    paddingRight: 5,
    alignItems: "center",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  normalText: {
    fontFamily: "Raleway_400Regular",
    fontSize: 14,
  },
  nextButton: {
    backgroundColor: colors.redAirBNB,
    borderRadius: 15,
  },
  nextButtonText: {
    color: colors.white,
  },
  bubbleInfo: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.white,
    marginHorizontal: 5,
  },
  headerText: {
    fontFamily: "Raleway_700Bold",
    fontSize: 25,
    paddingLeft: 11,
    paddingVertical: 15,
    color: colors.white,
  },
  innerContainer: {
    width: "100%",
    flex: 1,
    backgroundColor: colors.redAirBNBSoft,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
  },
  errorText: {
    color: colors.error,
    textAlign: "left",
    fontFamily: "Raleway_400Regular",
  },
  bodyView: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 0,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    paddingTop: 10,
  },
  priceInputStyle: {
    flex: 1,
    paddingVertical: 0,
    marginHorizontal: 5,
  },
  filterHeader: {
    fontFamily: "Raleway_700Bold",
    fontSize: 18,
    alignSelf: "center",
    marginBottom: 5,
  },
})

export default OptionalFiltersScreen;
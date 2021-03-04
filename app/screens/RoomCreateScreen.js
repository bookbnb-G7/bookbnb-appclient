import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Keyboard, Alert } from "react-native";
import { Overlay } from "react-native-elements";
import DropDownPicker from "react-native-dropdown-picker";
import BnbAlert from "../components/BnbAlert";
import BnbBodyView from "../components/BnbBodyView";
import BnbButton from "../components/BnbButton";
import BnbMainView from "../components/BnbMainView";
import fonts from "../config/fonts";
import bnbStyleSheet from "../constant/bnbStyleSheet";
import httpPostTokenRequest from "../helpers/httpPostTokenRequest";
import isANumber from "../helpers/isANumber";
import BnbLoading from "../components/BnbLoading";
import constants from "../constant/constants";
import BnbSecureStore from "../classes/BnbSecureStore";
import urls from "../constant/urls";
import BnbFloatingTextInput from "../components/BnbFloatingTextInput";
import { ScrollView } from "react-native-gesture-handler";
import GooglePlacesInput from "../components/GooglePlacesInput";
import colors from "../config/colors";

function RoomCreateScreen({ navigation }) {
  const [_room, setRoom] = useState({
    title: "",
    description: "",
    type: "",
    price_per_day: "",
    latitude: "",
    longitude: "",
    location: "",
    capacity: "",
  });
  const [_is_awaiting, setIsAwaiting] = useState(false);
  const [_showButtonGroup, setShowButtonGroup] = useState(false);
  const [storedUser, setStoredUser] = useState();
  const [_selectedIndexes, setSelectedIndexes] = useState([]);
  const [propertyType, setPropertyType] = useState(null);

  const [tempLocation, setTempLocation] = useState("");
  const [locationInput, setLocationInput] = useState("");

  const [visible, setVisible] = useState(false);

  const ref_title = useRef();
  const ref_description = useRef();
  const ref_type = useRef();
  const ref_capacity = useRef();
  const ref_price_per_day = useRef();
  const ref_scrollview = useRef();

  /**Repetido de OptionalFiltersSCreen */
  const propertyTypes = [
    "Casa",
    "Apartamento",
    "Hotel",
    "Cabaña",
    "Hostel",
    "Loft",
  ];

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const _handleTextChange = (key, value) => {
    setRoom({ ..._room, [key]: value });
  };

  const _handleApiResponse = (room) => {
    setIsAwaiting(false);
    navigation.navigate("ImagesEdit", {
      room_id: room.id,
      isCreatingRoom: true,
    });
  };

  const _handleApiError = (error) => {
    BnbAlert(
      "Creación de habitación",
      "No se pudo crear la habitación",
      "Entendido",
      false
    );
    setIsAwaiting(false);
  };

  const _handleConfirmCreateRoom = () => {
    if (
      isANumber(_room.price_per_day.toString()) &&
      _room.price_per_day > 0 &&
      _room.latitude !== "" &&
      _room.longitude !== ""
    ) {
      setIsAwaiting(true);
      httpPostTokenRequest(
        "POST",
        urls.URL_ROOMS,
        _room,
        {
          "Content-Type": "application/json",
          "x-access-token": storedUser.auth_token,
        },
        _handleApiResponse,
        _handleApiError
      );
    } else {
      alert("Debe completar todos los campos para poder continuar");
    }
  };

  const _handleNextButtonPress = () => {
    Alert.alert("Crear Publicación", "Crear esta publicación tiene un costo", [
      { text: "Cancelar", style: "cancel" },
      { text: "Confirmar", onPress: _handleConfirmCreateRoom },
    ]);
  };

  const _handleButtonGroupPress = (index) => {
    if (!_selectedIndexes.includes(index)) {
      setSelectedIndexes([index]);
      setRoom({ ..._room, ["type"]: propertyTypes[index] });
    }
  };

  const _handleLocationDropdownPress = (selection) => {
    setPropertyType(selection);
    setRoom({ ..._room, ["type"]: selection });
  };

  const _handleEndEditingLocation = (location, coordinates) => {
    setRoom({
      ..._room,
      location: location,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    });
    setTempLocation(location);
    toggleOverlay();
  };

  useEffect(() => {
    BnbSecureStore.read(constants.CACHE_USER_KEY).then((response) => {
      setStoredUser(response);
    });
  }, []);

  if (_is_awaiting) {
    return <BnbLoading text="Creando habitacion..."></BnbLoading>;
  } else {
    return (
      <BnbMainView>
        <BnbBodyView style={styles.bodyView}>
          <Text style={bnbStyleSheet.headerTextBlack}>
            Crear una habitación
          </Text>
          <ScrollView keyboardShouldPersistTaps="always" ref={ref_scrollview}>
            <View>
              <BnbFloatingTextInput
                name="Titulo"
                id={"title"}
                object={_room}
                onChange={_handleTextChange}
                inputRef={ref_title}
                onSubmit={() => ref_description.current?.focus()}
                returnKeyType="next"
              />
              <BnbFloatingTextInput
                name="Descripcion"
                id={"description"}
                object={_room}
                onChange={_handleTextChange}
                inputRef={ref_description}
                onSubmit={() => ref_price_per_day.current?.focus()}
                returnKeyType="next"
                multiline={true}
                containerStyle={styles.descriptionContainerStyle}
                countdownLabel="restantes"
                maxLength={constants.MAX_DESCRIPTION_LENGTH}
                showCountdown={true}
                showCountdownStyles={styles.showCountdownStyles}
              />
              <BnbFloatingTextInput
                name="Precio por dia"
                id={"price_per_day"}
                object={_room}
                onChange={_handleTextChange}
                inputRef={ref_price_per_day}
                onSubmit={() => ref_capacity.current?.focus()}
                keyboardType="numeric"
                returnKeyType="next"
              />
              <BnbFloatingTextInput
                name="Capacidad"
                id={"capacity"}
                object={_room}
                returnKeyType="next"
                onChange={_handleTextChange}
                inputRef={ref_capacity}
                keyboardType="numeric"
                onSubmit={() => {
                  Keyboard.dismiss();
                  ref_type.current?.open();
                  ref_scrollview.current?.scrollToEnd();
                }}
              />
              <DropDownPicker
                items={propertyTypes.map((prop) => {
                  return {
                    label: prop,
                    value: prop,
                  };
                })}
                containerStyle={styles.dropdownContainerStyle}
                style={styles.dropDownStyle}
                dropDownStyle={styles.dropDownBoxStyle}
                placeholder="Tipo de propiedad"
                placeholderStyle={styles.dropdownPlaceholderStyle}
                onChangeItem={(item) =>
                  _handleLocationDropdownPress(item.value)
                }
                selectedLabelStyle={styles.dropdownSelectedtLabelStyle}
                itemStyle={styles.dropdownItemStyle}
                ref={ref_type}
                defaultValue={propertyType}
                labelStyle={styles.dropdownItemLabelStyle}
              />

              <BnbButton
                title="Ingresar ubicacion"
                onPress={toggleOverlay}
                buttonStyle={styles.locationButtonContainerStyle}
                style={styles.locationButtonTextStyle}
              />
              <Overlay
                animationType="slide"
                isVisible={visible}
                onBackdropPress={toggleOverlay}
              >
                <GooglePlacesInput
                  placeholder="Direccion"
                  onChangeText={setTempLocation}
                  onEndEditing={_handleEndEditingLocation}
                  onPress={setLocationInput}
                  value={tempLocation}
                  object={_room}
                  locationType="address"
                />
              </Overlay>
              <Text style={bnbStyleSheet.normalText}>
                Ubicacion:{" "}
                {tempLocation !== ""
                  ? tempLocation
                  : "Seleccione una ubicacion"}
              </Text>
            </View>
          </ScrollView>
          {storedUser && (
            <BnbButton
              title="Continuar"
              onPress={_handleNextButtonPress}
              buttonStyle={styles.continueButtonContainerStyle}
              style={styles.continueButtonTextStyle}
            />
          )}
        </BnbBodyView>
      </BnbMainView>
    );
  }
}

const styles = StyleSheet.create({
  titleText: {
    alignSelf: "center",
    fontSize: fonts.bigBig,
  },
  bodyView: {
    justifyContent: "center",
  },
  descriptionContainerStyle: {},
  showCountdownStyles: {
    paddingRight: 20,
    paddingBottom: 1,
    fontSize: 12,
    fontFamily: "Raleway_400Regular",
  },
  dropdownContainerStyle: {
    height: 50,
    marginVertical: 6,
  },
  dropDownBoxStyle: {
    height: 150,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    borderWidth: 1,
    borderColor: colors.black,
    paddingBottom: 20,
    borderTopWidth: 1,
  },
  dropDownStyle: {
    borderWidth: 1,
    borderColor: colors.black,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  dropdownPlaceholderStyle: {
    color: colors.textSoftBlack,
    fontFamily: "Raleway_400Regular",
  },
  dropdownSelectedtLabelStyle: {
    color: colors.textSoftBlack,
  },
  dropdownItemStyle: {
    justifyContent: "flex-start",
  },
  dropdownItemLabelStyle: {
    color: colors.textSoftBlack,
    fontFamily: "Raleway_400Regular",
  },
  continueButtonContainerStyle: {
    backgroundColor: colors.redAirBNB,
    marginBottom: 10,
  },
  continueButtonTextStyle: {
    color: colors.white,
  },
  locationButtonContainerStyle: {
    backgroundColor: colors.redAirBNBSoft,
    marginTop: 6,
    marginBottom: 100,
  },
  locationButtonTextStyle: {
    color: colors.white,
  },
});

export default RoomCreateScreen;

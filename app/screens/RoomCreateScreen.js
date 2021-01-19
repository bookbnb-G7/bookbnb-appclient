import React, { useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import BnbAlert from "../components/BnbAlert";
import BnbBodyView from "../components/BnbBodyView";
import BnbButton from "../components/BnbButton";
import BnbContainer from "../components/BnbContainer";
import BnbMainView from "../components/BnbMainView";
import BnbTextInputObject from "../components/BnbTextInputObject";
import BnbTitleText from "../components/BnbTitleText";
import Separator from "../components/Separator";
import fonts from "../config/fonts";
import bnbStyleSheet from "../constant/bnbStyleSheet";
import httpPostTokenRequest from "../helpers/httpPostTokenRequest";
import isANumber from "../helpers/isANumber";
import BnbLoading from "../components/BnbLoading";
import constants from "../constant/constants";
import BnbSecureStore from "../classes/BnbSecureStore";
import urls from "../constant/urls";
import BnbFloatingTextInput from "../components/BnbFloatingTextInput";
import { ButtonGroup, Divider } from "react-native-elements";
import BnbButtonGroup from "../components/BnbButtonGroup";
import { ScrollView } from "react-native-gesture-handler";
import BnbIconTextInput from "../components/BnbIconTextInput";
import BnbIconText from "../components/BnbIconText";
import httpGetTokenRequest from "../helpers/httpGetTokenRequest";

function RoomCreateScreen({ navigation }) {
  const [_room, setRoom] = useState({
    title: "",
    description: "",
    type: "",
    price_per_day: "",
    latitude: 0,
    longitude: 0,
    location: "",
    capacity: 0,
  });
  const [_is_awaiting, setIsAwaiting] = useState(false);
  const [_showButtonGroup, setShowButtonGroup] = useState(false);
  const [storedUser, setStoredUser] = useState();
  const [_selectedIndexes, setSelectedIndexes] = useState([]);

  const ref_title = useRef();
  const ref_description = useRef();
  const ref_type = useRef();
  const ref_price_per_day = useRef();
  const ref_latitude = useRef();
  const ref_longitude = useRef();
  const ref_location = useRef();
  const ref_capacity = useRef();

  /**Repetido de OptionalFiltersSCreen */
  const propertyTypes = [
    "Casa",
    "Apartamento",
    "Hotel",
    "Cabaña",
    "Hostel",
    "Loft",
  ];

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

  const _handleNextButtonPress = () => {
    if (isANumber(_room.price_per_day.toString())) {
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
      alert("El precio por dia debe ser un valor numerico");
    }
  };

  const _handleButtonGroupPress = (index) => {
    if (!_selectedIndexes.includes(index)) {
      setSelectedIndexes([index]);
      setRoom({ ..._room, ["type"]: propertyTypes[index] });
    }
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
        <BnbBodyView>
          <ScrollView>
            <Text style={bnbStyleSheet.headerTextBlack}>
              Crear una habitación
            </Text>
            <Divider style={bnbStyleSheet.divider} />
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
                onSubmit={() => ref_type.current?.focus()}
                returnKeyType="next"
              />
              <Text>Tipo: {propertyTypes[_selectedIndexes[0]]}</Text>
              {_showButtonGroup && (
                <BnbButtonGroup
                  buttons={propertyTypes}
                  selectedIndexes={_selectedIndexes}
                  onPress={_handleButtonGroupPress}
                ></BnbButtonGroup>
              )}
              <BnbButton
                title="Seleccionar tipo"
                onPress={() => setShowButtonGroup(!_showButtonGroup)}
              ></BnbButton>
              <BnbFloatingTextInput
                name="Precio por dia"
                id={"price_per_day"}
                object={_room}
                onChange={_handleTextChange}
                inputRef={ref_price_per_day}
                onSubmit={() => ref_latitude.current?.focus()}
                keyboardType="numeric"
                returnKeyType="next"
              />
              <BnbFloatingTextInput
                name="Latitud"
                id={"latitude"}
                object={_room}
                onChange={_handleTextChange}
                inputRef={ref_latitude}
                onSubmit={() => ref_longitude.current?.focus()}
                keyboardType="numeric"
                returnKeyType="next"
              />
              <BnbFloatingTextInput
                name="Longitud"
                id={"longitude"}
                object={_room}
                onChange={_handleTextChange}
                inputRef={ref_longitude}
                onSubmit={() => ref_location.current?.focus()}
                keyboardType="numeric"
                returnKeyType="next"
              />
              <BnbFloatingTextInput
                name="Locacion"
                id={"location"}
                object={_room}
                onChange={_handleTextChange}
                inputRef={ref_location}
                onSubmit={() => ref_capacity.current?.focus()}
                returnKeyType="next"
              />
              <BnbFloatingTextInput
                name="Capacidad"
                id={"capacity"}
                object={_room}
                onChange={_handleTextChange}
                inputRef={ref_capacity}
                keyboardType="numeric"
                onSubmit={_handleNextButtonPress}
              />
            </View>
            {storedUser && (
              <BnbButton title="Continuar" onPress={_handleNextButtonPress} />
            )}
          </ScrollView>
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
});

export default RoomCreateScreen;

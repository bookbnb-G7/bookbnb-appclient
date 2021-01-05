import React, { useEffect, useState } from "react";
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

function RoomCreateScreen({ navigation }) {
  const [_room, setRoom] = useState({
    type: "",
    price_per_day: "",
    latitude: 0,
    longitude: 0,
    capacity: 1,
  });
  const [_is_awaiting, setIsAwaiting] = useState(false);
  const [storedUser, setStoredUser] = useState();

  useEffect(() => {
    BnbSecureStore.read(constants.CACHE_USER_KEY).then((response) => {
      setStoredUser(response);
    });
  }, []);

  const _handleTextChange = (key, value) => {
    setRoom({ ..._room, [key]: value });
  };

  const _handleApiResponse = (data) => {
    BnbAlert(
      "Creación de habitación",
      "Habitacion creada con exito",
      "Entendido",
      false
    );
    setIsAwaiting(false);
    navigation.navigate("Profile");
    //TODO: navigation.navigate("ImageEditScreen")
  };

  const _handleApiError = (error) => {
    BnbAlert(
      "Creación de habitación",
      "No se pudo crear la habitación",
      "Entendido",
      false
    );
    setIsAwaiting(false);
    navigation.navigate("Profile");
  };

  const _handleNextButtonPress = () => {
    if (isANumber(_room.price_per_day.toString())) {
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
      setIsAwaiting(true);
    } else {
      alert("El precio por dia debe ser un valor numerico");
    }
  };

  const _handleGoBackButtonPress = () => {
    navigation.goBack();
  };

  /**
   * if(continue){
   * <PickAnImage>
   * }
   */

  if (_is_awaiting) {
    return <BnbLoading text="Creando habitacion..."></BnbLoading>;
  } else {
    return (
      <BnbMainView>
        <BnbBodyView>
          <BnbTitleText style={styles.titleText}>
            Crear una habitación
          </BnbTitleText>
          <Separator />
          <View style={styles.roomForm}>
            <BnbTextInputObject
              name="Breve descripcion de la habitacion"
              id="type"
              object={_room}
              editable={true}
              onChange={_handleTextChange}
              customStyle={bnbStyleSheet.bubbleContainer}
            ></BnbTextInputObject>
            <BnbTextInputObject
              name="Precio por dia"
              id="price_per_day"
              object={_room}
              editable={true}
              onChange={_handleTextChange}
              customStyle={bnbStyleSheet.bubbleContainer}
            ></BnbTextInputObject>

            <Text style={styles.titleText}>Vista previa</Text>
            <Text>Descripcion: {_room.type}</Text>
            <Text>Precio por dia: {_room.price_per_day}</Text>
          </View>
          <BnbContainer>
            <BnbButton title="Cancelar" onPress={_handleGoBackButtonPress} />
            {storedUser && (
              <BnbButton title="Continuar" onPress={_handleNextButtonPress} />
            )}
          </BnbContainer>
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

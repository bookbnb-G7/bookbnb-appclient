import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import BnbAlert from "../components/BnbAlert";
import BnbBodyView from "../components/BnbBodyView";
import BnbButton from "../components/BnbButton";
import BnbContainer from "../components/BnbContainer";
import BnbMainView from "../components/BnbMainView";
import BnbTextInput from "../components/BnbTextInput";
import BnbTextInputObject from "../components/BnbTextInputObject";
import BnbTitleText from "../components/BnbTitleText";
import Separator from "../components/Separator";
import fonts from "../config/fonts";
import bnbStyleSheet from "../constant/bnbStyleSheet";
import httpPostTokenRequest from "../helpers/httpPostTokenRequest";
import isANumber from "../helpers/isANumber";
import BnbLoading from "../components/BnbLoading";
import firebase from "../database/firebase";

function RoomCreateScreen({ navigation }) {
  const [_room, setRoom] = useState({
    type: "",
    price_per_day: "",
  });
  const [_is_awaiting, setIsAwaiting] = useState(false);
  const [_initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [token, setToken] = useState("");
  const rooms_url = "http://bookbnb-appserver.herokuapp.com/rooms/";

  const _handleTextChange = (key, value) => {
    setRoom({ ..._room, [key]: value });
  };

  function onAuthStateChanged(user) {
    setUser(user);
    user.getIdToken().then((response) => {
      setToken(response);
      console.log("Auth token:" + token);
    });
    if (_initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const suscriber = firebase.auth.onAuthStateChanged(onAuthStateChanged);
    return suscriber; // unsuscribe on unmount
  }, []);

  const _handleApiResponse = (data) => {
    /**BnbAlert(
      "Creación de habitación",
      "Habitacion creada con exito",
      "Entendido",
      false
    );*/
    //navigation.navigate("Profile");
    //TODO: navigation.navigate("ImageEditScreen")

    setIsAwaiting(false);
  };

  const _handleApiError = (error) => {
    /**BnbAlert(
      "Creación de habitación",
      "No se pudo crear la habitación",
      "Entendido",
      false
    );*/
    setIsAwaiting(false);
    //navigation.navigate("Profile");
  };

  const _handleNextButtonPress = () => {
    if (isANumber(_room.price_per_day.toString())) {
      httpPostTokenRequest(
        "POST",
        rooms_url,
        {
          type: _room.type,
          price_per_day: _room.price_per_day,
        },
        { "Content-Type": "application/json", "x-access-token": token },
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

  if (_initializing) return <BnbLoading></BnbLoading>;

  if (_is_awaiting) {
    return (
      <View>
        <Text style={{ alignSelf: "center", justifyContent: "center" }}>
          Creando habitacion...
        </Text>
      </View>
    );
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
            <Text>Cuenta actual: {user.email}</Text>
          </View>
          <BnbContainer>
            <BnbButton title="Continuar" onPress={_handleNextButtonPress} />
            <BnbButton title="Cancelar" onPress={_handleGoBackButtonPress} />
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

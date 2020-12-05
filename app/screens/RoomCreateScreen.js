import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import BnbBodyView from "../components/BnbBodyView";
import BnbButton from "../components/BnbButton";
import BnbContainer from "../components/BnbContainer";
import BnbMainView from "../components/BnbMainView";
import BnbTextInput from "../components/BnbTextInput";
import BnbTitleText from "../components/BnbTitleText";
import Separator from "../components/Separator";
import fonts from "../config/fonts";
import httpPostRequest from "../helpers/httpPostRequest";
import isANumber from "../helpers/isANumber";

function RoomCreateScreen({ route, navigation }) {
  const { user_id, user } = route.params;
  const [_type, setRoomType] = useState("");
  const [_price_per_day, setRoomPPD] = useState(0);

  const [_is_awaiting, setIsAwaiting] = useState(false);

  const rooms_url = "http://bookbnb-appserver.herokuapp.com/rooms/";

  const _handleTextChange = (id, value) => {
    if (id == "price_per_day") {
      setRoomPPD(value);
    } else if (id == "type") {
      setRoomType(value);
    }
  };

  const _handleApiResponse = (data) => {
    Alert.alert(
      "Creación de habitación",
      "Habitación creada con exito",
      [
        {
          text: "Entendido",
        },
      ],
      { cancelable: false }
    );
    //navigation.navigate("Profile");
    //TODO: navigation.navigate("ImageEditScreen")
  };

  const _handleApiError = (error) => {
    Alert.alert(
      "Error",
      "Ocurrio un error",
      [
        {
          text: error.message,
        },
      ],
      { cancelable: false }
    );
    navigation.navigate("Profile");
  };

  const _handleNextButtonPress = () => {
    if (isANumber(_price_per_day.toString())) {
      httpPostRequest(
        "POST",
        rooms_url,
        {
          type: _type,
          owner: user.firstname,
          owner_id: user_id,
          price_per_day: _price_per_day,
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
            <BnbTextInput
              id="type"
              left="Breve descripcion de la habitacion"
              value={_type}
              editable={true}
              onChange={_handleTextChange}
            />
            <BnbTextInput
              id="price_per_day"
              left="Precio por dia"
              value={_price_per_day.toString()}
              editable={true}
              onChange={_handleTextChange}
            />
            <Text style={styles.titleText}>Vista previa</Text>
            <Text>Descripcion: {_type}</Text>
            <Text>Precio por dia: {_price_per_day}</Text>
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

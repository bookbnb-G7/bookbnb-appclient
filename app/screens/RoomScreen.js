import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import BnbBodyView from "../components/BnbBodyView";
import BnbButton from "../components/BnbButton";
import BnbFooterView from "../components/BnbFooterView";
import BnbMainView from "../components/BnbMainView";
import RoomReview from "../components/RoomReview";
import fonts from "../config/fonts";
import styling from "../config/styling";
import Separator from "../helpers/Separator";

const image = require("../assets/bookbnb_1.png");

/**TODO: los fetch son los mismos que para el room preview, ponerlos en un customhook o helper */
function RoomScreen({ route, navigation }, props) {
  const room = route.params;

  const [_reviews, setReviews] = useState({});
  const [_error, setError] = useState(false);
  const [_is_loaded, setIsLoaded] = useState(false);

  const _handleGoBackButtonPress = () => navigation.goBack();

  useEffect(() => {
    fetch(
      "http://bookbnb-appserver.herokuapp.com/rooms/" + room.id + "/reviews"
    )
      .then((response) => response.json())
      .then(
        (response) => {
          setReviews(response);
          setIsLoaded(true);
        },
        (error) => {
          setError(error);
          setIsLoaded(true);
        }
      );
  }, []);

  if (_error) {
    return (
      <View>
        <Text>{_error.message}</Text>
      </View>
    );
  } else if (!_is_loaded) {
    return (
      <View>
        <Text>Cargando...</Text>
      </View>
    );
  } else {
    return (
      <BnbMainView>
        <Image style={styles.roomImage} source={image}></Image>
        <BnbBodyView>
          <View style={styles.roomInfoContainer}>
            <Text>TODO Rating</Text>
            <Text style={styles.titleText}>{room.type}</Text>
            <Text style={styles.priceText}>
              Precio por dia: {room.price_per_day}
            </Text>
          </View>
          <View style={styles.roomDescriptionContainer}>
            <Text>Aca deberia haber una descripcion detallada del room</Text>
          </View>
          <Separator></Separator>
          <ScrollView style={styles.reviewsContainer}>
            <Text>Reseñas</Text>
            {_reviews.reviews.map((item, index) => (
              <View key={item.id}>
                <RoomReview
                  left={<Text>{item.reviewer}</Text>}
                  right={<Text>{item.review}</Text>}
                ></RoomReview>
              </View>
            ))}
          </ScrollView>
        </BnbBodyView>
        <BnbFooterView>
          <BnbButton
            title="Volver atras"
            onPress={_handleGoBackButtonPress}
          ></BnbButton>
        </BnbFooterView>
      </BnbMainView>
    );
  }
}

const dimensions = Dimensions.get("window");

const styles = StyleSheet.create({
  roomImage: {
    width: "100%",
    height: 200,
    borderRadius: styling.mediumCornerRadius,
  },
  roomInfoContainer: {
    marginVertical: styling.separator,
  },
  titleText: {
    fontSize: fonts.big,
    fontWeight: fonts.bold,
  },
  priceText: {
    fontSize: fonts.big,
    fontWeight: fonts.bold,
  },
  reviewsContainer: {},
});

export default RoomScreen;

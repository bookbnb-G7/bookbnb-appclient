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
function RoomScreen({ route, navigation }) {
  const { room, ratings } = route.params;

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

  const [_average_rating, setAverageRating] = useState(0);
  useEffect(() => {
    const getAverageRating = () => {
      let average_rating = 0;
      ratings.ratings.forEach(function (item, index, array) {
        average_rating += item.rating;
      });
      average_rating = average_rating / ratings.ratings.length;
      setAverageRating(average_rating);
    };
    getAverageRating();
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
        <ScrollView>
          <Image style={styles.roomImage} source={image}></Image>
          <BnbBodyView>
            <View style={styles.roomInfoContainer}>
              <Text>{_average_rating} de 5 estrellas</Text>
              <Text style={styles.titleText}>{room.type}</Text>
              <Text style={styles.priceText}>
                Precio por dia: {room.price_per_day}
              </Text>
            </View>
            <View style={styles.roomDescriptionContainer}>
              <Text>Aca deberia haber una descripcion detallada del room</Text>
            </View>
            <Separator></Separator>
            <View style={styles.reviewsContainer}>
              <Text style={styles.reviewsTitleText}>Reseñas</Text>
              {_reviews.reviews.map((item, index) => (
                <View key={item.id}>
                  <RoomReview
                    reviewer={item.reviewer}
                    date={item.created_at}
                    review={item.review}
                  ></RoomReview>
                </View>
              ))}
            </View>
          </BnbBodyView>
        </ScrollView>
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
  },
  priceText: {
    fontSize: fonts.big,
    fontWeight: fonts.bold,
  },
  reviewsContainer: {},
  reviewsTitleText: {
    fontSize: fonts.big,
    alignSelf: "center",
  },
});

export default RoomScreen;

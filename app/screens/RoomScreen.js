import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import BnbBodyView from "../components/BnbBodyView";
import BnbButton from "../components/BnbButton";
import BnbFooterView from "../components/BnbFooterView";
import BnbTitleText from "../components/BnbTitleText";
import BnbMainView from "../components/BnbMainView";
import RoomReview from "../components/RoomReview";
import colors from "../config/colors";
import fonts from "../config/fonts";
import styling from "../config/styling";
import constants from "../constant/constants";
import Separator from "../helpers/Separator";
import Counter from "../components/Counter";

const image = require("../assets/bookbnb_1.png");

/**TODO: los fetch son los mismos que para el room preview, ponerlos en un customhook o helper */
function RoomScreen({ route, navigation }) {
  const { room, ratings } = route.params;

  const [_reviews, setReviews] = useState({});
  const [_error, setError] = useState(false);
  const [_is_loaded, setIsLoaded] = useState(false);

  const [_average_rating, setAverageRating] = useState(0);

  const [_review, setReview] = useState("string");
  const [_reviewResponse, setReviewResponse] = useState({});

  const [_rating, setRating] = useState({
    quantity: 0,
  });

  const [_ratingResponse, setRatingResponse] = useState({});

  const URL =
    "http://bookbnb-appserver.herokuapp.com/rooms/" + room.id + "/reviews";

  const URL_RATINGS =
    "http://bookbnb-appserver.herokuapp.com/rooms/" + room.id + "/ratings";

  const _handleGoBackButtonPress = () => navigation.goBack();

  /**TODO: contador no se actualiza, necesario un reset*/
  const _handleRatingChange = (counter, offset) => {
    const cpyCounter = counter;
    /**Nunca modificar el state directamente, modificar una copia*/
    cpyCounter.quantity += offset;
    setRating(cpyCounter);
  };

  const _handlePostAReview = () => {
    if (_review !== "" || _review === "string") {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          review: _review,
          reviewer: "App",
          reviewer_id: 0,
        }),
      };
      fetch(URL, requestOptions)
        .then((response) => response.json())
        .then((data) => setReviewResponse(data));
      setReview("");
    } else {
      alert("No puede publicar una reseña vacia");
    }
  };

  const _handleRateRoomButtonPress = () => {
    if (_rating.quantity !== 0) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating: _rating.quantity,
          reviewer: "App",
          reviewer_id: 0,
        }),
      };
      fetch(URL_RATINGS, requestOptions)
        .then((response) => response.json())
        .then((data) => setRatingResponse(data));
      setRating({ quantity: 0 });
    } else {
      alert("Puntaje no puede ser 0");
    }
  };

  useEffect(() => {
    fetch(URL)
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
              <Text style={styles.roomTitleText}>{room.type}</Text>
              <Text style={styles.priceText}>
                Precio por dia: {room.price_per_day}
              </Text>
            </View>
            <View style={styles.roomDescriptionContainer}>
              <Text>Aca deberia haber una descripcion detallada del room</Text>
            </View>
            <Separator></Separator>
            <View style={styles.reviewsContainer}>
              <BnbTitleText style={styles.titleText}>Reseñas</BnbTitleText>
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
            <Separator />
            <View style={styles.writeAReviewContainer}>
              <BnbTitleText style={styles.titleText}>
                Deja tu reseña
              </BnbTitleText>
              <TextInput
                multiline
                placeholder="Escribe aqui tu reseña"
                maxLength={constants.maxTextLength}
                onChangeText={setReview}
                style={styles.textInput}
              ></TextInput>
              <BnbButton title="Publicar" onPress={_handlePostAReview} />
            </View>
            <Separator />
            <View style={styles.rateRoomContainer}>
              <BnbTitleText style={styles.titleText}>
                Puntua esta habitación
              </BnbTitleText>
              <Counter
                title="Rating"
                onIncrement={_handleRatingChange}
                counter={_rating}
                maxCount={constants.maxRating}
              ></Counter>
              <BnbButton title="Puntuar" onPress={_handleRateRoomButtonPress} />
            </View>
          </BnbBodyView>
        </ScrollView>
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
  roomTitleText: {
    fontSize: fonts.big,
  },
  priceText: {
    fontSize: fonts.big,
    fontWeight: fonts.bold,
  },
  reviewsContainer: {},
  writeAReviewContainer: {},
  titleText: {
    alignSelf: "center",
    color: "black",
  },
  textInput: {
    borderRadius: styling.smallCornerRadius,
    backgroundColor: colors.graySoft,
    borderWidth: 1,
    marginVertical: styling.separator,
  },
});

export default RoomScreen;

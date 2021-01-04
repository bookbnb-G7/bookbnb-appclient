import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import BnbBodyView from "../components/BnbBodyView";
import BnbButton from "../components/BnbButton";
import BnbTitleText from "../components/BnbTitleText";
import BnbMainView from "../components/BnbMainView";
import RoomReview from "../components/RoomReview";
import colors from "../config/colors";
import fonts from "../config/fonts";
import styling from "../config/styling";
import constants from "../constant/constants";
import Separator from "../components/Separator";
import Counter from "../components/Counter";
import httpPostTokenRequest from "../helpers/httpPostTokenRequest";
import urls from "../constant/urls";
import BnbSecureStore from "../classes/BnbSecureStore";
import httpGetTokenRequest from "../helpers/httpGetTokenRequest";
import BnbLoading from "../components/BnbLoading";

const image = require("../assets/bookbnb_1.png");

function RoomScreen({ route, navigation }) {
  const room_id = route.params?.room_id;
  const searchForm = route.params?.searchForm;
  const [_room, setRoom] = useState();
  const [_is_loading, setIsLoading] = useState(true);

  const [_reviews, setReviews] = useState(undefined);
  const [_average_rating, setAverageRating] = useState(0);
  const [_review, setReview] = useState("");
  const [_rating, setRating] = useState({
    quantity: 0,
  });

  const [_photos, setPhotos] = useState();

  const _handleRatingChange = (counter, offset) => {
    const new_quantity = _rating.quantity + offset;
    setRating((prevState) => ({
      ...prevState,
      quantity: new_quantity,
    }));
  };

  const _handleApiResponse = (data) => {
    setIsLoading(false);
  };

  const _handleApiError = () => {
    setIsLoading(false);
  };

  const _handlePhotosResponse = (photos) => {
    setPhotos(photos);
  };

  const _handlePostAReview = () => {
    if (_review != "") {
      setIsLoading(true);
      httpPostTokenRequest(
        "POST",
        urls.URL_ROOMS + "/" + room_id + "/reviews",
        {
          review: _review,
        },
        {
          "Content-Type": "application/json",
          "x-access-token": storedUser.auth_token,
        },
        _handleApiResponse,
        _handleApiError
      );
      setReview("");
    } else {
      alert("No puede publicar una reseña vacia");
    }
  };

  const _handleRateRoomButtonPress = () => {
    if (_rating.quantity !== 0) {
      setIsLoading(true);
      httpPostTokenRequest(
        "POST",
        urls.URL_ROOMS + "/" + room_id + "/ratings",
        {
          rating: _rating.quantity,
        },

        {
          "Content-Type": "application/json",
          "x-access-token": storedUser.auth_token,
        },
        _handleApiResponse,
        _handleApiError
      );
      setRating({ quantity: 0 });
    } else {
      alert("Puntaje no puede ser 0");
    }
  };

  const _handleRoomDetailsButtonPress = () => {
    navigation.navigate("RoomDetails", { room: _room });
  };

  const _handleRoomBooking = () => {
    searchForm["user_id"] = storedUser.userData.id;
    console.log(JSON.stringify(searchForm));
    /**POST Add Booking To Room */
    httpPostTokenRequest(
      "POST",
      urls.URL_ROOMS + "/" + room_id + "/bookings",
      searchForm,
      { "x-access-token": storedUser.auth_token },
      _handleApiResponse,
      _handleApiError
    );
  };

  const getAverageRating = (ratings) => {
    let average_rating = 0;
    ratings.ratings.forEach(function (item, index, array) {
      average_rating += item.rating;
    });
    average_rating = average_rating / ratings.ratings.length;
    setAverageRating(average_rating);
  };

  useEffect(() => {
    httpGetTokenRequest("GET", urls.URL_ROOMS + "/" + room_id).then((room) => {
      setRoom(room);
      setIsLoading(false);
    });
  }, []);

  /**Obtengo fotos del room */
  useEffect(() => {
    httpGetTokenRequest(
      "GET",
      urls.URL_ROOMS + "/" + room_id + "/photos",
      {},
      _handlePhotosResponse
    );
  });

  useEffect(() => {
    httpGetTokenRequest(
      "GET",
      urls.URL_ROOMS + "/" + room_id + "/reviews",
      {}
    ).then((data) => {
      setReviews(data);
    });
  }, []);

  useEffect(() => {
    console.log("average rating");
    httpGetTokenRequest(
      "GET",
      urls.URL_ROOMS + "/" + room_id + "/ratings",
      {}
    ).then((ratings) => {
      if (ratings) {
        getAverageRating(ratings);
      }
    });
  }, [_is_loading]);

  const [storedUser, setStoredUser] = useState();
  useEffect(() => {
    BnbSecureStore.read(constants.CACHE_USER_KEY).then((storedUser) => {
      setStoredUser(storedUser);
    });
  }, []);

  if (_is_loading || !storedUser) {
    return <BnbLoading></BnbLoading>;
  } else {
    return (
      <BnbMainView>
        <ScrollView>
          <Image style={styles.roomImage} source={image}></Image>
          <BnbBodyView>
            <View style={styles.roomInfoContainer}>
              <Text>{_average_rating} de 5 estrellas</Text>
              <Text style={styles.roomTitleText}>{_room.type}</Text>
              <Text style={styles.priceText}>
                Precio por dia: {_room.price_per_day}
              </Text>
            </View>
            <View style={styles.roomDescriptionContainer}>
              <Text>Aca deberia haber una descripcion detallada del room</Text>
            </View>
            <Separator></Separator>
            <View style={styles.reviewsContainer}>
              <BnbTitleText style={styles.titleText}>Reseñas</BnbTitleText>
              {_reviews !== undefined && (
                <View>
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
              )}
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
            <Separator />
            <BnbButton
              style={styles.center}
              title="Detalles"
              onPress={_handleRoomDetailsButtonPress}
            />
            <Separator />
            <BnbButton
              style={styles.center}
              title="Reservar"
              onPress={_handleRoomBooking}
            />
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
  center: {
    alignSelf: "center",
  },
});

export default RoomScreen;

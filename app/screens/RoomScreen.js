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
import BnbImageSlider from "../components/BnbImageSlider";
import BnbLoading from "../components/BnbLoading";
import BnbComment from "../components/BnbComment";
import getUrlFromPhotos from "../helpers/getUrlFromPhotos";
import bnbStyleSheet from "../constant/bnbStyleSheet";

const image = require("../assets/bookbnb_1.png");

function RoomScreen({ route, navigation }) {
  const room_id = route.params?.room_id;
  const searchForm = route.params?.searchForm;
  const [_room, setRoom] = useState();
  const [_is_owner, setIsOwner] = useState();
  const [_is_loading, setIsLoading] = useState(true);
  const [storedUser, setStoredUser] = useState();

  const [_reviews, setReviews] = useState();
  const [_average_rating, setAverageRating] = useState(0);
  const [_review, setReview] = useState("");
  const [_rating, setRating] = useState({
    quantity: 0,
  });
  const [_error, setError] = useState();
  const [_photos_url, setPhotosUrl] = useState([]);

  const [_comments, setComments] = useState([]);
  const [_comment, setComment] = useState({
    comment: "",
    commentator: "",
    commentator_id: 0,
  });

  const _handleRatingChange = (counter, offset) => {
    const new_quantity = _rating.quantity + offset;
    setRating((prevState) => ({
      ...prevState,
      quantity: new_quantity,
    }));
  };

  const _handleTextChange = (key, text) => {
    setComment({ ..._comment, [key]: text });
  };

  const _handleApiResponse = (data) => {
    setIsLoading(false);
  };

  const _handleApiError = (error) => {
    setError(error);
    setIsLoading(false);
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
    navigation.navigate("RoomDetails", { room_id: _room.id });
  };

  const _handleRoomBooking = () => {
    searchForm["user_id"] = storedUser.userData.id;
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

  const _handleAddParentComment = () => {
    setIsLoading(true);
    setComment({
      ..._comment,
      ["commentator"]: storedUser.userData.firstname,
    });
    setComment({
      ..._comment,
      ["commentator_id"]: storedUser.userData.id,
    });
    httpPostTokenRequest(
      "POST",
      urls.URL_ROOMS + "/" + room_id + "/comments",
      _comment,
      { "x-access-token": storedUser.auth_token },
      _handleApiResponse
    ).then(
      (value) => {
        setComment("");
      },
      (reason) => {
        console.log("reason: " + reason);
      }
    );
  };

  /**Fetcheo los datos del room */
  useEffect(() => {
    if (_is_loading === true) {
      httpGetTokenRequest(
        "GET",
        urls.URL_ROOMS + "/" + room_id,
        {},
        null,
        _handleApiError
      )
        .then((room) => {
          setRoom(room);
          return httpGetTokenRequest(
            "GET",
            urls.URL_ROOMS + "/" + room_id + "/photos",
            {},
            null,
            _handleApiError
          );
        })
        .then((photos) => {
          setPhotosUrl(getUrlFromPhotos(photos.room_photos));
          return httpGetTokenRequest(
            "GET",
            urls.URL_ROOMS + "/" + room_id + "/reviews",
            {},
            null,
            _handleApiError
          );
        })
        .then((reviews) => {
          setReviews(reviews);
          return httpGetTokenRequest(
            "GET",
            urls.URL_ROOMS + "/" + room_id + "/ratings",
            {}
          );
        })
        .then((ratings) => {
          getAverageRating(ratings);
          setIsLoading(false);
        });
    }
  }, [_is_loading]);

  useEffect(() => {
    BnbSecureStore.read(constants.CACHE_USER_KEY).then((storedUser) => {
      setStoredUser(storedUser);
    });
  }, []);

  useEffect(() => {
    /**Debe coincider el id del Secure Store con el id del dueño del cuarto*/
    if (_room && storedUser) {
      setIsOwner(storedUser.userData.id === _room.owner_uuid);
    }
  }, [_room, storedUser]);

  useEffect(() => {
    if (_room) {
      httpGetTokenRequest(
        "GET",
        urls.URL_ROOMS + "/" + _room.id + "/comments",
        {}
      ).then(
        (comments) => {
          setComments(comments);
        },
        (reason) => {
          setError(reason);
        }
      );
    }
  }, [_room]);

  if (_is_loading || !storedUser) {
    return <BnbLoading text={"Cargando habitacion..."}></BnbLoading>;
  } else if (_error) {
    return <Text>{_error.message}</Text>;
  } else {
    return (
      <BnbMainView>
        <ScrollView>
          <View style={styles.imageSlider}>
            <BnbImageSlider images={_photos_url} width={200}></BnbImageSlider>
          </View>
          <BnbBodyView>
            <View style={styles.roomInfoContainer}>
              <Text>{_average_rating} de 5 estrellas</Text>
              <Text style={styles.roomTitleText}>{_room.type}</Text>
              <Text style={styles.priceText}>
                Precio por dia: {_room.price_per_day}
              </Text>
            </View>
            <View style={styles.roomDescriptionContainer}>
              <Text>{_room.description}</Text>
            </View>
            <Separator></Separator>
            <View style={styles.reviewsContainer}>
              <BnbTitleText style={styles.titleText}>Reseñas</BnbTitleText>
              {_reviews && (
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
              <TextInput
                multiline
                placeholder="Escribe aqui tu reseña"
                maxLength={constants.maxTextLength}
                onChangeText={setReview}
                style={styles.textInput}
              ></TextInput>
              {!_is_owner && (
                <View>
                  <BnbButton title="Publicar" onPress={_handlePostAReview} />
                  <Separator />
                </View>
              )}
            </View>
            {!_is_owner && (
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
                <BnbButton
                  title="Puntuar"
                  onPress={_handleRateRoomButtonPress}
                />
              </View>
            )}
            <Separator />
            {!_is_owner && (
              <BnbButton
                style={styles.center}
                title="Reservar"
                onPress={_handleRoomBooking}
              />
            )}
            <Text style={bnbStyleSheet.headerTextBlack}>Comentarios</Text>
            {_comments?.comments.map((item, index) => (
              <View>
                <BnbComment
                  username={item.commentaor}
                  comment={item.comment}
                  timeStamp={item.created_at}
                  canEdit={item.commentator_id === storedUser.userData.id}
                ></BnbComment>
              </View>
            ))}
            <View style={styles.addCommentContainer}>
              <TextInput
                style={styles.textInput}
                multiline
                numberOfLines={4}
                maxLength={constants.maxTextLength}
                onChangeText={(value) => _handleTextChange("comment", value)}
                value={_comment.comment}
              ></TextInput>
              <BnbButton title="Comentar" onPress={_handleAddParentComment} />
            </View>
            <Separator />
            {_is_owner && (
              <BnbButton
                style={styles.center}
                title="Detalles"
                onPress={_handleRoomDetailsButtonPress}
              />
            )}
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
  imageSlider: {
    flex: 1,
    alignItems: "center",
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

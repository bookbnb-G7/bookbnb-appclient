import React, { useEffect, useState } from "react";
import { Alert, Dimensions, Image, StyleSheet, Text, View } from "react-native";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
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
import BnbIconText from "../components/BnbIconText";
import BnbAlert from "../components/BnbAlert";
import BnbComment2 from "../components/BnbComment2";

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

  const [_comments, setComments] = useState();
  const [_comment, setComment] = useState({
    comment: "",
  });

  const [_owner, setOwner] = useState();

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
    httpPostTokenRequest(
      "POST",
      urls.URL_ROOMS + "/" + room_id + "/comments",
      _comment,
      {
        "Content-Type": "application/json",
        "x-access-token": storedUser.auth_token,
      },
      _handleApiResponse
    ).then(
      (value) => {
        setComment("");
        setIsLoading(false);
      },
      (error) => {
        BnbAlert(
          "Error al publicar comentario",
          error.message,
          "Entendido",
          false
        );
        setIsLoading(false);
      }
    );
  };

  const _handleReplyComment = (comment, parent_id) => {
    /**Creo un comentario con el body requerido por el endpoint */
    setIsLoading(true);
    const endPointComment = {
      comment: comment,
      main_comment_id: parent_id,
    };
    /**Como modifico el flag _is_loading ejecuto el hook que carga los comentarios
     * deberian re-renderizar con el nuevo comentario
     */
    httpPostTokenRequest(
      "POST",
      urls.URL_ROOMS + "/" + _room.id + "/comments",
      endPointComment,
      {
        "Content-Type": "application/json",
        "x-access-token": storedUser.auth_token,
      }
    ).then(
      (comment) => {
        setIsLoading(false);
      },
      (error) => {
        BnbAlert(
          "Hubo un error al querer publicar la respuesta",
          `Error: ${error}`,
          "Entendido",
          false
        );
        //setError(error);
        setIsLoading(false);
      }
    );
  };

  const _handleDeleteComment = (comment_id) => {
    setIsLoading(true);
    httpGetTokenRequest(
      "DELETE",
      urls.URL_ROOMS + "/" + _room.id + "/comments/" + comment_id,
      { "x-access-token": storedUser.auth_token },
      _handleApiResponse,
      _handleApiError
    );
  };

  /**Estaria bueno que si es el owner del room lo envie directamente al ProfileStack
   * y no al searchStack
   */
  const _handleRoomOwnerPress = () => {
    if (_owner.id == storedUser.userData.id) {
      navigation.navigate("ProfileStack", { screen: "Profile" });
    } else {
      navigation.navigate("User", { user_id: _owner.id });
    }
  };

  const _handleUsernameTap = (user_id) => {
    if (user_id == storedUser.userData.id) {
      navigation.navigate("ProfileStack", { screen: "Profile" });
    } else {
      navigation.navigate("User", { user_id: user_id });
    }
  };

  /**Fetcheo los datos del room */
  useEffect(() => {
    if (_is_loading) {
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
            null
          );
        })
        .then((reviews) => {
          setReviews(reviews);
          return httpGetTokenRequest(
            "GET",
            urls.URL_ROOMS + "/" + room_id + "/ratings",
            {},
            null
          );
        })
        .then((ratings) => {
          getAverageRating(ratings);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }
  }, []);

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

  /**Fetcheo el owner aca para no tocar la cadena de promesa del room fetch */
  useEffect(() => {
    if (_room && !_owner) {
      httpGetTokenRequest(
        "GET",
        urls.URL_USERS + "/" + _room.owner_uuid,
        {}
      ).then(
        (owner) => {
          setOwner(owner);
        },
        (error) => {
          setError(error);
        }
      );
    }
  }, [_room]);

  /**Fetch comentarios de la publicacion*/
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
          <BnbBodyView>
            <Text style={bnbStyleSheet.headerTextBlack}>
              {_room.description}
            </Text>
            <View style={styles.imageSlider}>
              <BnbImageSlider images={_photos_url} width={200}></BnbImageSlider>
            </View>
            <View style={styles.roomInfoContainer}>
              <Text style={bnbStyleSheet.subHeaderText}>Puntuacion</Text>
              <Text>
                {isNaN(_average_rating)
                  ? "Sin puntaje"
                  : _average_rating + "de 5 estrellas"}{" "}
              </Text>
              <Text style={bnbStyleSheet.subHeaderText}>Precio por dia</Text>
              <Text>{_room.price_per_day}</Text>
              <Text style={bnbStyleSheet.subHeaderText}>Categoria</Text>
              <Text>{_room.type}</Text>
              <Text style={bnbStyleSheet.subHeaderText}>Dueño</Text>
              {_owner && (
                <TouchableOpacity onPress={_handleRoomOwnerPress}>
                  <BnbIconText logo={_owner.photo}>
                    {_owner.firstname} {_owner.lastname}
                  </BnbIconText>
                </TouchableOpacity>
              )}
            </View>
            <Separator></Separator>
            <View style={styles.reviewsContainer}>
              <Text style={bnbStyleSheet.headerTextBlack}>Reseñas</Text>
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
            {!_is_owner && (
              <View style={styles.writeAReviewContainer}>
                <TextInput
                  multiline
                  placeholder="Escribe aqui tu reseña"
                  maxLength={constants.maxTextLength}
                  onChangeText={setReview}
                  style={styles.textInput}
                ></TextInput>
                <View>
                  <BnbButton title="Publicar" onPress={_handlePostAReview} />
                  <Separator />
                </View>
              </View>
            )}
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
            {_comments &&
              _comments.comments.map((item, index) => (
                <View>
                  <View key={item.comment.id}>
                    <BnbComment2
                      comment={item.comment}
                      answers={item.answers}
                      me_id={storedUser.userData.id}
                      onDeleteTap={_handleDeleteComment}
                      onReply={_handleReplyComment}
                      onUsernameTap={_handleUsernameTap}
                    />
                  </View>
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
              <BnbButton
                title="Agregar comentario"
                onPress={_handleAddParentComment}
              />
            </View>
            <Separator />
            {_is_owner && _room && (
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

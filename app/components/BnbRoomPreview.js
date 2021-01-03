import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import fonts from "../config/fonts";
import styling from "../config/styling";

const room_image = require("../assets/bookbnb_1.png");

const BnbRoomPreview = (props) => {
  const url_ratings =
    "http://bookbnb-appserver.herokuapp.com/rooms/" +
    props.room.id +
    "/ratings";
  const [_ratings, setRatings] = useState({});
  const [_error, setError] = useState(null);
  const [_is_loaded, setIsLoaded] = useState(false);

  const _handleImagePress = () => {
    /**Si recibir un searchForm es porque soy un guest buscando rooms */
    if (props?.searchForm) {
      props.navigation.navigate("Room", {
        room_id: props.room.id,
        searchForm: props.searchForm,
      });
    } else {
      /**Caso contrario soy el dueño */
      props.navigation.navigate("Room", {
        room_id: props.room.id,
      });
    }
  };

  useEffect(() => {
    fetch(url_ratings)
      .then((response) => response.json())
      .then(
        (response) => {
          setRatings(response);
          setIsLoaded(true);
        },
        (error) => {
          setError(error);
          setIsLoaded(true);
        }
      );
  }, []);

  const getAverageRating = () => {
    let average_rating = 0;
    _ratings.ratings.forEach(function (item, index, array) {
      average_rating += item.rating;
    });
    average_rating = average_rating / _ratings.ratings.length;
    return average_rating;
  };

  if (!_is_loaded) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  } else if (_error) {
    return (
      <View>
        <Text>{_error.message}</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.mainContainer}>
        <TouchableOpacity onPress={_handleImagePress}>
          <View style={styles.roomImageContainer}>
            <Image source={room_image} style={styles.roomImage}></Image>
          </View>
          <View style={styles.roomDescriptionContainer}>
            <Text style={styles.roomReviewScore}>
              {getAverageRating()} de 5 estrellas
            </Text>
            <Text style={styles.roomTitleText}>{props.room.type}</Text>
            <Text style={styles.roomPriceText}>
              Precio por dia: ${props.room.price_per_day}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  mainContainer: {
    //flex: 1,
    justifyContent: "center",
    marginVertical: styling.separator,
  },
  roomImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    //borderWidth: 1,
  },
  roomImage: {
    width: "100%",
    height: 200,
    borderRadius: styling.mediumCornerRadius,
  },
  roomDescriptionContainer: {
    //flex: 1,
    //borderWidth: 1,
    marginVertical: styling.separator,
  },
  roomReviewScore: {},
  roomTitleText: {
    fontSize: fonts.big,
  },
  roomPriceText: {
    fontWeight: "bold",
    fontSize: fonts.big,
  },
});

export default BnbRoomPreview;

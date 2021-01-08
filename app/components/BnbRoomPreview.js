import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import fonts from "../config/fonts";
import styling from "../config/styling";
import urls from "../constant/urls";
import httpGetTokenRequest from "../helpers/httpGetTokenRequest";
import BnbLoading from "../components/BnbLoading";
import BnbImageSlider from "./BnbImageSlider";
import BnbFormBubbleInfo from "../components/BnbFormBubbleInfo";
import colors from "../config/colors";

import getAverage from "../helpers/getAverage";

const BnbRoomPreview = (props) => {
  const [_ratings, setRatings] = useState({});
  const [_error, setError] = useState();
  const [_is_loaded, setIsLoaded] = useState(false);

  const [_photos, setPhotos] = useState({
    amount: 0,
    room_id: 0,
    room_photos: [],
  });

  const _handleApiError = (error) => {
    setError(error);
    setIsLoaded(true);
  };

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
    httpGetTokenRequest(
      "GET",
      urls.URL_ROOMS + "/" + props.room.id + "/ratings",
      {},
      null,
      _handleApiError
    )
      .then((ratings) => {
        setRatings(ratings);
        return httpGetTokenRequest(
          "GET",
          urls.URL_ROOMS + "/" + props.room.id + "/photos",
          {},
          null,
          _handleApiError
        );
      })
      .then((photos) => {
        setPhotos(photos);
        setIsLoaded(true);
      });
  }, []);

  if (!_is_loaded) {
    return <BnbLoading text="Cargando habitacion..."></BnbLoading>;
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
          <View style={styles.imageSlider}>
            <BnbImageSlider
              images={_photos.room_photos}
              width={250}
            ></BnbImageSlider>
          </View>
          <View style={styles.roomDescriptionContainer}>
            
            <BnbFormBubbleInfo
              iconName="star"
              iconColor={colors.golden}
              iconSize={24}
              text={_ratings.ratings.length > 0 ? getAverage(_ratings.ratings, "rating") : "-"}
              textStyle={styles.ratingText} 
              style={styles.ratingContainer}
            />
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
    borderRadius: 20,
    paddingHorizontal: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 2,
  },
  imageSlider: {
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
  roomTitleText: {
    fontSize: fonts.big,
  },
  roomPriceText: {
    fontWeight: "bold",
    fontSize: fonts.big,
  },
  ratingText: {
    color: colors.black,
    fontSize: 20,
  },
  ratingContainer: {
    marginVertical: 0,
    paddingHorizontal: 0,
  }
});

export default BnbRoomPreview;

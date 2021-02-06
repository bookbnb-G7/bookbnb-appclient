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
import getUrlFromPhotos from "../helpers/getUrlFromPhotos";

const BnbRoomPreview = (props) => {
  const [_ratings, setRatings] = useState({});
  const [_error, setError] = useState();
  const [_is_loaded, setIsLoaded] = useState(false);

  const [_photos, setPhotos] = useState({
    amount: 0,
    room_id: 0,
    room_photos: [],
  });
  const [_photos_urls, setPhotosUrl] = useState([]);

  const _handleApiError = (error) => {
    setError(error);
    setIsLoaded(true);
  };

  const _handleImagePress = () => {
    /**Si tengo  un searchForm es porque estoy buscando un room*/
    if (props?.searchForm) {
      props.navigation.navigate("Room", {
        room_id: props.room.id,
        searchForm: props.searchForm,
      });
    } else {
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
        if (photos) {
          setPhotos(photos);
          setPhotosUrl(getUrlFromPhotos(photos.room_photos));
          setIsLoaded(true);
        }
      });
  }, []);

  if (!_is_loaded) {
    return <Text text="Cargando habitacion..." />;
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
            <BnbImageSlider images={_photos_urls}/>
          </View>
          <View style={styles.roomDescriptionContainer}>
            <Text style={styles.roomTitleText}>{props.room.title}</Text>
            <BnbFormBubbleInfo
              iconName="star"
              iconColor={colors.golden}
              iconSize={24}
              text={
                _ratings.ratings.length > 0
                  ? getAverage(_ratings.ratings, "rating")
                  : "-"
              }
              textStyle={styles.ratingText}
              style={styles.ratingContainer}
            />
            <Text style={styles.roomTypeText}>{props.room.type}</Text>
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
    justifyContent: "center",
    marginVertical: styling.separator,
    borderRadius: 20,
    overflow: "hidden",

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
    //width: "100%",
    //height: 200,
    borderRadius: styling.mediumCornerRadius,
  },
  roomDescriptionContainer: {
    //flex: 1,
    //borderWidth: 1,
    marginVertical: styling.separator,
    marginHorizontal: 10,
  },
  roomTitleText: {
    fontFamily: "Raleway_700Bold",
    fontSize: 22,
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
  },
  roomTypeText: {
    fontSize: fonts.big,
  }
});

export default BnbRoomPreview;

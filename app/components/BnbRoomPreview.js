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
import BnbUserLogo from "./BnbUserLogo";
import bnbStyleSheet from "../constant/bnbStyleSheet";

const BnbRoomPreview = (props) => {
  const [_ratings, setRatings] = useState({});
  const [_error, setError] = useState();
  const [_is_loaded, setIsLoaded] = useState(false);

  const [_photos_urls, setPhotosUrl] = useState([]);

  const _handleApiError = (error) => {
    setError(error);
    setIsLoaded(true);
  };

  const _handleImagePress = () => {
    /**Si tengo  un searchForm es porque estoy buscando un room*/
    /**Si no soy el dueño es porque lo tengo en favoritos o es una recomendacion */
    if (props?.searchForm) {
      props.navigation.navigate("Room", {
        room_id: props.room.id,
        searchForm: props.searchForm,
      });
    } else if (props?.me_id && props.me_id !== props.room.owner_uuid) {
      props.navigation.navigate("SearchRooms", {
        screen: "Room",
        params: {
          room_id: props.room.id,
        },
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
          setPhotosUrl(getUrlFromPhotos(photos.room_photos));
          setIsLoaded(true);
        }
      });
  }, [props.room.id]);

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
            <BnbImageSlider images={_photos_urls} />
          </View>
          <View style={styles.roomDescriptionContainer}>
            <Text style={styles.roomTitleText}>{props.room.title}</Text>
            <View style={styles.profileAndRoomDetalisContainer}>
              <View style={styles.roomInfoContainer}>
                <Text style={bnbStyleSheet.normalText}>{props.room.type}</Text>
                <Text style={bnbStyleSheet.normalText}>
                  Precio por dia: ${props.room.price_per_day}
                </Text>
              </View>
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
            </View>
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
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "black",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 5,
    backgroundColor: "#F0F0F0",
  },
  imageSlider: {
    justifyContent: "center",
    alignItems: "center",
  },
  roomDescriptionContainer: {
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
    flex: 1,
  },
  roomTypeText: {
    fontSize: fonts.big,
  },
  profileAndRoomDetalisContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  roomInfoContainer: {
    flex: 3,
  },
});

export default BnbRoomPreview;

import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import fonts from "../config/fonts";
import styling from "../config/styling";
import urls from "../constant/urls";
import httpGetTokenRequest from "../helpers/httpGetTokenRequest";
import BnbImageSlider from "./BnbImageSlider";
import colors from "../config/colors";

import getUrlFromPhotos from "../helpers/getUrlFromPhotos";
import bnbStyleSheet from "../constant/bnbStyleSheet";
import BnbLoadingText from "./BnbLoadingText";
import BnbError from "./BnbError";
import RoomPreview from "./RoomPreview";

const BnbRoomPreview = (props) => {
  const [_ratings, setRatings] = useState(null);
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
    return <BnbLoadingText>Cargando habitacion...</BnbLoadingText>;
  } else if (_error) {
    return (
      <View>
        <BnbError>Error al cargar la habitación</BnbError>
      </View>
    );
  } else {
    return (
      <View style={bnbStyleSheet.roomPreviewContainer}>
        <TouchableOpacity onPress={_handleImagePress}>
          <View style={styles.imageSlider}>
            <BnbImageSlider images={_photos_urls} />
          </View>
          {_ratings && <RoomPreview room={props.room} ratings={_ratings} />}
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
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

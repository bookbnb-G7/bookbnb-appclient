import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import BnbBodyView from "../components/BnbBodyView";
import BnbMainView from "../components/BnbMainView";
import BnbRoomPreview from "../components/BnbRoomPreview";
import fonts from "../config/fonts";
import colors from "../config/colors";
import Separator from "../components/Separator";
import httpGetTokenRequest from "../helpers/httpGetTokenRequest";
import BnbFormBubbleInfo from "../components/BnbFormBubbleInfo";


function SearchResultRooms({ route, navigation }) {
  const searchForm = route.params;
  const dateBegin = searchForm.dateBegin.substr(0, 10).replace(/-/g, "/");
  const dateEnd = searchForm.dateEnd.substr(0, 10).replace(/-/g, "/");

  const [_rooms, setRooms] = useState({});
  const [_error, setError] = useState(null);
  const [_is_loaded, setIsLoaded] = useState(false);
  const URL_ROOMS = "http://bookbnb-appserver.herokuapp.com/rooms";

  const _handleApiResponse = (response) => {
    setRooms(response);
    setIsLoaded(true);
  };

  const _handleResponseError = (error) => {
    setError(error);
    setIsLoaded(true);
  };

  useEffect(() => {
    httpGetTokenRequest(
      "GET",
      URL_ROOMS + "?" + new URLSearchParams({
        "latitude": searchForm.coordinates.latitude,
        "longitude": searchForm.coordinates.longitude,
        "date_begins": searchForm.dateBegin,
        "date_ends": searchForm.dateEnd,
        "people": searchForm.amount_of_people,
      }),
      {},
      _handleApiResponse,
      _handleResponseError
    );
  }, []);


  if (!_is_loaded) {
    return (
      <View style={styles.loading}>
        <Text>Cargando...</Text>
      </View>
    );
  } else if (_error) {
    return (
      <View style={styles.loading}>
        <Text> Error: {_error.message}</Text>
      </View>
    );
  } else {
    return (
      <BnbMainView style={styles.mainView}>
        <View style={styles.innerContainer}>
          <View style={styles.searchFormInfoContainer}>
            <BnbFormBubbleInfo
              iconName="location-sharp"
              iconColor={colors.white}
              text={searchForm.location}
              style={styles.bubbleInfo}
            />
            <BnbFormBubbleInfo
              iconName="person"
              iconColor={colors.white}
              text={`Huespedes: ${searchForm.amount_of_people}`}
              style={styles.bubbleInfo}
            />
            <BnbFormBubbleInfo
              iconName="calendar"
              iconColor={colors.white}
              text={
                `${dateBegin} - ${dateEnd}`
                }
              style={styles.bubbleInfo}
            />
          </View>
          <BnbBodyView style={styles.bodyView}>
            <Text style={styles.infoText}>
              {`Encontramos ${_rooms.rooms.length} lugar${""
              }${_rooms.rooms.length === 1 ? "" : "es"} para alojarse`}
            </Text>
            <Separator></Separator>
            <ScrollView>
              {_rooms.rooms.map((item, index) => (
                <View key={item.id}>
                  <BnbRoomPreview
                    navigation={navigation}
                    room={item}
                    searchForm={searchForm}
                  ></BnbRoomPreview>
                </View>
              ))}
            </ScrollView>
          </BnbBodyView>
        </View>
      </BnbMainView>
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  infoText: {
    fontSize: fonts.semi,
    alignSelf: "center",
    justifyContent: "center",
    fontFamily: "Raleway_400Regular",
  },
  mainView: {
    backgroundColor: colors.redAirBNB,
    paddingLeft: 5,
    paddingRight: 5,
    alignItems: "center",
  },
  bodyView: {
    width: "100%",
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  innerContainer: {
    width: "100%",
    flex: 1,
    backgroundColor: colors.redAirBNBSoft,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
  },
  bubbleInfo: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.white,
    marginHorizontal: 5,
  },
  searchFormInfoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingVertical: 5,
  }
});

export default SearchResultRooms;

import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import BnbSecureStore from "../../classes/BnbSecureStore";
import BnbLoading from "../../components/BnbLoading";
import BnbMainView from "../../components/BnbMainView";
import BnbBookingPreview from "../../components/BnbBookingPreview";
import Separator from "../../components/Separator";
import colors from "../../config/colors";
import fonts from "../../config/fonts";
import constants from "../../constant/constants";
import urls from "../../constant/urls";
import httpGetTokenRequest from "../../helpers/httpGetTokenRequest";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import bnbStyleSheet from "../../constant/bnbStyleSheet";
import BnbBodyView from "../../components/BnbBodyView";
import BnbError from "../../components/BnbError";

const listTab = [
  { text: "Todos", state: 0 },
  { text: "Pendiente", state: constants.BOOKING_STATUS_PENDING },
  { text: "Aceptado", state: constants.BOOKING_STATUS_ACCEPTED },
  { text: "Rechazado", state: constants.BOOKING_STATUS_REJECTED },
];

function ProfileBookingsScreen({ navigation }) {
  const [_bookings, setBookings] = useState();
  const [_is_loading, setIsLoading] = useState(true);
  const [_error, setError] = useState("");
  const [storedUser, setStoredUser] = useState();

  const [_madeState, setMadeState] = useState(0);
  const [_receivedState, setReceivedState] = useState(0);

  const _handleApiResponse = (data) => {
    setBookings(data);
    setIsLoading(false);
  };

  const _handleApiError = (error) => {
    setError(error);
    setIsLoading(false);
  };

  const FilterTab = ({ state, onButtonPress }) => {
    return (
      <View style={styles.filterTab}>
        {listTab.map((item, index) => (
          <TouchableOpacity
            key={item.state}
            style={[
              styles.filterButton,
              state === item.state && styles.filterButtonActive,
            ]}
            onPress={() => onButtonPress(item.state)}
          >
            <Text style={[styles.filterButtonText]}>{item.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  useEffect(() => {
    BnbSecureStore.read(constants.CACHE_USER_KEY).then((user) => {
      setStoredUser(user);
      httpGetTokenRequest(
        "GET",
        urls.URL_ME + "/bookings",
        { "x-access-token": user.auth_token },
        _handleApiResponse,
        _handleApiError
      );
    });
  }, []);

  if (_error) {
    return (
      <BnbError>
        {" "}
        Hubo un error al cargar las reservas: {_error.message}{" "}
      </BnbError>
    );
  }
  if (_is_loading) {
    return <BnbLoading text="Cargando reservas..."></BnbLoading>;
  } else {
    return (
      <BnbMainView>
        <BnbBodyView>
          <ScrollView>
            <Text style={bnbStyleSheet.headerTextBlack}>
              Tienes {_bookings.made.bookings.length} reservas hechas
            </Text>
            <FilterTab state={_madeState} onButtonPress={setMadeState} />
            <View>
              {storedUser &&
                _bookings.made.bookings.map((item, index) => (
                  <View key={item.id}>
                    {(_madeState === 0 ||
                      _madeState == item.booking_status) && (
                      <View>
                        <BnbBookingPreview
                          navigation={navigation}
                          booking_id={item.id}
                          room_id={item.room_id}
                          auth_token={storedUser.auth_token}
                        />
                        <Separator />
                      </View>
                    )}
                  </View>
                ))}
            </View>
            <Separator />
            <Text style={bnbStyleSheet.headerTextBlack}>
              Tienes {_bookings.received.bookings.length} solicitudes de reserva
            </Text>
            <FilterTab
              state={_receivedState}
              onButtonPress={setReceivedState}
            />
            <View>
              {_bookings.received.bookings.map((item, index) => (
                <View key={item.id}>
                  {(_receivedState === 0 ||
                    _receivedState == item.booking_status) && (
                    <View>
                      <BnbBookingPreview
                        navigation={navigation}
                        booking_id={item.id}
                        room_id={item.room_id}
                        auth_token={storedUser.auth_token}
                      />
                      <Separator />
                    </View>
                  )}
                </View>
              ))}
            </View>
          </ScrollView>
        </BnbBodyView>
      </BnbMainView>
    );
  }
}

const styles = StyleSheet.create({
  filterTab: {
    flexDirection: "row",
    alignSelf: "center",
    borderWidth: 1,
    justifyContent: "space-between",
  },
  filterButton: {
    width: 80,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
  },
  filterButtonText: {
    fontFamily: "Raleway_500Medium",
  },
  filterButtonActive: {
    backgroundColor: colors.redAirBNBSoft,
  },
});

export default ProfileBookingsScreen;

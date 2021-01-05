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
import { ScrollView } from "react-native-gesture-handler";

/**Aca deberia aparecer una lista con todos los rooms del usuario y
 * que indique si estos tienen o no un booking esperando a ser aceptado/rechazado */
function ProfileBookingsScreen({ navigation }) {
  const [_bookings, setBookings] = useState();
  const [_is_loading, setIsLoading] = useState(true);
  const [_error, setError] = useState("");
  const [storedUser, setStoredUser] = useState();

  const _handleApiResponse = (data) => {
    setBookings(data);
    setIsLoading(false);
  };

  const _handleApiError = (error) => {
    setError(error);
    setIsLoading(false);
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
    return <Text> {_error.message} </Text>;
  }

  /**OJO: no deberia poder intentar modificar las reservas hechas, solo las recibidas */
  if (_is_loading) {
    return <BnbLoading text="Cargando reservas"></BnbLoading>;
  } else {
    return (
      <BnbMainView>
        <View style={styles.centerContainer}>
          <ScrollView>
            <Text style={styles.title}>
              Tienes {_bookings.made.bookings.length} reservas hechas
            </Text>
            <View>
              {_bookings.made.bookings.map((item, index) => (
                <View key={item.id}>
                  <BnbBookingPreview
                    navigation={props.navigation}
                    booking={item}
                  ></BnbBookingPreview>
                </View>
              ))}
            </View>
            <Separator></Separator>
            <Text style={styles.title}>
              Tienes {_bookings.received.bookings.length} solicitudes de reserva
            </Text>
            <View>
              {_bookings.made.bookings.map((item, index) => (
                <View key={item.id}>
                  <BnbBookingPreview
                    navigation={props.navigation}
                    booking={item}
                  ></BnbBookingPreview>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </BnbMainView>
    );
  }
}

const styles = StyleSheet.create({
  centerContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: fonts.big,
    alignSelf: "center",
  },
  errorText: {
    color: colors.error,
  },
});

export default ProfileBookingsScreen;

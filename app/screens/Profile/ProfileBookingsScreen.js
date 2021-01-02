import React, { useEffect, useState } from "react";
import BnbSecureStore from "../../classes/BnbSecureStore";
import BnbLoading from "../../components/BnbLoading";
import BnbMainView from "../../components/BnbMainView";
import constants from "../../constant/constants";
import urls from "../../constant/urls";
import httpGetTokenRequest from "../../helpers/httpGetTokenRequest";

/**Aca deberia aparecer una lista con todos los rooms del usuario y
 * que indique si estos tienen o no un booking esperando a ser aceptado/rechazado */
function ProfileBookingsScreen({ navigation }) {
  const [_bookings, setBookings] = useState();
  const [_is_loading, setIsLoading] = useState(true);
  const [storedUser, setStoredUser] = useState();

  const _handleApiResponse = (data) => {
    setBookings(data);
    setIsLoading(false);
  };

  const _handleApiError = () => {
    console.log("hola");
    setIsLoading(false);
  };

  useEffect(() => {
    BnbSecureStore.read(constants.CACHE_USER_KEY).then((user) => {
      setStoredUser(user);
      httpGetTokenRequest(
        "GET",
        urls.URL_USERS + "/" + user.userData.id + "/bookings",
        _handleApiResponse,
        _handleApiError
      );
    });
  }, []);

  if (_is_loading) {
    return <BnbLoading text="Cargando reservas"></BnbLoading>;
  } else {
    return (
      <BnbMainView>
        {_bookings.bookings.map((item, index) => (
          <View key={item.id}>
            <BnbBookingPreview
              navigation={props.navigation}
              roomBooking={item}
            ></BnbBookingPreview>
          </View>
        ))}
      </BnbMainView>
    );
  }
}

export default ProfileBookingsScreen;

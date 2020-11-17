import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import BnbBodyView from "../components/BnbBodyView";
import BnbMainView from "../components/BnbMainView";

function SearchUsersResultScreen(props) {
  const [_user, setUser] = useState({});
  const [_error, setError] = useState(null);
  const [_is_loaded, setIsLoaded] = useState(false);

  /**TODO: Aca en vez del id deberia pasarle el username http:.../users?username=props.username_input*/
  useEffect(() => {
    fetch("http://bookbnb-appserver.herokuapp.com/users/1")
      .then((response) => response.json())
      .then(
        (data) => {
          setUser(data);
          setIsLoaded(true);
        },
        (error) => {
          setError(error);
          setIsLoaded(true);
        }
      );
  }, []);

  if (!_is_loaded) {
    return (
      <View>
        <Text>Cargando...</Text>
      </View>
    );
  } else if (_error) {
    return (
      <View>
        <Text>Error: {_error.message}</Text>
      </View>
    );
  } else {
    return (
      <BnbMainView>
        <BnbBodyView>
          {Object.entries(_user).map(([key, value]) => (
            <View key={key}>
              <Text>{value}</Text>
            </View>
          ))}
        </BnbBodyView>
      </BnbMainView>
    );
  }
}

export default SearchUsersResultScreen;

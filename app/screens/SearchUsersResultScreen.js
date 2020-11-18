import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import BnbBodyView from "../components/BnbBodyView";
import BnbButton from "../components/BnbButton";
import BnbMainView from "../components/BnbMainView";
import BnbTitleText from "../components/BnbTitleText";
import Separator from "../components/Separator";
import fonts from "../config/fonts";

function SearchUsersResultScreen({ route, navigation }) {
  const { search } = route.params;

  const [_user, setUser] = useState({});
  const [_error, setError] = useState(null);
  const [_is_loaded, setIsLoaded] = useState(false);

  const _handleContinueButtonPress = () => {
    alert(JSON.stringify(_user));
    navigation.navigate("ProfileStack", {
      screen: "Profile",
      params: { user: _user },
    });
  };

  /**TODO: Aca en vez del id deberia pasarle el search http:.../users?search=props.username_input*/
  useEffect(() => {
    fetch("http://bookbnb-appserver.herokuapp.com/users/" + search)
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
      <BnbMainView style={styles.white}>
        <BnbBodyView style={styles.bodyContainer}>
          <BnbTitleText>Login Exitoso</BnbTitleText>
          <Separator style={{ borderBottomWidth: 0 }}></Separator>
          <BnbButton
            title="Continuar"
            onPress={_handleContinueButtonPress}
          ></BnbButton>
        </BnbBodyView>
      </BnbMainView>
    );
  }
}

const styles = StyleSheet.create({
  white: {
    backgroundColor: "white",
  },
  message: {
    fontSize: fonts.big,
  },
  bodyContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SearchUsersResultScreen;

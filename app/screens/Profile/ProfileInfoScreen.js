import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import BnbBodyView from "../../components/BnbBodyView";
import BnbButton from "../../components/BnbButton";
import BnbMainView from "../../components/BnbMainView";
import BnbTitleText from "../../components/BnbTitleText";
import colors from "../../config/colors";
import fonts from "../../config/fonts";
import Separator from "../../components/Separator";
import BnbAlert from "../../components/BnbAlert";
import BnbSecureStore from "../../classes/BnbSecureStore";
import constants from "../../constant/constants";
import httpPostTokenRequest from "../../helpers/httpPostTokenRequest";
import urls from "../../constant/urls";
import BnbTextInputObject from "../../components/BnbTextInputObject";
import BnbLoading from "../../components/BnbLoading";

function ProfileInfoScreen({ route, navigation }) {
  const [_is_editing, setIsEditing] = useState(false);
  const [_is_awaiting, setIsAwaiting] = useState(false);
  const [storedUser, setStoredUser] = useState();
  const [userNames, setUserNames] = useState({ firstname: "", lastname: "" });

  const _handleApiResponse = (data) => {
    /**copio */
    let userData = storedUser.userData;

    /**modifico */
    userData["firstname"] = data.firstname;
    userData["lastname"] = data.lastname;

    /**armo de nuevo */
    const storeUser = {
      auth_token: storedUser.auth_token,
      userData: userData,
    };

    /**guardo */
    BnbSecureStore.remember(constants.CACHE_USER_KEY, storeUser).then(() => {
      setIsAwaiting(false);
      setIsEditing(false);
    });
  };

  const _handleApiError = () => {
    setIsAwaiting(false);
    setIsEditing(false);
  };

  const _handleToggleEditButtonPress = () => {
    setIsEditing(!_is_editing);
  };

  const _handleFinishEditingButtonPress = () => {
    setIsEditing(false);
    setIsAwaiting(true);
    httpPostTokenRequest(
      "PATCH",
      urls.URL_USERS + "/" + storedUser.userData.id,
      userNames,
      {
        "Content-Type": "application/json",
        "x-access-token": storedUser.auth_token,
      },
      _handleApiResponse,
      _handleApiError
    );
  };

  const _handleConfirmDelete = () => {
    setIsEditing(false);
    /**httpGetRequest(
      "DELETE",
      "http://bookbnb-appserver.herokuapp.com/users/" + id,
      _handleApiResponse
    );
    navigation.navigate("Home");*/
  };

  const _handleDeleteAccountButtonPress = () => {
    Alert.alert(
      "Eliminar cuenta",
      "Si acepta la cuenta sera eliminada permanentemente",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        { text: "OK", onPress: _handleConfirmDelete },
      ],
      { cancelable: false }
    );
  };

  const _handleTextChange = (key, value) => {
    setUserNames({ ...userNames, [key]: value });
  };

  useEffect(() => {
    BnbSecureStore.read(constants.CACHE_USER_KEY).then((user) => {
      setStoredUser(user);
      setUserNames({
        firstname: user.userData.firstname,
        lastname: user.userData.lastname,
      });
    });
  }, []);

  if (!storedUser) {
    return <BnbLoading></BnbLoading>;
  }

  if (_is_awaiting) {
    return <BnbLoading text="Guardando cambios..."></BnbLoading>;
  }

  return (
    <BnbMainView style={{ backgroundColor: "white" }}>
      <ScrollView>
        <BnbBodyView>
          <BnbTitleText style={styles.title}>
            Informacion de la cuenta
          </BnbTitleText>
          <View style={styles.userInfoContainer}>
            <View>
              <BnbTextInputObject
                name="Nombre"
                id="firstname"
                object={userNames}
                onChange={_handleTextChange}
                editable={_is_editing}
              ></BnbTextInputObject>
              <BnbTextInputObject
                name="Apellido"
                id="lastname"
                object={userNames}
                onChange={_handleTextChange}
                editable={_is_editing}
              ></BnbTextInputObject>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <BnbButton
              title={_is_editing ? "Aceptar cambios" : "Editar tus datos"}
              onPress={
                _is_editing
                  ? _handleFinishEditingButtonPress
                  : _handleToggleEditButtonPress
              }
            />
            {_is_editing && (
              <BnbButton
                title="Cancelar cambios"
                onPress={_handleToggleEditButtonPress}
              />
            )}
          </View>
          <Separator></Separator>
          {_is_editing && (
            <View style={styles.deleteAccountContainer}>
              <BnbTitleText style={styles.subTitle}>
                Eliminar tu cuenta
              </BnbTitleText>
              <BnbButton
                style={styles.buttonContainer}
                title="Borrar cuenta"
                onPress={_handleDeleteAccountButtonPress}
              />
            </View>
          )}
        </BnbBodyView>
      </ScrollView>
    </BnbMainView>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "black",
    fontSize: fonts.bigBig,
  },
  userInfoContainer: {
    //flexDirection: "row",
  },
  row: {
    flexDirection: "row",
  },
  leftUserFieldText: {
    flex: 1,
    fontSize: fonts.semi,
  },
  rightUserFieldText: {
    backgroundColor: colors.graySoft,
    fontSize: fonts.semi,
    flex: 1.5,
  },
  buttonContainer: {
    marginVertical: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  deleteAccountContainer: {
    //alignItems: "center",
  },
  subTitle: {
    color: "black",
    fontSize: fonts.bigMedium,
  },
});

export default ProfileInfoScreen;

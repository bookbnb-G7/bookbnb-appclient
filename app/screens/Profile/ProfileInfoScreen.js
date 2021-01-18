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
import httpGetTokenRequest from "../../helpers/httpGetTokenRequest";
import { Divider } from "react-native-elements";
import bnbStyleSheet from "../../constant/bnbStyleSheet";
import BnbError from "../../components/BnbError";
import firebase from "../../database/firebase";

function ProfileInfoScreen({ route, navigation }) {
  const [_is_editing, setIsEditing] = useState(false);
  const [_is_loading, setIsLoading] = useState(true);
  const [_error, setError] = useState();
  const [_x_access_token, setXAccessToken] = useState();
  const [_me, setMe] = useState();

  const _handleApiResponse = (data) => {
    /**armo de nuevo */
    const storeUser = {
      auth_token: _x_access_token,
      userData: _me,
    };

    /**guardo */
    BnbSecureStore.remember(constants.CACHE_USER_KEY, storeUser).then(() => {
      setIsLoading(false);
      setIsEditing(false);
    });
  };

  const _handleApiError = (error) => {
    setIsLoading(false);
    setIsEditing(false);
    setError(error);
  };

  const _handleToggleEditButtonPress = () => {
    setIsEditing(!_is_editing);
  };

  const _handleFinishEditingButtonPress = () => {
    setIsEditing(false);
    setIsLoading(true);
    const body = { firstname: _me.firstname, lastname: _me.lastname };
    httpPostTokenRequest(
      "PATCH",
      urls.URL_USERS + "/" + _me.id,
      body,
      {
        "Content-Type": "application/json",
        "x-access-token": _x_access_token,
      },
      _handleApiResponse,
      _handleApiError
    );
  };

  const _handleConfirmDelete = () => {
    setIsEditing(false);
    httpGetTokenRequest(
      "DELETE",
      urls.URL_USERS + "/" + _me.id,
      { "x-access-token": _x_access_token },
      null,
      _handleApiError
    ).then((response) => {
      if (response) {
        firebase.auth.signOut();
      }
    });
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
    setMe({ ..._me, [key]: value });
  };

  useEffect(() => {
    BnbSecureStore.read(constants.CACHE_USER_KEY).then((user) => {
      setXAccessToken(user.auth_token);
      httpGetTokenRequest("GET", urls.URL_ME, {
        "x-access-token": user.auth_token,
      }).then(
        (me) => {
          setMe(me);
          setIsLoading(false);
        },
        (error) => {
          setError(error);
          setIsLoading(false);
        }
      );
    });
  }, []);

  if (_is_loading) {
    return <BnbLoading text="Cargando..." />;
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
                object={_me}
                onChange={_handleTextChange}
                editable={_is_editing}
              ></BnbTextInputObject>
              <BnbTextInputObject
                name="Apellido"
                id="lastname"
                object={_me}
                onChange={_handleTextChange}
                editable={_is_editing}
              ></BnbTextInputObject>
            </View>
          </View>
          <BnbError>{_error ? _error : ""}</BnbError>
          <Divider style={bnbStyleSheet.divider}></Divider>
          <View>
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
          {_is_editing && (
            <View style={styles.deleteAccountContainer}>
              <BnbTitleText style={styles.subTitle}>
                Eliminar tu cuenta
              </BnbTitleText>
              <BnbButton
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

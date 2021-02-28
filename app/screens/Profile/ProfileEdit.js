import React, { useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import BnbButton from "../../components/BnbButton";
import BnbMainView from "../../components/BnbMainView";
import colors from "../../config/colors";
import fonts from "../../config/fonts";
import BnbSecureStore from "../../classes/BnbSecureStore";
import constants from "../../constant/constants";
import httpPostTokenRequest from "../../helpers/httpPostTokenRequest";
import urls from "../../constant/urls";
import BnbLoading from "../../components/BnbLoading";
import httpGetTokenRequest from "../../helpers/httpGetTokenRequest";
import bnbStyleSheet from "../../constant/bnbStyleSheet";
import firebase from "../../database/firebase";
import BnbFloatingTextInput from "../../components/BnbFloatingTextInput";
import Separator from "../../components/Separator";

function ProfileEdit({ me, onTextChange }) {
  const [_is_editing, setIsEditing] = useState(false);
  const [_is_loading, setIsLoading] = useState(false);
  const [_error, setError] = useState();
  const [_x_access_token, setXAccessToken] = useState();

  const _handleApiResponse = (data) => {
    /**armo de nuevo */
    const storeUser = {
      auth_token: _x_access_token,
      userData: me,
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
    const body = { firstname: me.firstname, lastname: me.lastname };
    httpPostTokenRequest(
      "PATCH",
      urls.URL_USERS + "/" + me.id,
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
      urls.URL_USERS + "/" + me.id,
      { "x-access-token": _x_access_token },
      null,
      _handleApiError
    ).then((response) => {
      if (response) {
        firebase.auth.signOut();
        /**TODO: Borrarlo de firebase */
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
        {
          text: "Borrar cuenta",
          style: "destructive",
          onPress: _handleConfirmDelete,
        },
      ],
      { cancelable: false }
    );
  };

  const _handleTextChange = (key, value) => {
    onTextChange(key, value);
  };

  useEffect(() => {
    BnbSecureStore.read(constants.CACHE_USER_KEY).then((user) => {
      setXAccessToken(user.auth_token);
    });
  }, []);

  if (_is_loading) {
    return <BnbLoading text="Cargando..." />;
  }

  return (
    <BnbMainView>
      <Separator />
      <Text
        style={{ ...bnbStyleSheet.subHeaderText, ...bnbStyleSheet.separator }}
      >
        Detalles
      </Text>
      {me ? (
        <View>
          <BnbFloatingTextInput
            name="Nombre"
            id={"firstname"}
            object={me}
            onChange={_handleTextChange}
            editable={_is_editing}
          />

          <BnbFloatingTextInput
            name="Apellido"
            id={"lastname"}
            object={me}
            onChange={_handleTextChange}
            editable={_is_editing}
          />
        </View>
      ) : (
        <Text>Cargando...</Text>
      )}
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
          <Text
            style={{
              ...bnbStyleSheet.subHeaderText,
              ...bnbStyleSheet.separator,
            }}
          >
            Eliminar tu cuenta
          </Text>
          <BnbButton
            title="Eliminar cuenta"
            onPress={_handleDeleteAccountButtonPress}
          />
        </View>
      )}
    </BnbMainView>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "black",
    fontSize: fonts.bigBig,
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

export default ProfileEdit;

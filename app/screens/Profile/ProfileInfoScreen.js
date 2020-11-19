import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { useScreens } from "react-native-screens";
import BnbBodyView from "../../components/BnbBodyView";
import BnbButton from "../../components/BnbButton";
import BnbMainView from "../../components/BnbMainView";
import BnbTitleText from "../../components/BnbTitleText";
import colors from "../../config/colors";
import fonts from "../../config/fonts";
import styling from "../../config/styling";
import Separator from "../../components/Separator";
import httpPostRequest from "../../helpers/httpPostRequest";
import httpGetRequest from "../../helpers/httpGetRequest";

function ProfileInfoScreen({ route, navigation }) {
  const { user, is_owner, id } = route.params;

  const [_is_editing, setIsEditing] = useState(false);

  const _handleToggleEditButtonPress = () => {
    setIsEditing(!_is_editing);
  };

  const _handleApiResponse = (data) => {
    alert(JSON.stringify(data));
  };

  const _handleFinishEditingButtonPress = () => {
    setIsEditing(false);
    alert(JSON.stringify(user));
    httpPostRequest(
      "PATCH",
      "http://bookbnb-appserver.herokuapp.com/users/" + id,
      user,
      _handleApiResponse
    );
  };

  const _handleConfirmDelete = () => {
    setIsEditing(false);
    httpGetRequest(
      "DELETE",
      "http://bookbnb-appserver.herokuapp.com/users/" + id,
      _handleApiResponse
    );
    navigation.navigate("Home");
  };

  const _handleDeleteAccountButtonPress = () => {
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: _handleConfirmDelete },
      ],
      { cancelable: false }
    );
  };

  const _changeUserState = (key, value) => {
    user[key] = value;
  };

  return (
    <BnbMainView style={{ backgroundColor: "white" }}>
      <ScrollView>
        <BnbBodyView>
          <BnbTitleText style={styles.title}>
            Informacion de la cuenta
          </BnbTitleText>
          <View style={styles.userInfoContainer}>
            <View>
              {Object.entries(user).map(([key, value]) => {
                return (
                  <View key={key}>
                    <Separator />
                    <View style={styles.row}>
                      <Text style={styles.leftUserFieldText}>{key}: </Text>
                      <TextInput
                        style={styles.rightUserFieldText}
                        defaultValue={value}
                        editable={_is_editing}
                        multiline
                        onChangeText={(text) => _changeUserState(key, text)}
                      ></TextInput>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
          <View style={styles.buttonContainer}>
            {is_owner && (
              <BnbButton
                title={_is_editing ? "Aceptar cambios" : "Editar tus datos"}
                onPress={
                  _is_editing
                    ? _handleFinishEditingButtonPress
                    : _handleToggleEditButtonPress
                }
              />
            )}
            {is_owner && _is_editing && (
              <BnbButton
                title="Cancelar cambios"
                onPress={_handleToggleEditButtonPress}
              />
            )}
          </View>
          <Separator></Separator>
          {is_owner && _is_editing && (
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

import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
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

function ProfileInfoScreen({ route, navigation }) {
  const { user, is_owner } = route.params;

  const [_is_editing, setIsEditing] = useState(false);

  const _handleEnableEditButtonPress = () => {
    setIsEditing(true);
  };

  const _handleApiResponse = (data) => {
    alert(JSON.stringify(data));
  };

  const _handleFinishEditingButtonPress = () => {
    setIsEditing(false);
    alert(JSON.stringify(user));
    /**Le agrego a user el id para el PUT
     * TODO: necesito el id
     */
    /**user.id = "3";
    httpPostRequest(
      "PUT",
      "http://bookbnb-appserver.herokuapp.com/users/",
      user,
      _handleApiResponse
    );*/
  };

  const _changeUserState = (key, value) => {
    user[key] = value;
  };

  return (
    <BnbMainView style={{ backgroundColor: "white" }}>
      <BnbBodyView>
        <BnbTitleText style={styles.subTitle}>
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
                      onChangeText={(text) => _changeUserState(key, text)}
                    ></TextInput>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
        {is_owner && !_is_editing && (
          <View style={styles.buttonContainer}>
            <BnbButton
              title="Editar tus datos"
              onPress={_handleEnableEditButtonPress}
            />
          </View>
        )}
        {is_owner && _is_editing && (
          <View style={styles.buttonContainer}>
            <BnbButton
              title="Aceptar"
              onPress={_handleFinishEditingButtonPress}
            />
          </View>
        )}
      </BnbBodyView>
    </BnbMainView>
  );
}

const styles = StyleSheet.create({
  subTitle: {
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
  },
  buttonContainer: {
    marginVertical: styling.separator,
    alignItems: "center",
  },
});

export default ProfileInfoScreen;

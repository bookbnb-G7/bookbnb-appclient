import React from "react";
import { StyleSheet, Text, View } from "react-native";
import BnbBodyView from "../../components/BnbBodyView";
import BnbButton from "../../components/BnbButton";
import BnbMainView from "../../components/BnbMainView";
import BnbTitleText from "../../components/BnbTitleText";
import colors from "../../config/colors";
import fonts from "../../config/fonts";
import styling from "../../config/styling";
import Separator from "../../helpers/Separator";

function ProfileInfoScreen({ route, navigation }) {
  const { user, is_owner } = route.params;
  return (
    <BnbMainView style={{ backgroundColor: "white" }}>
      <BnbBodyView>
        <BnbTitleText style={styles.subTitle}>
          Informacion de la cuenta
        </BnbTitleText>
        <View style={styles.userInfoContainer}>
          <View style={styles.leftUserInfo}>
            {Object.entries(user).map(([key, value]) => {
              return (
                <View style={styles.userField} key={key}>
                  <Separator />
                  <Text style={styles.leftUserFieldText}>{key}: </Text>
                </View>
              );
            })}
          </View>
          <View style={styles.rightUserInfo}>
            {Object.entries(user).map(([key, value]) => {
              return (
                <View style={styles.userField} key={key}>
                  <Separator />
                  <Text style={styles.userFieldText}>{value}</Text>
                </View>
              );
            })}
          </View>
        </View>
        {is_owner && (
          <View style={styles.buttonContainer}>
            <BnbButton title="Editar la información de tu cuenta" />
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
    flexDirection: "row",
  },
  userField: {
    //flexDirection: "row",
  },
  leftUserInfo: {
    //flex: 1,
  },
  rightUserInfo: {
    //flex: 2,
  },
  leftUserFieldText: {
    fontSize: fonts.semi,
  },
  userFieldText: {
    backgroundColor: colors.graySoft,
    fontSize: fonts.semi,
  },
  buttonContainer: {
    marginVertical: styling.separator,
    alignItems: "center",
  },
});

export default ProfileInfoScreen;

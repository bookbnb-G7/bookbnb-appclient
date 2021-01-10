import React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { ButtonGroup } from "react-native-elements";
import colors from "../config/colors";

const BnbButtonGroup = (props) => {
  return (
    <View>
      <ButtonGroup
        containerStyle={{ ...styles.containerStyle, ...props.containerStyle }}
        buttonStyle={{ ...styles.buttonStyle, ...props.buttonStyle }}
        buttonContainerStyle={{
          ...styles.buttonContainerStyle,
          ...props.buttonContainerStyle,
        }}
        buttons={props.buttons}
        onPress={props.onPress}
        selectedButtonStyle={{ backgroundColor: colors.redAirBNB }}
        selectedIndexes={props.selectedIndexes}
        vertical
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    marginHorizontal: 0,
    borderWidth: 0,
  },
  buttonStyle: {
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 5,
  },
  buttonContainerStyle: {
    flex: 0,
    marginVertical: 3,
  },
});

export default BnbButtonGroup;

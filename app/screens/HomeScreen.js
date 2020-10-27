import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "../config/colors";

function HomeScreen({ navigation }) {
  function _handleMakeAPostButton() {
    navigation.navigate("Posts");
  }

  function _handleMakeANoteButton() {
    navigation.navigate("Notes");
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.prompt}>
          Por favor seleccione que tipo de accion desea hacer a continuacion
        </Text>
      </View>
      <View style={styles.footerContainer}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={_handleMakeAPostButton}
          >
            <Text style={styles.buttonText}>MAKE A POST</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={_handleMakeANoteButton}
          >
            <Text style={styles.buttonText}>MAKE A NOTE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  prompt: {
    color: colors.text,
    textAlign: "center",
  },
  headerContainer: {
    flex: 1,
    backgroundColor: colors.footer,
    alignItems: "center",
    justifyContent: "center",
  },
  footerContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.header,
  },
  buttonsContainer: {
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    fontWeight: "700",
    color: colors.button,
  },
});

export default HomeScreen;

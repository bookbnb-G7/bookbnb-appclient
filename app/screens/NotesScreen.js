import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import colors from "../config/colors";

import isANumber from "../helpers/isANumber";

function NotesScreen({ navigation }) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [_note, setNote] = useState({});

  const [_id_text, setText] = useState("");
  const [_title_text, setTitleText] = useState("");
  const [_description_text, setDescriptionText] = useState("");

  /**TODO: meter el manejo de los POST/GET en un children, se puede hacer eso?  */
  const [_is_post, setIsPost] = useState(false);
  const [_is_get, setIsGet] = useState(false);

  function _handleGetButtonPress() {
    setIsGet(true);
  }

  function _handlePostButtonPress() {
    setIsPost(true);
  }

  function _handleGoHomeButtonPress() {
    navigation.navigate("Home");
  }

  function _handleApiResponse(response) {
    setNote(response);
  }

  useEffect(() => {
    if ((_is_get && isANumber(_id_text)) || !isLoaded) {
      fetch("https://bookbnb-appserver.herokuapp.com/notes/" + _id_text)
        .then((response) => response.json())
        .then(
          (response) => {
            setIsLoaded(true);
            _handleApiResponse(response);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    } else if (_is_get) {
      alert("Debe completar el campo id");
    }
    return () => {
      setIsGet(false);
    };
  }, [_is_get]);

  useEffect(() => {
    if (_is_post && _title_text !== "" && _description_text !== "") {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: _title_text,
          description: _description_text,
        }),
      };
      fetch("https://bookbnb-appserver.herokuapp.com/notes/", requestOptions)
        .then((response) => response.json())
        .then(_handleApiResponse);
    } else if (_is_post) {
      alert("Debe completar los campos title y description");
    }
    return () => {
      setIsPost(false);
    };
  }, [_is_post]);

  if (error) {
    return <Text>Error: {error.message}</Text>;
  } else if (!isLoaded) {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.textTitle}>
            Actualmente esta publicando a /notes{" "}
          </Text>
          <Text style={styles.text}>
            Para Get indicar un id y presionar GET, para un POST completar los
            campos title y description y apretar POST.
          </Text>
          <View style={styles.textInputsContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="id:"
              onChangeText={(_id_text) => setText(_id_text)}
            ></TextInput>
            <TextInput
              style={styles.textInput}
              placeholder="title:"
              onChangeText={(_title_text) => setTitleText(_title_text)}
            ></TextInput>
            <TextInput
              style={styles.textInput}
              placeholder="description:"
              onChangeText={(_description_text) =>
                setDescriptionText(_description_text)
              }
            ></TextInput>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.touchableContainer}>
              <Text style={styles.buttonText} onPress={_handleGetButtonPress}>
                GET
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchableContainer}>
              <Text style={styles.buttonText} onPress={_handlePostButtonPress}>
                POST
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchableContainer}>
              <Text
                style={styles.buttonText}
                onPress={_handleGoHomeButtonPress}
              >
                GO HOME
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.footerContainer}>
          <Text> JSON Response </Text>
          <Text> title: {_note.title} </Text>
          <Text> description: {_note.description}</Text>
          <Text> id: {_note.id}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    //justifyContent: "center",
    backgroundColor: colors.header,
  },
  headerContainer: {
    flex: 2,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 50,
  },
  footerContainer: {
    flex: 2,
    flexGrow: 1,
    backgroundColor: colors.footer,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  text: {
    textAlign: "center",
  },
  textTitle: {
    textAlign: "center",
    color: "red",
    fontWeight: "700",
    fontSize: 18,
  },
  textInputsContainer: {
    marginTop: 5,
    //backgroundColor: "lightblue",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  textInput: {
    marginBottom: 5,
    backgroundColor: "#fff",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  buttonsContainer: {
    //padding: 10,
  },
  touchableContainer: {
    marginBottom: 5,
    marginTop: 10,
  },
  buttonText: {
    textAlign: "center",
    color: colors.button,
    fontWeight: "700",
  },
});

export default NotesScreen;

/**TODO @AgustinLeguizamon Como Hacer para correr
 * React navigation
 * Dar la opcion de elegir hacer un POSt, Note,
 *
 */

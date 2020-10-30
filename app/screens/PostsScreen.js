import React, { useEffect, useState } from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import colors from "../config/colors";
import fonts from "../config/fonts";

const NUMBERS = "0123456789";

function isANumber(s_input) {
  let is_a_number = false;
  let i = 0;
  do {
    const element = s_input[i];
    is_a_number = Boolean(NUMBERS.search(element) >= 0);
    i++;
  } while (is_a_number && i < s_input.length);
  return is_a_number;
}

function PostsScreen({ navigation }) {
  const [_is_loaded, setIsLoaded] = useState(false);

  const [_is_get, setIsGet] = useState(false);

  const [_title_input, setTitleInput] = useState("");
  const [_body_input, setBodyInput] = useState("");
  const [_author_input, setAuthorInput] = useState("");
  const [_id_input, setIdInput] = useState("");

  const [_title, setTitle] = useState("");
  const [_body, setBody] = useState("");
  const [_author, setAuthor] = useState("");
  const [_id, setId] = useState(0);

  function _handleGoHomeButtonPress() {
    navigation.navigate("Home");
  }

  function _handleGetButtonPress() {
    setIsGet(true);
  }

  useEffect(() => {
    if ((_is_get && isANumber(_id_input)) || !_is_loaded) {
      fetch("https://bookbnb-appserver.herokuapp.com/posts/" + _id_input)
        .then((response) => response.json())
        .then((result) => {
          setIsLoaded(true);
          setTitle(result.title);
          setBody(result.body);
          setAuthor(result.author);
          setId(result.id);
        });
    } else if (_is_get) {
      alert("Debe completar el campo id");
    }
    return () => {
      setIsGet(false);
    };
  }, [_is_get]);

  if (!_is_loaded) {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.titleText}>
            Actualmente esta publicando en /posts
          </Text>
          <Text style={styles.text}>
            Para Get indicar un id y presionar GET, para un POST completar los
            campos title, description y apretar POST.
          </Text>
          <View style={styles.textInputsContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="id"
              value={_id_input}
              onChangeText={setIdInput}
            ></TextInput>
            <TextInput
              style={styles.textInput}
              placeholder="title"
              value={_title_input}
              onChangeText={setTitleInput}
            ></TextInput>
            <TextInput
              style={styles.textInput}
              placeholder="body"
              value={_body_input}
              onChangeText={setBodyInput}
            ></TextInput>
            <TextInput
              style={styles.textInput}
              placeholder="author"
              value={_author_input}
              onChangeText={setAuthorInput}
            ></TextInput>
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={_handleGetButtonPress}>
            <Text style={styles.buttonText}>GET</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={_handleGoHomeButtonPress}>
            <Text style={styles.buttonText}>GO HOME</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footerContainer}>
          <Text>JSON response</Text>
          <Text>Id: {_id}</Text>
          <Text>Title: {_title}</Text>
          <Text>Body: {_body}</Text>
          <Text>Author: {_author}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.header,
  },
  headerContainer: {
    flex: 2,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  titleText: {
    fontSize: fonts.big,
    color: colors.warning,
    textAlign: "center",
  },
  text: {
    color: colors.text,
    textAlign: "center",
  },
  footerContainer: {
    flex: 1,
    backgroundColor: colors.footer,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  textInputsContainer: {
    marginTop: 10,
  },
  textInput: {
    marginVertical: 5,
    backgroundColor: "#FFF",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  buttonsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: colors.header,
  },
  buttonText: {
    color: colors.button,
    fontWeight: fonts.bold,
  },
});

export default PostsScreen;

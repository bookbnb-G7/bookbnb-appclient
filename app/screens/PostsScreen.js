import React, { useEffect, useState } from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import colors from "../config/colors";
import fonts from "../config/fonts";

import isANumber from "../helpers/isANumber";

function PostsScreen({ navigation }) {
  const [_is_loaded, setIsLoaded] = useState(false);

  const [_is_get, setIsGet] = useState(false);
  const [_is_post, setIsPost] = useState(false);

  const [_post, setPost] = useState({});

  const [_title_input, setTitleInput] = useState("");
  const [_body_input, setBodyInput] = useState("");
  const [_author_input, setAuthorInput] = useState("");
  const [_id_input, setIdInput] = useState("");

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
    setPost(response);
  }

  function _RenderResponse() {
    if (_post.id !== {}) {
      return (
        <View>
          <Text>Id: {_post.id}</Text>
          <Text>Title: {_post.title}</Text>
          <Text>Body: {_post.body}</Text>
          <Text>Author: {_post.author}</Text>
        </View>
      );
    } else {
      return (
        <View>
          <Text style={styles.warningText}>No Server Response!</Text>
        </View>
      );
    }
  }

  const API_SERVER_URL = "https://bookbnb-appserver.herokuapp.com/posts/";
  useEffect(() => {
    if ((_is_get && isANumber(_id_input)) || !_is_loaded) {
      fetch(API_SERVER_URL + _id_input)
        .then((response) => response.json())
        .then((response) => {
          setIsLoaded(true);
          _handleApiResponse(response);
        });
    } else if (_is_get) {
      alert("Debe completar el campo id");
    }
    return () => {
      setIsGet(false);
    };
  }, [_is_get]);

  useEffect(() => {
    if (
      _is_post &&
      _title_input !== "" &&
      _body_input !== "" &&
      _author_input !== ""
    ) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          title: _title_input,
          body: _body_input,
          author: _author_input,
        }),
      };
      fetch(API_SERVER_URL, requestOptions)
        .then((response) => response.json())
        .then(_handleApiResponse);
    } else if (_is_post) {
      alert("Debe completar los campos title, description y author");
    }
    return () => {
      setIsPost(false);
    };
  }, [_is_post]);

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
          <TouchableOpacity onPress={_handlePostButtonPress}>
            <Text style={styles.buttonText}>POST</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={_handleGoHomeButtonPress}>
            <Text style={styles.buttonText}>GO HOME</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footerContainer}>
          <_RenderResponse />
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
  warningText: {
    color: colors.warning,
  },
  successText: {
    color: colors.success,
  },
});

export default PostsScreen;

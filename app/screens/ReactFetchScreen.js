import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";

import colors from "../config/colors";

var NUMBER = "0123456789";

function isATextNumber(text) {
  let isANumber = true;
  let index = 0;
  while (index < NUMBER.length && isANumber) {
    const element = text[index];
    isANumber = Boolean(NUMBER.search(element) >= 0);
    index++;
  }
  return isANumber;
}

function ReactFetchScreen(props) {
  //https://es.reactjs.org/docs/hooks-state.html

  /** Hook permite usar estado y otras caracteristicas sin escribir una clase*/

  /** UseState reemplaza al this.state de la clase
   * useState devuelve una pareja de valores, el estado actual
   * y una funcion que lo actualiza
   * Usamos set<VarName> para actualizar el valor de <VarName>
   * useState crea solo la primera vez, las siguientes nos da el estado actual
   * */

  /** Declaramos variables de estado error, isLoaded, title, description
   *isLoaded es un bool inicializado en false
   *title es un array
   *
   */

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [title, setTitle] = useState("string");
  const [description, setDescription] = useState("string");
  const [_author, setAuthor] = useState("string");
  const [_id, setId] = useState(0);

  const [_input_id, setInputId] = useState(1);

  const [_id_text, setText] = useState("");
  const [_title_text, setTitleText] = useState("");
  const [_description_text, setDescriptionText] = useState("");

  const [_is_post, setIsPost] = useState(false);
  const [_is_get, setIsGet] = useState(false);

  /**Como estoy usando Hooks y no clase esto lo miro como metodos de la clase del componente
   * por eso los marco como privados
   */
  function _handleGetButtonPress() {
    console.log("Get:" + isATextNumber({ _id_text }));
    if (isATextNumber({ _id_text })) {
      setInputId(parseInt(_id_text));
      setIsGet(true);
    }
  }

  function _handlePostButtonPress() {
    setIsPost(true);
  }

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()

  /** The Effect Hook allows you to carry out side
   * effects on functional components.
   * Con esto le indicamos que el componente debe hacer
   * algo despues de renderizar
   * Al agregarlo dentro del componente permite aceder a las variables de estado*/

  /** Sometimes, we want to run some additional code after React has updated the DOM.
   * Network requests, manual DOM mutations, and logging are common examples of effects
   * that don’t require a cleanup.*/

  let url = "https://bookbnb-appserver.herokuapp.com/notes/" + _input_id;
  console.log("url:" + url);
  useEffect(() => {
    if ((_is_get && _input_id > 0) || !isLoaded) {
      fetch(url)
        .then((res) => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setTitle(result.title);
            setDescription(result.description);
            setId(result.id);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    } else if (_is_get) {
      Alert.alert("Debe completar el campo id");
    }
    return () => {
      setIsGet(false);
    };
  }, [_is_get]);
  /** 
  url = "https://bookbnb-appserver.herokuapp.com/posts/" + _id;
  console.log("url:" + url);
  useEffect(() => {
    if (POST){}
    fetch(url)
      .then((response) => response.json())
      //.then((json) => console.log(json))
      .then((result) => {
        setIsLoaded(true);
        setIsPostsLoaded(true);
        setTitle(result.title);
        setDescription(result.body);
        setAuthor(result.author);
        setId(result.id);
      });
  }, []);
*/
  //POST request using fetch inside useEffect
  /**El formato lo podes sacar viendo el try it out
   * the FastApi que te muestra el Curl para el POST*/

  console.log("posting:" + _is_post);
  useEffect(() => {
    if (_is_post && _title_text !== "" && _description_text !== "") {
      console.log("UseEffect");
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
        .then((json) => console.log(json));
    } else if (_is_post) {
      Alert.alert("Debe completar los campos title y description");
    }
    return () => {
      console.log("CleanUp");
      setIsPost(false);
    };
  }, [_is_post]);

  /** 
  useEffect(() => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "ReactNativePost",
        body: "posts",
        author:"Agus",

      }),
    };
    fetch("https://bookbnb-appserver.herokuapp.com/posts/", requestOptions)
      .then((response) => response.json())
      .then((json) => console.log(json));
  }, []);
  */

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
            {" "}
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
          </View>
        </View>
        <View style={styles.footerContainer}>
          <Text> JSON Response </Text>
          <Text> title: {title} </Text>
          <Text> description: {description}</Text>
          <Text> id: {_id}</Text>
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
    //flexGrow: 1,
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
    marginBottom: 10,
    paddingVertical: 10,
    backgroundColor: colors.header,
  },
  buttonText: {
    textAlign: "center",
    color: colors.text,
    fontWeight: "700",
  },
});

export default ReactFetchScreen;

/**TODO @AgustinLeguizamon Como Hacer para correr
 * React navigation
 * Dar la opcion de elegir hacer un POSt, Note, 
 * 
 * <Button title="Get" onPress={_handleGetButtonPress}></Button>
            
*/

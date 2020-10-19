import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Button, TextInput } from "react-native";

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

function Ajax(props) {
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
  const [isCorrectId, setIsCorrectId] = useState(false);
  const [title, setTitle] = useState("string");
  const [description, setDescription] = useState("string");
  const [id, setId] = useState(1);

  const [text, setText] = useState("");

  /**Como estoy usando Hooks y no clase esto lo miro como metodos de la clase del componente
   * por eso los marco como privados
   */
  function _handleGetButtonPress() {
    console.log(isATextNumber({ text }));
    if (isATextNumber({ text })) {
      setId(parseInt(text));
    }
  }

  const ph = () => console.log("placeholder handler");

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
  console.log("id:" + id);
  let url = "https://bookbnb-appserver.herokuapp.com/notes/" + id;
  console.log("url:" + url);
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      //.then((json) => console.log(json))
      .then(
        (result) => {
          setIsLoaded(true);
          setTitle(result.title);
          setDescription(result.description);
          setId(result.id);
        },
        // Nota: es importante manejar errores aquí y no en
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
    /** empty dependency array means this 
    effect will only run once (like 
    componentDidMount in classes)*/
  }, []);

  useEffect(() => {
    //POST request using fetch inside useEffect
    /**El formato lo podes sacar viendo el try it out
     * the FastApi que te muestra el Curl para el POST*/
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "ReactNative",
        description: "ReactNative",
      }),
    };
    fetch("https://bookbnb-appserver.herokuapp.com/notes/", requestOptions)
      .then((response) => response.json())
      .then((json) => console.log(json));
  }, []);

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
        <Text style={styles.text}>
          Para Get indicar un id y presionar GET, para un POST apretar SEND
        </Text>
        <TextInput
          style={styles.textContainer}
          placeholder="Id"
          onChangeText={(text) => setText(text)}
          defaultValue={text}
        ></TextInput>
        <Text style={styles.textContainer}>DEBUG TEXT: {text}</Text>
        <View style={styles.buttonContainer}>
          <Button title="Get" onPress={_handleGetButtonPress}></Button>
          <Button title="Send" onPress={ph}></Button>
          <Button title="Reset" onPress={ph}></Button>
        </View>
        <Text> title: {title} </Text>
        <Text> description: {description}</Text>
        <Text> id: {id}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
  },
  textContainer: {
    backgroundColor: "lightblue",
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    padding: 10,
  },
});

export default Ajax;

/**TODO @AgustinLeguizamon Como Hacer para correr
 * el UseEffect bajo demanda en vez de que
 * suceda una y cada vez que se inicia la app*/

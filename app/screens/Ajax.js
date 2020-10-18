import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Button } from "react-native";

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
  const [title, setTitle] = useState("string");
  const [description, setDescription] = useState("string");
  const [id, setId] = useState(0);

  const handleButtonPress = () => alert("Get");

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
  useEffect(() => {
    fetch("https://bookbnb-appserver.herokuapp.com/notes/1")
      .then((res) => res.json())
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
  }, []);

  /** En el return pongo el botton <button onClick={() => setCount(count + 1)}>
   * del Get y Send
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
        <Text> title: {title} </Text>
        <Text> description: {description}</Text>
        <Text> id: {id}</Text>
      </View>
    );

    /**return (
      <View style={styles.mainContainer}>
        <Text style={styles.text}>
          Mostrar en pantallaaaaaaaaaaaaaaaaaaaaaaa
        </Text>
        <Button title="Get" onPress={handleButtonPress}></Button>
      </View>
    );*/
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
});

export default Ajax;

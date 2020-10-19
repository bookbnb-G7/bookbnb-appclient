import React, { useEffect, useState } from "react";
import {
  Button,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

function PingScreen(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [title, setTitle] = useState("string");
  const [description, setDescription] = useState("string");
  const [id, setId] = useState(1);

  useEffect(() => {
    fetch("https://bookbnb-appserver.herokuapp.com/notes/" + id)
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

  /** Para navegar de un screen a otro tengo que instalar React navigation, al parecer*/
  const handleSendButtonPress = () => alert("Send Pressed");
  const handleGetButtonPress = () => alert("Get Pressed");
  return (
    <View style={styles.mainContainer}>
      <View style={styles.childContainer}>
        <TextInput
          style={styles.textInputContainer}
          placeholder="Id"
        ></TextInput>
        <TouchableOpacity style={styles.button}>
          <Button title="Get" onPress={handleGetButtonPress}></Button>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Button title="Send" onPress={handleSendButtonPress}></Button>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#3498db",
    justifyContent: "center",
  },
  childContainer: {
    //flexGrow: 0.3,
    justifyContent: "center",
    paddingHorizontal: 40,
    //backgroundColor: "red",
    //marginBottom: 20,
  },
  textInputContainer: {
    backgroundColor: "lightblue",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    marginBottom: 10,
  },
});

export default PingScreen;

import React, { Component } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import fonts from "../config/fonts";

class Counter extends Component {
  render() {
    return (
      <View style={styles.counterContainer}>
        <Text style={styles.counterText}> {this.props.title} </Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() => this.props.onIncrement(this.props.counter, 1)}
          >
            <Text style={styles.button}> + </Text>
          </TouchableOpacity>
          <Text> {this.props.counter.quantity} </Text>
          <TouchableOpacity
            onPress={() => this.props.onIncrement(this.props.counter, -1)}
          >
            <Text style={styles.button}> - </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const dimensions = Dimensions.get("window");

const styles = StyleSheet.create({
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  counterText: {
    flex: 1,
    fontSize: fonts.big,
  },
  buttonsContainer: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    fontSize: fonts.bigBig,
    marginHorizontal: dimensions.width * 0.03,
  },
});

export default Counter;

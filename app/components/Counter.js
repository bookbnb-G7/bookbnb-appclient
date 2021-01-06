import React, { Component } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import fonts from "../config/fonts";
import constants from "../constant/constants";
import Ionicons from "@expo/vector-icons/MaterialCommunityIcons"
import colors from "../config/colors";

class Counter extends Component {
  render() {
    return (
      <View style={styles.counterContainer}>
        <Text style={styles.counterText}> {this.props.title} </Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() =>
              this.props.onIncrement(
                this.props.counter,
                this.props.counter.quantity <= 0 ? 0 : -1
              )
            }
          >
            <Ionicons name="minus-circle-outline" size={25}/>
          </TouchableOpacity>
          <Text style={styles.counter}> {this.props.counter.quantity} </Text>
          <TouchableOpacity
            onPress={() =>
              this.props.onIncrement(
                this.props.counter,
                this.props.counter.quantity >= this.props.maxCount ? 0 : 1
              )
            }
          >
            <Ionicons name="plus-circle-outline" size={25} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

Counter.defaultProps = {
  title: "No title",
  maxCount: constants.maxCount,
};

const dimensions = Dimensions.get("window");

const styles = StyleSheet.create({
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
  counter: {
    paddingHorizontal: 3,
    fontSize: 15
  }
});

export default Counter;

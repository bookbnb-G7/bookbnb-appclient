import React from "react";
import { Component } from "react";
import { StyleSheet, Text } from "react-native";
import BnbBodyView from "../components/BnbBodyView";
import BnbButton from "../components/BnbButton";
import BnbMainView from "../components/BnbMainView";
import Counter from "../components/Counter";
import colors from "../config/colors";
import fonts from "../config/fonts";
import styling from "../config/styling";
import Separator from "../helpers/Separator";

class SearchCountersScreen extends Component {
  state = {
    counters: [
      { ageGroup: "adult", quantity: 0 },
      { ageGroup: "children", quantity: 0 },
    ],
  };

  _handleIncrement = (Counter, offset) => {
    const index = this.state.counters.indexOf(Counter);
    const cpyCounter = this.state.counters[index];
    cpyCounter.quantity += offset;
    this.setState({ cpyCounter });
  };

  _handleNextButtonPress = () => {
    this.props.navigation.navigate("SearchResultRooms");
  };

  render() {
    return (
      <BnbMainView>
        <Text style={styles.bigText}>¿Cuantos van a hospedarse?</Text>
        <Separator style={{ borderBottomWidth: 0 }} />
        <BnbBodyView>
          <Counter
            title="Adultos"
            onIncrement={this._handleIncrement}
            counter={this.state.counters[0]}
          ></Counter>
          <Counter
            title="Niños"
            onIncrement={this._handleIncrement}
            counter={this.state.counters[1]}
          ></Counter>
          <BnbButton
            title="Siguiente"
            onPress={this._handleNextButtonPress}
          ></BnbButton>
        </BnbBodyView>
      </BnbMainView>
    );
  }
}

const styles = StyleSheet.create({
  bigText: {
    color: colors.graySoft,
    fontSize: fonts.bigBig,
    width: "60%",
    marginHorizontal: styling.bodyHPadding,
  },
});

export default SearchCountersScreen;

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
import Separator from "../components/Separator";

class SearchCountersScreen extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    counters: [
      { age_group: "adult", quantity: 0 },
      { age_group: "children", quantity: 0 },
    ],
  };

  _handleIncrement = (counter, offset) => {
    const index = this.state.counters.indexOf(counter);
    const cpyCounter = this.state.counters[index];
    cpyCounter.quantity += offset;
    this.setState({ cpyCounter });
  };

  _handleNextButtonPress = () => {
    const amount_of_people =
      this.state.counters[0].quantity + this.state.counters[1].quantity;
    const searchForm = {
      ...this.props.route.params,
      "amount_of_people": amount_of_people
    };
    this.props.navigation.navigate("OptionalFilters", searchForm);
  };

  render() {
    return (
      <BnbMainView style={styles.background}>
        <Text style={styles.headerText}>¿Cuantos van a hospedarse?</Text>
        <BnbBodyView style={styles.bodyView}>
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
  background: {
    backgroundColor: colors.redAirBNB,
    paddingLeft: 5,
    paddingRight: 5,
    alignItems: "center",
  },
  bigText: {
    color: colors.graySoft,
    fontSize: fonts.bigBig,
    width: "60%",
    marginHorizontal: styling.bodyHPadding,
  },
  bodyView: {
    width: "100%",
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  headerText: {
    fontFamily: "Raleway_700Bold",
    fontSize: 23,
    paddingLeft: 11,
    paddingVertical: 15,
    color: colors.white,
  },
});

export default SearchCountersScreen;

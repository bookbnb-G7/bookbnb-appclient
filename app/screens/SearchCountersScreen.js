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
    const { searchForm } = this.props.route.params;
    searchForm["amount_of_people"] = amount_of_people;
    this.props.navigation.navigate("SearchResultRooms", {
      searchForm: searchForm,
    });
  };

  render() {
    return (
      <BnbMainView style={styles.background}>
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
  background: {
    backgroundColor: colors.redBackground,
  },
  bigText: {
    color: colors.graySoft,
    fontSize: fonts.bigBig,
    width: "60%",
    marginHorizontal: styling.bodyHPadding,
  },
});

export default SearchCountersScreen;

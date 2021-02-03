import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import bnbStyleSheet from "../constant/bnbStyleSheet";
import constants from "../constant/constants";
import Counter from "./Counter";
import PropTypes from "prop-types";
import BnbButton from "./BnbButton";
import Separator from "./Separator";

function RoomRating({ is_owner, onRateRoom }) {
  const [_rating, setRating] = useState({
    quantity: 0,
  });

  const _handleRatingChange = (counter, offset) => {
    const new_quantity = _rating.quantity + offset;
    setRating((prevState) => ({ ...prevState, quantity: new_quantity }));
  };

  const _handleRateRoomButtonPress = () => {
    onRateRoom(_rating.quantity);
  };

  return (
    <View>
      {!is_owner && (
        <View>
          <Text style={bnbStyleSheet.headerTextBlack}>
            Puntua esta habitación
          </Text>
          <Counter
            title="Rating"
            onIncrement={_handleRatingChange}
            counter={_rating}
            maxCount={constants.maxRating}
          />
          <BnbButton title="Puntuar" onPress={_handleRateRoomButtonPress} />
          <Separator />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});

RoomRating.propTypes = {
  room_id: PropTypes.number,
  is_owner: PropTypes.bool,
  onRateRoom: PropTypes.func,
};

export default RoomRating;

import React from "react";
import BnbMainView from "./BnbMainView";
import { Component } from "react";
import { SliderBox } from "react-native-image-slider-box";
import { StyleSheet, View } from "react-native";
import colors from "../config/colors";
import styling from "../config/styling";

class BnbImageSlider extends Component {
  constructor(props) {
    super(props);
  }

  onLayout = (e) => {
    this.setState({
      width: e.nativeEvent.layout.width,
    });
  };

  render() {
    return (
      <View style={styles.container} onLayout={this.onLayout}>
        <SliderBox
          images={
            this.props.images.length !== 0
              ? this.props.images
              : [require("../assets/Bookbnb_logo.png")]
          }
          onCurrentImagePressed={(index) => {
            this.props.onPress ? this.props.onPress(index) : {};
          }}
          currentImageEmitter={(index) =>
            console.log(`Current pos is: ${index}`)
          }
          parentWidth={this.props?.width}
          sliderBoxHeight={this.props?.height}
        ></SliderBox>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default BnbImageSlider;

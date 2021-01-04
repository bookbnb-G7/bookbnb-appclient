import React from "react";
import BnbMainView from "./BnbMainView";
import { Component } from "react";
import { SliderBox } from "react-native-image-slider-box";
import { StyleSheet, View } from "react-native";

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
          images={this.props.images}
          onCurrentImagePressed={() => {
            this.props.onPress ? this.props.onPress() : {};
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

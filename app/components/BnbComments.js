import React from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import {
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { Component } from "react";
import styling from "../config/styling";
import colors from "../config/colors";
import BnbComment2 from "./BnbComment2";

class BnbComments extends Component {
  constructor(props) {
    super(props);
  }

  _handleDeleteComment(comment_id) {
    console.log("httPostRequest: body" + comment_id);
  }

  _handleReplyComment(comment_text, parent_id) {
    console.log("httPostRequest: body" + comment_text + " parent" + parent_id);
  }

  render() {
    return (
      <View>
        <BnbComment2
          comment={this.props.comment}
          canEdit={this.props.comment.commentator_id === this.props.me_id}
        />
        {this.props.comment.answers.map((item, index) => (
          <View key={item.comment.id}>
            <BnbComment2
              comment={this.props.comment}
              canEdit={this.props.comment.commentator_id === this.props.me_id}
            />
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dud: {
    color: "black",
  },
});

export default BnbComments;

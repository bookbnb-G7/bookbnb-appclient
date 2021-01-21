import React from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import {
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import PropTypes from "prop-types";
import { Component } from "react";
import constants from "../constant/constants";
import styling from "../config/styling";
import colors from "../config/colors";

class BnbComment2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reply_visible: false,
      comment_text: "",
    };

    this.handleUsernameTap = this.handleUsernameTap.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleMakeReply = this.handleMakeReply.bind(this);
    this.handleSendReply = this.handleSendReply.bind(this);
  }

  handleUsernameTap() {
    if (this.props.onUsernameTap) {
      this.props.onUsernameTap(this.props.comment.commentator_id);
    }
  }

  handleDelete() {
    Alert.alert(
      "Confirmar Borrar",
      "Seguro de que quiere borrar el comentario",
      [
        {
          text: "Si",
          onPress: () => this.props.onDeleteTap(this.props.comment.id),
        },
        {
          text: "No",
          onPress: () => null,
        },
      ],
      false
    );
  }

  handleMakeReply() {
    if (this.props.onReply) {
      this.setState({ reply_visible: true });
    }
  }

  handleSendReply() {
    if (this.props.onReply) {
      this.setState({ reply_visible: false });
      this.props.onReply(this.state.comment_text, this.props.comment.id);
      this.setState({ comment_text: "" });
    }
  }

  render() {
    if (
      this.props.comment.main_comment_id > 0 &&
      this.props.answers?.length === 0
    ) {
      return null;
    }
    return (
      <View>
        <View style={styles.header}>
          <TouchableHighlight onPress={this.handleUsernameTap}>
            <View style={styles.user}>
              <Image
                style={styles.image}
                source={
                  this.props.image === ""
                    ? require("../assets/profile_icon.png")
                    : { uri: this.props.image }
                }
              ></Image>
              <Text style={styles.username}>
                {this.props.comment.commentator}
              </Text>
            </View>
          </TouchableHighlight>
        </View>
        <Text style={styles.timeStamp}>{this.props.comment.created_at}</Text>
        <View style={styles.body}>
          <Text>{this.props.comment.comment}</Text>
        </View>
        <View style={styles.actionBar}>
          {this.props.comment.commentator_id === this.props.me_id && (
            <TouchableOpacity
              style={styles.menuItem}
              onPress={this.handleDelete}
            >
              <Text> DELETE </Text>
            </TouchableOpacity>
          )}
          {!this.props.comment.main_comment_id && (
            <TouchableOpacity
              style={styles.menuItem}
              onPress={this.handleMakeReply}
            >
              <Text> Responder </Text>
            </TouchableOpacity>
          )}
        </View>
        {this.state.reply_visible && (
          <View style={styles.replyContainer}>
            <View>
              <TextInput
                style={styles.textInput}
                multiline
                numberOfLines={4}
                maxLength={constants.maxTextLength}
                onChangeText={(value) => this.setState({ comment_text: value })}
                value={this.state.comment_text}
              ></TextInput>
            </View>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={this.handleSendReply}
            >
              <Text> Publicar </Text>
            </TouchableOpacity>
          </View>
        )}
        {this.props.answers &&
          this.props.answers.map((item, index) => (
            <View key={item.id} style={styles.replyContainer}>
              <BnbComment2
                comment={item}
                me_id={this.props.me_id}
                onDeleteTap={this.props.onDeleteTap}
                onUsernameTap={this.props.onUsernameTap}
              />
            </View>
          ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.graySoft,
  },
  user: {
    flexDirection: "row",
  },
  actionBar: {
    flexDirection: "row",
  },
  textInput: {
    borderRadius: styling.smallCornerRadius,
    backgroundColor: colors.graySoft,
    borderWidth: 1,
    marginVertical: styling.separator,
  },
  menuItem: {
    borderWidth: 1,
  },
  replyContainer: {
    marginLeft: 40,
  },
});

BnbComment2.propTypes = {
  comment: PropTypes.object,
  styles: PropTypes.object,
  image: PropTypes.string,
  onUsernameTap: PropTypes.func,
  onDeleteTap: PropTypes.func,
  onReply: PropTypes.func,
};

export default BnbComment2;

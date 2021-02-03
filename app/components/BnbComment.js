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
import Separator from "./Separator";

class BnbComment extends Component {
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
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <TouchableHighlight onPress={this.handleUsernameTap}>
            <View style={styles.userContainer}>
              <Image
                style={styles.image}
                source={
                  this.props.image
                    ? require("../assets/profile_icon.png")
                    : { uri: this.props.image }
                }
              ></Image>
              <Text style={styles.boldText}>
                {this.props.comment.commentator}
              </Text>
            </View>
          </TouchableHighlight>
          <Text style={styles.boldText}>{this.props.comment.created_at}</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.menuItemText}>{this.props.comment.comment}</Text>
        </View>
        <View style={styles.actionBar}>
          {!this.props.comment.main_comment_id &&
            (this.props.comment.commentator_id === this.props.me_id ||
              this.props.is_room_owner) && (
              <TouchableOpacity
                style={styles.menuItem}
                onPress={this.handleMakeReply}
              >
                <Text style={styles.actionBarText}>Responder</Text>
              </TouchableOpacity>
            )}
          {this.props.comment.commentator_id === this.props.me_id && (
            <TouchableOpacity
              style={styles.menuItem}
              onPress={this.handleDelete}
            >
              <Text style={styles.actionBarText}> Borrar</Text>
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
              <Text style={styles.actionBarText}> Publicar </Text>
            </TouchableOpacity>
          </View>
        )}
        {this.props.answers?.length > 0 && (
          <Separator style={{ width: "100%" }} />
        )}
        {this.props.answers &&
          this.props.answers.map((item, index) => (
            <View key={item.id} style={styles.replyContainer}>
              <BnbComment
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
  mainContainer: {},
  image: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.graySoft,
    marginRight: 10,
  },
  header: {},
  body: {
    margin: 10,
  },
  userContainer: {
    flexDirection: "row",
  },
  actionBar: {
    backgroundColor: colors.alpha08,
    margin: 10,
    flexDirection: "row",
  },
  actionBarText: {
    fontFamily: "Raleway_700Bold",
    color: colors.redAirBNB,
  },
  textInput: {
    borderRadius: styling.smallCornerRadius,
    borderWidth: 1,
    backgroundColor: colors.graySoft,
    marginVertical: styling.separator,
  },
  menuItem: {},
  boldText: {
    fontFamily: "Raleway_700Bold",
  },
  menuItemText: {
    fontFamily: "Raleway_400Regular",
  },
  replyContainer: {
    marginLeft: 40,
  },
});

BnbComment.propTypes = {
  comment: PropTypes.object,
  styles: PropTypes.object,
  image: PropTypes.string,
  onUsernameTap: PropTypes.func,
  onDeleteTap: PropTypes.func,
  onReply: PropTypes.func,
};

export default BnbComment;

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

class BnbComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu_visible: false,
      reply_visible: false,
      comment: "",
    };

    this.handleUsernameTap = this.handleUsernameTap.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleUsernameTap() {
    if (this.props.onUsernameTap) {
      this.props.onUsernameTap(this.props.username);
    }
  }

  handleDelete() {
    Alert.alert(
      "Confirmar Borrar",
      "Seguro de que quiere borrar el comentario",
      [
        {
          text: "Si",
          onPress: () => this.props.onDeleteTap(this.props.id),
        },
        {
          text: "No",
          onPress: () => null,
        },
      ],
      true
    );
    this.setState({ menu_visible: false });
  }

  handleMakeReply() {
    if (this.props.onReply) {
      this.setState({ reply_visible: true });
    }
  }

  handleSendReply() {
    if (this.props.onReply) {
      this.props.onReply(this.state.comment, this.props.id);
    }
  }

  render() {
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
              <Text style={styles.username}>{this.props.username}</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.body}>
          <Text>{this.props.comment}</Text>
        </View>
        <View style={styles.actionBar}>
          <Text style={styles.timeStamp}>{this.props.timeStamp}</Text>
          {this.props.canEdit && (
            <TouchableOpacity
              style={styles.menuItem}
              onPress={this.handleDelete}
            >
              <Text> DELETE </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={this.handleMakeReply}
          >
            <Text> Responder </Text>
          </TouchableOpacity>
          {this.state.reply_visible && (
            <View>
              <View style={styles.addCommentContainer}>
                <TextInput
                  style={styles.textInput}
                  multiline
                  numberOfLines={4}
                  maxLength={constants.maxTextLength}
                  onChangeText={(value) => this.setState({ comment: value })}
                  value={this.state.comment}
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
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 30,
    height: 30,
    borderRadius: 15,
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
});

BnbComment.propTypes = {
  comment: PropTypes.string,
  styles: PropTypes.object,
  canEdit: PropTypes.bool,
  image: PropTypes.string,
  username: PropTypes.string,
  onUsernameTap: PropTypes.func,
  onDeleteTap: PropTypes.func,
};

export default BnbComment;

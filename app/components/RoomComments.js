import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import colors from "../config/colors";
import styling from "../config/styling";
import bnbStyleSheet from "../constant/bnbStyleSheet";
import constants from "../constant/constants";
import urls from "../constant/urls";
import httpGetTokenRequest from "../helpers/httpGetTokenRequest";
import httpPostTokenRequest from "../helpers/httpPostTokenRequest";
import BnbAlert from "./BnbAlert";
import BnbButton from "./BnbButton";
import BnbComment from "./BnbComment";
import BnbError from "./BnbError";
import Separator from "./Separator";

function RoomComments({ room_id, me_id, is_owner, token, navigation }) {
  const [_room_comments, setRoomComments] = useState();
  const [_is_loading, setIsLoading] = useState(true);
  const [_error, setError] = useState();
  const [_input_comment, setInputComment] = useState({ comment: "" });

  const _handleApiResponse = () => {
    fetchRoomComments();
  };

  const _handleApiError = (error) => {
    setError(error);
    setIsLoading(false);
  };

  const _handleTextChange = (key, value) => {
    setInputComment({ ..._input_comment, [key]: value });
  };

  const fetchRoomComments = async () => {
    httpGetTokenRequest(
      "GET",
      urls.URL_ROOMS + "/" + room_id + "/comments",
      {}
    ).then(
      (comments) => {
        setRoomComments(comments);
        setIsLoading(false);
      },
      (error) => {
        setError(error);
        setIsLoading(false);
      }
    );
  };

  const _handleAddParentComment = () => {
    if (_input_comment && _input_comment.comment != "") {
      setIsLoading(true);
      httpPostTokenRequest(
        "POST",
        urls.URL_ROOMS + "/" + room_id + "/comments",
        _input_comment,
        {
          "Content-Type": "application/json",
          "x-access-token": token,
        }
      ).then(
        (response) => {
          setInputComment({ ..._input_comment, comment: "" });
          fetchRoomComments();
        },
        (error) => {
          BnbAlert(
            "Error al publicar comentario",
            error.message,
            "Entendido",
            false
          );
          setIsLoading(false);
        }
      );
    } else {
      BnbAlert(
        "Publicar",
        "No puede publicar un comentario vacio",
        "Entendido"
      );
    }
  };

  const _handleUsernameTap = (user_id) => {
    if (user_id == me_id) {
      navigation.navigate("ProfileStack", { screen: "Profile" });
    } else {
      navigation.navigate("SearchRooms", {
        screen: "User",
        params: { user_id: user_id },
      });
    }
  };

  const _handleDeleteComment = (comment_id) => {
    setIsLoading(true);
    httpGetTokenRequest(
      "DELETE",
      urls.URL_ROOMS + "/" + room_id + "/comments/" + comment_id,
      { "x-access-token": token },
      _handleApiResponse,
      _handleApiError
    );
  };

  const _handleReplyComment = (comment, parent_id) => {
    /**Creo un comentario con el body requerido por el endpoint */
    setIsLoading(true);
    const endPointComment = {
      comment: comment,
      main_comment_id: parent_id,
    };
    httpPostTokenRequest(
      "POST",
      urls.URL_ROOMS + "/" + room_id + "/comments",
      endPointComment,
      {
        "Content-Type": "application/json",
        "x-access-token": token,
      }
    ).then(
      (comment) => {
        fetchRoomComments();
      },
      (error) => {
        BnbAlert(
          "Hubo un error al querer publicar la respuesta",
          `Error: ${error}`,
          "Entendido",
          false
        );
        setIsLoading(false);
      }
    );
  };

  useEffect(() => {
    let is_focused = true;
    fetchRoomComments();
    return function cleanup() {
      is_focused = false;
    };
  }, [room_id]);

  if (_is_loading) {
    return <Text>Cargando comentarios...</Text>;
  }
  if (_error) {
    return <BnbError>{_error.message}</BnbError>;
  }
  return (
    <View>
      <Text style={bnbStyleSheet.headerTextBlack}>Comentarios</Text>
      {_room_comments &&
        _room_comments.comments.map((item, index) => (
          <View key={item.comment.id} style={styles.commentsContainer}>
            <BnbComment
              comment={item.comment}
              answers={item.answers}
              me_id={me_id}
              is_room_owner={is_owner}
              onDeleteTap={_handleDeleteComment}
              onReply={_handleReplyComment}
              onUsernameTap={_handleUsernameTap}
            />
          </View>
        ))}
      {!is_owner && (
        <View style={styles.addCommentContainer}>
          <Text style={bnbStyleSheet.subHeaderText}>
            Comenta esta publicacion
          </Text>
          <TextInput
            style={styles.textInput}
            multiline
            numberOfLines={4}
            maxLength={constants.maxTextLength}
            onChangeText={(value) => _handleTextChange("comment", value)}
            value={_input_comment.comment}
          />
          <BnbButton title="Publicar" onPress={_handleAddParentComment} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  addCommentContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  textInput: {
    borderRadius: styling.smallCornerRadius,
    backgroundColor: colors.graySoft,
    borderWidth: 1,
    marginVertical: styling.separator,
  },
  commentsContainer: {
    paddingLeft: 10,
  },
});

export default RoomComments;

import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import colors from "../config/colors";
import styling from "../config/styling";
import bnbStyleSheet from "../constant/bnbStyleSheet";
import constants from "../constant/constants";
import urls from "../constant/urls";
import httpGetTokenRequest from "../helpers/httpGetTokenRequest";
import BnbButton from "./BnbButton";
import BnbComment2 from "./BnbComment2";
import BnbError from "./BnbError";
import Separator from "./Separator";

function RoomComments({
  room_id,
  me_id,
  is_owner,
  onDeleteTap,
  onReply,
  onUsernameTap,
  onAddParentComment,
}) {
  const [_room_comments, setRoomComments] = useState();
  const [_is_loading, setIsLoading] = useState(true);
  const [_error, setError] = useState();
  const [_input_comment, setInputComment] = useState({ comment: "" });

  const _handleTextChange = (key, value) => {
    setInputComment({ ..._input_comment, [key]: value });
  };

  const _handleAddParentComment = () => {
    onAddParentComment(_input_comment);
  };

  useEffect(() => {
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
    return function cleanup() {
      setError(undefined);
    };
  }, []);

  if (_is_loading) {
    return <Text>Cargando comentarios</Text>;
  }
  if (_error) {
    return <BnbError>{_error.message}</BnbError>;
  }
  return (
    <View>
      <Text style={bnbStyleSheet.headerTextBlack}>Comentarios</Text>
      {_room_comments &&
        _room_comments.comments.map((item, index) => (
          <View key={item.comment.id}>
            <BnbComment2
              comment={item.comment}
              answers={item.answers}
              me_id={me_id}
              onDeleteTap={onDeleteTap}
              onReply={onReply}
              onUsernameTap={onUsernameTap}
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
      <Separator />
    </View>
  );
}

const styles = StyleSheet.create({
  addCommentContainer: {},
  textInput: {
    borderRadius: styling.smallCornerRadius,
    backgroundColor: colors.graySoft,
    borderWidth: 1,
    marginVertical: styling.separator,
  },
});

export default RoomComments;

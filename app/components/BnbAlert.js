import { Alert } from "react-native";

const BnbAlert = (title, sub_title, text, is_cancelable, callback) => {
  Alert.alert(
    title,
    sub_title,
    [
      {
        text: text,
      },
    ],
    { cancelable: is_cancelable }
  );
  if (callback) {
    callback();
  }
};

export default BnbAlert;

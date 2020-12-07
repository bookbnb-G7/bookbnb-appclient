import { Alert } from "react-native";

const BnbAlert = (title, body, button, is_cancelable, callback) => {
  Alert.alert(
    title,
    body,
    [
      {
        text: button,
      },
    ],
    { cancelable: is_cancelable }
  );
  if (callback) {
    callback();
  }
};

export default BnbAlert;

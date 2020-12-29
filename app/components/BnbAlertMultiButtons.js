import { Alert } from "react-native";

/**buttons es una lista de objetos, cada objeto es un boton*/
const BnbAlertMultiButtons = (
  title,
  body,
  buttons,
  is_cancelable,
  callback
) => {
  Alert.alert(title, body, buttons, { cancelable: is_cancelable });
  if (callback) {
    callback();
  }
};

export default BnbAlertMultiButtons;

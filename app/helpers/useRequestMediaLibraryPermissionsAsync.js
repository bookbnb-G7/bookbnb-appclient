import React from "react";
import { Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";

/**Tener en cuenta que solicitar permisos solo sucede una vez */
async function useRequestMediaLibraryPermissionsAsync() {
  let is_granted = true;
  console.log(Platform.OS);
  if (Platform.OS !== "web") {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      is_granted = false;
    }
    return is_granted;
  }
}

export default useRequestMediaLibraryPermissionsAsync;

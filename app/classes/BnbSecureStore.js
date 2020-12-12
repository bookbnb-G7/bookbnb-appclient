import React from "react";
import * as SecureStore from "expo-secure-store";
import constants from "../constant/constants";

class BnbSecureStore {
  static async read(key) {
    try {
      if (key == constants.CACHE_USER_KEY) {
        const item = await SecureStore.getItemAsync(key);
        const jsonItem = JSON.parse(item);
        return jsonItem;
      }
    } catch (e) {
      console.log(e);
    }
  }

  static async remember(key, value) {
    try {
      if (key == constants.CACHE_USER_KEY) {
        value = value.toJSON();
      }
      await SecureStore.setItemAsync(key, JSON.stringify(value));
    } catch (e) {
      console.log(e);
    }
  }

  static async clear(key) {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (e) {
      console.log(e);
    }
  }
}

export default BnbSecureStore;

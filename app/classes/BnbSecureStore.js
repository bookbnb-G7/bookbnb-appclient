import React from "react";
import * as SecureStore from "expo-secure-store";
import constants from "../constant/constants";

class BnbSecureStore {
  static async read(key) {
    try {
      if (key === constants.CACHE_USER_KEY) {
        const item = await SecureStore.getItemAsync(key);
        if (!item) {
          throw new Error(`La key ${key} no se encuentra`);
        } else {
          return JSON.parse(item);
        }
      }
    } catch (e) {
      console.warn(e);
    }
  }

  static async remember(key, value) {
    try {
      await SecureStore.setItemAsync(key, JSON.stringify(value));
    } catch (e) {
      console.warn(e);
    }
  }

  static async rememberMe(id_token, user) {
    try {
      const storeUser = {
        auth_token: id_token,
        userData: user,
      };
      await SecureStore.setItemAsync(
        constants.CACHE_USER_KEY,
        JSON.stringify(storeUser)
      );
    } catch (e) {
      console.warn(e);
    }
  }

  static async clear(key) {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (e) {
      console.warn(e);
    }
  }
}

export default BnbSecureStore;

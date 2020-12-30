import React from "react";
import constants from "../constant/constants";
import urls from "../constant/urls";
import httpGetTokenRequest from "../helpers/httpGetTokenRequest";
import BnbSecureStore from "./BnbSecureStore";

class ApiClient {
  constructor() {
    this._handleResponse = this._handleResponse.bind(this);
  }

  _handleResponse(response, onResponse) {
    return onResponse(response);
  }

  login(token, onResponse) {
    httpGetTokenRequest(
      "GET",
      urls.URL_USERS + "/me",
      {
        "x-access-token": token,
      },
      onResponse
    ).then((data) => {
      if (data) {
        const storeUser = {
          auth_token: id_token,
          userData: data,
        };
        BnbSecureStore.remember(constants.CACHE_USER_KEY, storeUser);
      }
    });
  }
}

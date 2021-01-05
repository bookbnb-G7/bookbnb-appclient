import React from "react";

class app {
  constructor() {
    this._apiClient = undefined;
  }

  _apiClient() {
    if (this._apiClient === undefined) {
      this._setUpApiClient();
    }

    return this._apiClient;
  }

  _setUpApiClient() {
    this._apiClient = new ApiClient();
  }
}

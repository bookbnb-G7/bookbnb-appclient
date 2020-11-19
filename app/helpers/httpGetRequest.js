import React from "react";

const httpGetRequest = (method, url, onResponse) => {
  const requestOptions = {
    method: method,
  };
  fetch(url, requestOptions)
    .then((response) => response.json())
    .then((data) => onResponse(data));
};

export default httpGetRequest;

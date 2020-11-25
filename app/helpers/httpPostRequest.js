import React from "react";

const httpPostRequest = (method, url, body, onResponse) => {
  const requestOptions = {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  fetch(url, requestOptions)
    .then((response) => response.json())
    .then((data) => onResponse(data));
};

export default httpPostRequest;

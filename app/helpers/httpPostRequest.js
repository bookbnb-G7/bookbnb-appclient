import React from "react";

const httpPostRequest = (
  method,
  url,
  body,
  onResponse,
  onError,
  content_type
) => {
  let _content_type =
    content_type !== undefined ? content_type : "application/json";
  const requestOptions = {
    method: method,
    headers: { "Content-Type": _content_type },
    body: JSON.stringify(body),
  };

  /**error captura los errores de red pero NO los errores de HTTP */
  fetch(url, requestOptions)
    .then((response) => response.json())
    .then(
      (data) => {
        onResponse(data);
      },
      (error) => {
        onError(error);
      }
    );
};

export default httpPostRequest;

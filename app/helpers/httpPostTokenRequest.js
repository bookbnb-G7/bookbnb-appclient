import React from "react";

async function httpPostTokenRequest(
  method,
  url,
  body,
  header,
  onResponse,
  onError,
  is_image
) {
  let requestOptions = {
    method: method,
    headers: header,
    body: JSON.stringify(body),
  };

  if (is_image) {
    const formData = new FormData();
    formData.append("file", body);

    requestOptions = {
      method: method,
      headers: header,
      body: formData,
    };
  }

  console.log("Debug httpPostTokenRequest header:" + JSON.stringify(header));
  console.log("Debug httpPostTokenRequest body:" + JSON.stringify(body));
  console.log("url: " + url);

  return fetch(url, requestOptions)
    .then(async (response) => {
      const data = await response.json();
      if (response.ok) {
        if (onResponse) {
          onResponse(data);
        }
        return data;
      } else {
        const error = (data && JSON.stringify(data)) || response.statusText;
        console.log("Respuesta de red OK pero HTTP no:" + error);
        if (onError) {
          onError(error);
        } else {
          return Promise.reject(error);
        }
      }
    })
    .catch((error) => {
      console.log("Error en la peticion fetch: " + error);
      if (onError) {
        onError(error);
      } else {
        return Promise.reject(error);
      }
    });
}

export default httpPostTokenRequest;

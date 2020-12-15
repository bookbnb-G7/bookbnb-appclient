import React from "react";

async function httpPostTokenRequest(
  method,
  url,
  body,
  header,
  onResponse,
  onError
) {
  const requestOptions = {
    method: method,
    headers: header,
    body: JSON.stringify(body),
  };
  console.log("Debug httpPostTokenRequest header:" + JSON.stringify(header));
  console.log("Debug httpPostTokenRequest body:" + JSON.stringify(body));
  /**error captura los errores de red pero NO los errores de HTTP */
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
        alert("Respuesta de red OK pero HTTP no:" + error);
        if (onError) onError();
      }
    })
    .catch((error) => {
      console.log("Error en la peticion fetch: " + error);
      if (onError) onError();
    });
}

export default httpPostTokenRequest;

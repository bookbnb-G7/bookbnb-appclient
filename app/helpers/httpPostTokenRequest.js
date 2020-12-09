import React from "react";

const httpPostTokenRequest = (
  method,
  url,
  body,
  header,
  onResponse,
  onError
) => {
  const requestOptions = {
    method: method,
    headers: header,
    body: JSON.stringify(body),
  };
  console.log("Debug httpPostTokenRequest:" + JSON.stringify(header));
  /**error captura los errores de red pero NO los errores de HTTP */
  fetch(url, requestOptions)
    .then(async (response) => {
      const data = await response.json();
      if (response.ok) {
        onResponse(data);
      } else {
        const error = (data && JSON.stringify(data)) || response.statusText;
        alert("Respuesta de red OK pero HTTP no:" + error);
        onError();
      }
    })
    .catch((error) => {
      console.log("Error en la peticion fetch:" + error);
      onError();
    });
};

export default httpPostTokenRequest;

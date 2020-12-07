import React from "react";

const httpPostImage = (method, url, image, onResponse, onError) => {
  const formData = new FormData();
  formData.append("file", image);
  const requestOptions = {
    method: method,
    headers: { "Content-Type": "multipart/form-data" },
    body: formData,
  };
  fetch(url, requestOptions)
    .then(async (response) => {
      const data = await response.json();
      if (response.ok) {
        console.log("OK:" + JSON.stringify(data));
        onResponse();
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

export default httpPostImage;

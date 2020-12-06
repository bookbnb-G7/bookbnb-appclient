import React from "react";

const httpPostImage = (method, url, image, onResponse, onError) => {
  const formData = new FormData();
  /**??????No le tengo que pasar un string si no un FildeDescriptor al archivo */
  formData.append("file", image);
  const requestOptions = {
    method: method,
    //headers: { "Content-Type": "multipart/form-data" },
    body: formData,
  };
  fetch(url, requestOptions)
    .then(async (response) => {
      const data = await response.json();
      if (response.ok) {
        console.log("OK:" + JSON.stringify(data));
      } else {
        const error = (data && JSON.stringify(data)) || response.statusText;
        alert("Respuesta de red OK pero HTTP no:" + error);
      }
    })
    .catch((error) => {
      console.log("Error en la peticion fetch:" + error);
    });
};

export default httpPostImage;

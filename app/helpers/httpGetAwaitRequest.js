import React from "react";

/**NO Testeado, ni se si funciona */
async const httpGetAwaitRequest = (method, url, onResponse) => {
    const requestOptions = {
        method: method,
    };
  
    const response = fetch(url, requestOptions)
    const data = await response.json();
    onResponse(data);
};

export default httpGetAwaitRequest;

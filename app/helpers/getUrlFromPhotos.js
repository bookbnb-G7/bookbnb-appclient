import React from "react";

const getUrlFromPhotos = (photos) => {
  let urls = [];
  photos.forEach(function (item, index, array) {
    console.log(item.url);
    urls.push(item.url);
  });
  return urls;
};

export default getUrlFromPhotos;

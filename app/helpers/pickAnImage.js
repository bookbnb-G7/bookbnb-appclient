import React from "react";
import * as ImagePicker from "expo-image-picker";

const pickAnImage = async (props) => {
  const getFileNameExtension = (fname) => {
    return fname.slice(((fname.lastIndexOf(".") - 1) >>> 0) + 2);
  };

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
    base64: true,
  });

  if (!result.cancelled) {
    const extension = getFileNameExtension(result.uri);
    const file = {
      uri: result.uri,
      name: "profile." + extension,
      type: "image/" + extension,
    };
    return file;
  }
};

export default pickAnImage;

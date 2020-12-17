import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";

/**El warning salta porque no se puede usar useState si el componente padre esta renderizando
 * hay que ponerle un renderizado condicional
 */
function useRequestCameraPermissions(callback) {
  const [isGranted, setIsGranted] = useState(false);
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status === "granted") {
          callback(true);
        }
      }
    })();
  }, []);
}

export default useRequestCameraPermissions;

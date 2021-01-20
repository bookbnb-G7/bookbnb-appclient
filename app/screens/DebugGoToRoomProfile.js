import React from "react";
import { TextInput } from "react-native-gesture-handler";
import BnbBodyView from "../components/BnbBodyView";
import BnbButton from "../components/BnbButton";
import BnbMainView from "../components/BnbMainView";

/**Solo para debuggin, esto pantalla te permite ir a un room o perfil cualquiera
 * al proporcionar un id
 */
function DebugGoToRoomProfile({ navigation }) {
  const [id, setId] = useState(0);
  return (
    <BnbMainView>
      <BnbBodyView>
        <TextInput
          style={{ backgroundColor: "gray" }}
          placeholder="id"
          onChangeText={setId}
        ></TextInput>
        <BnbButton
          title="Room"
          onPress={() => {
            navigation.navigate("Room", { room_id: id });
          }}
        ></BnbButton>
        <BnbButton
          title="User"
          onPress={() => {
            navigation.navigate("Profile", { user_id: id });
          }}
        ></BnbButton>
      </BnbBodyView>
    </BnbMainView>
  );
}

export default DebugGoToRoomProfile;

import React, { useState } from "react";
import { Profiler } from "react";
import { TextInput } from "react-native-gesture-handler";
import BnbBodyView from "../components/BnbBodyView";
import BnbBubbleView from "../components/BnbBubbleView";
import BnbButton from "../components/BnbButton";
import BnbFooterView from "../components/BnbFooterView";
import BnbMainView from "../components/BnbMainView";
import BnbTextInputObject from "../components/BnbTextInputObject";
import Separator from "../components/Separator";

function SignUpScreen(props) {
  const [profile, setProfile] = useState({
    firstname: "Mark",
    lastname: "Zuckerberg",
    email: "reptil@facebook.com",
    phonenumber: "650-543-4800",
    country: "USA",
    birthdate: "1984-05-14",
    photo:
      "https://melmagazine.com/wp-content/uploads/2020/07/zuck_sunscreen.jpg",
  });

  /**TODO: ver si asi funciona, mandandole el Object entero */
  const _handleTextChange = (id, text) => {
    setProfile((prevState) => ({
      ...prevState,
      [id]: text,
    }));
  };

  const _handleCreateUserButtonPress = () => {
    alert(JSON.stringify(profile));
  };

  return (
    <BnbMainView>
      <Separator style={{ borderBottomWidth: 0 }}></Separator>
      <BnbBodyView>
        <BnbTextInputObject
          left="Nombre"
          id={"firstname"}
          object={profile}
          editable={true}
          onChange={_handleTextChange}
        />
        <Separator style={{ borderBottomWidth: 0 }} />
        <BnbTextInputObject
          left="Apellido"
          id={"lastname"}
          object={profile}
          editable={true}
          onChange={_handleTextChange}
        />
        <Separator />
        <BnbButton
          title="Crear cuenta"
          onPress={_handleCreateUserButtonPress}
        />
      </BnbBodyView>
    </BnbMainView>
  );
}

export default SignUpScreen;

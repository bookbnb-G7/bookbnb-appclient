import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import BnbBodyView from "../components/BnbBodyView";
import BnbBubbleView from "../components/BnbBubbleView";
import BnbButton from "../components/BnbButton";
import BnbFooterView from "../components/BnbFooterView";
import BnbMainView from "../components/BnbMainView";
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
  const _handleTextChange = (profile) => {
    setProfile((prevState) => ({
      ...prevState,
      profile,
    }));
  };

  const _handleCreateUserButtonPress = () => {
    alert("mock");
  };

  return (
    <BnbMainView>
      <Separator style={{ borderBottomWidth: 0 }}></Separator>

      <BnbBodyView>
        <BnbTextInput
          left="Nombre"
          value={_price_per_day.toString()}
          editable={false}
          onChange={_handleTextChange}
        />
        <Separator style={{ borderBottomWidth: 0 }} />
        <BnbTextInput
          left="Apellido"
          value={_price_per_day.toString()}
          editable={false}
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

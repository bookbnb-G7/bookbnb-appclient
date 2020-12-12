import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "./Profile";
import ProfileInfoScreen from "./ProfileInfoScreen";
import RoomCreateScreen from "../RoomCreateScreen";
import ImagePickScreen from "../ImagePickScreen";
import constants from "../../constant/constants";
import BnbLoading from "../../components/BnbLoading";
import BnbSecureStore from "../../classes/BnbSecureStore";

const ProfileStack = createStackNavigator();

function ProfileStackScreen(props) {
  const [storedUser, setStoredUser] = useState();
  useEffect(() => {
    BnbSecureStore.read(constants.CACHE_USER_KEY).then((response) => {
      setStoredUser(response);
    });
  }, []);

  if (!storedUser) {
    return <BnbLoading></BnbLoading>;
  } else {
    return (
      <ProfileStack.Navigator>
        <ProfileStack.Screen name="Profile" component={Profile} />
        <ProfileStack.Screen name="ProfileInfo" component={ProfileInfoScreen} />
        <ProfileStack.Screen name="RoomCreate" component={RoomCreateScreen} />
        <ProfileStack.Screen name="ProfileImage" component={ImagePickScreen} />
      </ProfileStack.Navigator>
    );
  }
}

export default ProfileStackScreen;

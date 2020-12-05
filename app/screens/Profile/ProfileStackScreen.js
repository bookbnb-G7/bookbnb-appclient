import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "./Profile";
import ProfileInfoScreen from "./ProfileInfoScreen";
import RoomCreateScreen from "../RoomCreateScreen";
import ImagesPickScreen from "../ImagesPickScreen";
const ProfileStack = createStackNavigator();

function ProfileStackScreen(props) {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={Profile} />
      <ProfileStack.Screen name="ProfileInfo" component={ProfileInfoScreen} />
      <ProfileStack.Screen name="RoomCreate" component={RoomCreateScreen} />
      <ProfileStack.Screen name="ProfileImage" component={ImagesPickScreen} />
    </ProfileStack.Navigator>
  );
}

export default ProfileStackScreen;

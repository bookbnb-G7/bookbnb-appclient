import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "./Profile";
import ProfileInfoScreen from "./ProfileInfoScreen";
const ProfileStack = createStackNavigator();

function ProfileStackScreen(props) {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={Profile} />
      <ProfileStack.Screen name="ProfileInfo" component={ProfileInfoScreen} />
    </ProfileStack.Navigator>
  );
}

export default ProfileStackScreen;

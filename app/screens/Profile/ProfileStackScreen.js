import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "./Profile";
import ProfileInfoScreen from "./ProfileInfoScreen";
import RoomCreateScreen from "../RoomCreateScreen";
import ImagePickScreen from "../ImagePickScreen";
import constants from "../../constant/constants";
import BnbLoading from "../../components/BnbLoading";
import BnbSecureStore from "../../classes/BnbSecureStore";
import BnbHeaderUserInfo from "../../components/BnbHeaderUserInfo";
import ProfileRoomsScreen from "./ProfileRoomsScreen";
import ProfileBookingsScreen from "./ProfileBookingsScreen";

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
      <ProfileStack.Navigator
        screenOptions={{
          headerRight: (props) => (
            <BnbHeaderUserInfo userEmail={storedUser.userData.email} />
          ),
        }}
      >
        <ProfileStack.Screen name="Profile" component={Profile} />
        <ProfileStack.Screen name="ProfileInfo" component={ProfileInfoScreen} />
        <ProfileStack.Screen
          name="ProfileRooms"
          component={ProfileRoomsScreen}
        />
        <ProfileStack.Screen name="RoomCreate" component={RoomCreateScreen} />
        <ProfileStack.Screen
          name="ProfileBookings"
          component={ProfileBookingsScreen}
        />
        <ProfileStack.Screen name="ImagePick" component={ImagePickScreen} />
      </ProfileStack.Navigator>
    );
  }
}

export default ProfileStackScreen;

import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "./Profile";
import RoomCreateScreen from "../RoomCreateScreen";
import ImagePickScreen from "../ImagePickScreen";
import constants from "../../constant/constants";
import BnbSecureStore from "../../classes/BnbSecureStore";
import ProfileBookingsScreen from "./ProfileBookingsScreen";
import RoomBookingScreen from "../RoomBookingScreen";
import ProfileRoomsOptionsScreen from "./ProfileRoomsOptionsScreen";
import ProfileRoomsScreen from "./ProfileRoomsScreen";
import ProfileWalletScreen from "./ProfileWalletScreen";
import ImagesEditScreen from "../ImagesEditScreen";
import { Text } from "react-native";
import ReviewUserScreen from "../ReviewUserScreen";
import ProfileReviewsScreen from "./ProfileReviewsScreen";
import RoomScreen from "../RoomScreen";
import ProfileChatsScreen from "./ProfileChatsScreen";
import UserChatScreen from "./UserChatScreen";
import RoomEditScreen from "../RoomEditScreen";
import ProfileOwnerScreen from "./ProfileOwnerScreen";

const ProfileStack = createStackNavigator();

function ProfileStackScreen(props) {
  const [storedUser, setStoredUser] = useState();
  useEffect(() => {
    BnbSecureStore.read(constants.CACHE_USER_KEY).then((response) => {
      setStoredUser(response);
    });
  }, []);

  if (!storedUser) {
    return <Text>Cargando...</Text>;
  } else {
    return (
      <ProfileStack.Navigator
        screenOptions={{
          headerTitleStyle: {
            fontFamily: "Raleway_700Bold",
          },
          headerTitleAlign: "center",
        }}
      >
        <ProfileStack.Screen name="Profile" component={Profile} />
        <ProfileStack.Screen
          name="ProfileReviews"
          component={ProfileReviewsScreen}
        />
        <ProfileStack.Screen name="ReviewUser" component={ReviewUserScreen} />
        <ProfileStack.Screen
          name="ProfileOwner"
          component={ProfileOwnerScreen}
        />
        <ProfileStack.Screen
          name="ProfileRoomsOptions"
          component={ProfileRoomsOptionsScreen}
        />
        <ProfileStack.Screen
          name="ProfileRooms"
          component={ProfileRoomsScreen}
        />
        <ProfileStack.Screen name="Room" component={RoomScreen} />
        <ProfileStack.Screen name="RoomDetails" component={RoomEditScreen} />
        <ProfileStack.Screen name="ImagesEdit" component={ImagesEditScreen} />
        <ProfileStack.Screen name="RoomCreate" component={RoomCreateScreen} />
        <ProfileStack.Screen
          name="ProfileBookings"
          component={ProfileBookingsScreen}
        />
        <ProfileStack.Screen name="RoomBooking" component={RoomBookingScreen} />
        <ProfileStack.Screen
          name="ProfileWallet"
          component={ProfileWalletScreen}
        />
        <ProfileStack.Screen name="ImagePick" component={ImagePickScreen} />
      </ProfileStack.Navigator>
    );
  }
}

export default ProfileStackScreen;

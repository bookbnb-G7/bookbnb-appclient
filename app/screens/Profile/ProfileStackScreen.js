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
import ProfileBookingsScreen from "./ProfileBookingsScreen";
import RoomBookingScreen from "../RoomBookingScreen";
import ProfileEditScreen from "./ProfileEditScreen";
import ProfileRoomsOptionsScreen from "./ProfileRoomsOptionsScreen";
import ProfileRoomsScreen from "./ProfileRoomsScreen";
import ProfileWalletScreen from "./ProfileWalletScreen";
import ImagesEditScreen from "../ImagesEditScreen";
import { Text } from "react-native";
import ReviewUserScreen from "../ReviewUserScreen";

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
        <ProfileStack.Screen name="ReviewUser" component={ReviewUserScreen} />
        <ProfileStack.Screen name="ProfileEdit" component={ProfileEditScreen} />
        <ProfileStack.Screen name="ProfileInfo" component={ProfileInfoScreen} />
        <ProfileStack.Screen
          name="ProfileRoomsOptions"
          component={ProfileRoomsOptionsScreen}
        />
        <ProfileStack.Screen
          name="ProfileRooms"
          component={ProfileRoomsScreen}
        />
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

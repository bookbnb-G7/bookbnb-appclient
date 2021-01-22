import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import BnbSecureStore from "../classes/BnbSecureStore";
import BnbHeaderUserInfo from "../components/BnbHeaderUserInfo";
import BnbLoading from "../components/BnbLoading";
import constants from "../constant/constants";
import ImagesEditScreen from "./ImagesEditScreen";
import OptionalFiltersScreen from "./OptionalFiltersScreen";
import Profile from "./Profile/Profile";
import UserChatScreen from "./Profile/UserChatScreen";
import RoomEditScreen from "./RoomEditScreen";
import RoomScreen from "./RoomScreen";
import SearchCountersScreen from "./SearchCountersScreen";
import SearchDateTimePicker from "./SearchDateTimePicker";
import SearchInputScreen from "./SearchInputScreen";
import SearchResultRooms from "./SearchResultRooms";
import SearchRoomsScreen from "./SearchRoomsScreen";

const SearchStackNav = createStackNavigator();

function SearchStack(props) {
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
      <SearchStackNav.Navigator
        screenOptions={{
          headerTitleStyle: {
            fontFamily: "Raleway_700Bold",
          },
          headerTitleAlign: "center",
        }}
      >
        <SearchStackNav.Screen
          name="SearchInput"
          component={SearchInputScreen}
        />
        <SearchStackNav.Screen
          name="SearchDateTimePicker"
          component={SearchDateTimePicker}
        />
        <SearchStackNav.Screen
          name="SearchCounters"
          component={SearchCountersScreen}
        />
        <SearchStackNav.Screen
          name="OptionalFilters"
          component={OptionalFiltersScreen}
        />
        <SearchStackNav.Screen
          name="SearchResultRooms"
          component={SearchResultRooms}
        />
        <SearchStackNav.Screen name="Room" component={RoomScreen} />
        {/**Este profile es para del dueño del room o del comentario, no el del usuario*/}
        <SearchStackNav.Screen name="Profile" component={Profile} />
        <SearchStackNav.Screen name="UserChat" component={UserChatScreen} />

        <SearchStackNav.Screen name="ImagesEdit" component={ImagesEditScreen} />
      </SearchStackNav.Navigator>
    );
  }
}

export default SearchStack;

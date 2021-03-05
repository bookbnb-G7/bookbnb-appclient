import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useCallback, useEffect, useState } from "react";
import { Text } from "react-native";
import BnbSecureStore from "../classes/BnbSecureStore";
import constants from "../constant/constants";
import BookingDatePicker from "./BookingDatePicker";
import ImagesEditScreen from "./ImagesEditScreen";
import OptionalFiltersScreen from "./OptionalFiltersScreen";
import Profile from "./Profile/Profile";
import RoomScreen from "./RoomScreen";
import SearchCountersScreen from "./SearchCountersScreen";
import SearchDateTimePicker from "./SearchDateTimePicker";
import SearchInputScreen from "./SearchInputScreen";
import SearchResultRooms from "./SearchResultRooms";

const SearchStackNav = createStackNavigator();

function SearchStack({ navigation }) {
  const [storedUser, setStoredUser] = useState();
  let is_focused = false;

  useEffect(() => {
    BnbSecureStore.read(constants.CACHE_USER_KEY).then((response) => {
      setStoredUser(response);
    });
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", (e) => {
      e.preventDefault();
      if (is_focused) {
        navigation.navigate("SearchRooms", { screen: "SearchInput" });
      } else {
        navigation.navigate("SearchRooms");
      }
    });

    return unsubscribe;
  });

  useFocusEffect(
    useCallback(() => {
      is_focused = true;
      return () => {
        is_focused = false;
      };
    }, [navigation])
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", (e) => {
      e.preventDefault();
      if (is_focused) {
        navigation.navigate("SearchRooms", { screen: "SearchInput" });
      } else {
        navigation.navigate("SearchRooms");
      }
    });

    return unsubscribe;
  }, [navigation]);

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
        {/**Estos screen son para ver los datos de otros usuarios, no para los de mi propio perfil*/}
        <SearchStackNav.Screen name="User" component={Profile} />
        <SearchStackNav.Screen name="ImagesEdit" component={ImagesEditScreen} />
        <SearchStackNav.Screen name="BookingDatePicker" component={BookingDatePicker} />
      </SearchStackNav.Navigator>
    );
  }
}

export default SearchStack;

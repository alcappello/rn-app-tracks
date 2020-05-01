import React, { useCallback, useContext } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { SafeAreaView, withNavigationFocus } from "react-navigation";
import { Feather } from '@expo/vector-icons'

import Map from "../components/Map";
import Spacer from "../components/Spacer";
import { Context as LocationContext } from "../context/LocationContext";
import useLocation from "../hooks/useLocation";
import TrackForm from "../components/TrackForm";

const TrackCreateScreen = ({ isFocused }) => {
  const { state: {recording}, addLocation } = useContext(LocationContext);
  const callback = useCallback(
    (location) => {
      addLocation(location, recording);
    },
    [ recording ]);
  const [ err ] = useLocation(isFocused || recording, callback);

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Spacer>
        <Text h1>Create a Track</Text>
        <Spacer/>
        <Map/>
      </Spacer>
      {err ? <Spacer><Text>Please enable location service</Text></Spacer> : null}
      <TrackForm/>
    </SafeAreaView>
  );
};

TrackCreateScreen.navigationOptions = {
  title: 'Add Track',
  tabBarIcon: <Feather name='plus-square' size={20} />
}

const styles = StyleSheet.create({});

export default withNavigationFocus(TrackCreateScreen);
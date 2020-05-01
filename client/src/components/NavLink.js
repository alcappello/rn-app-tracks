import React from 'react';
import Spacer from './Spacer';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import {withNavigation} from 'react-navigation';

const NavLink = ({navigation, children, link}) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(link)}>
      <Spacer><Text style={styles.link}>{children}</Text></Spacer>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  link: {
    color: 'blue',
    fontSize: 16
  }
});

export default withNavigation(NavLink);
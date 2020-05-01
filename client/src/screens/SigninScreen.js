import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';

import { Context as AuthContext } from '../context/AuthContext';
import LoginForm from '../components/LoginForm';
import NavLink from '../components/NavLink';

const SigninScreen = () => {
  const { state, signin, clearErrorMessage } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <NavigationEvents onWillBlur={clearErrorMessage} />
      <LoginForm
        title="Sign In to Tracker"
        errorMessage={state.errorMessage}
        buttonText="Sign Up"
        auth={signin}
      />
      <NavLink link='Signup'>Don't have an account yet? Sign up instead!</NavLink>
    </View>
  );
};

SigninScreen.navigationOptions = () => ({
  headerShown: false
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 250
  }
});

export default SigninScreen;
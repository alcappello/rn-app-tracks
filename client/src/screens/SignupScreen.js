import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";

import { Context as AuthContext } from "../context/AuthContext";
import LoginForm from "../components/LoginForm";
import NavLink from "../components/NavLink";
import { NavigationEvents } from "react-navigation";

const SignupScreen = () => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <NavigationEvents onWillBlur={clearErrorMessage}/>
      <LoginForm
        title="Sign Up to Tracker"
        errorMessage={state.errorMessage}
        buttonText="Sign Up"
        auth={signup}
      />
      <NavLink link='Signin'>Already have an account? Sign in instead!</NavLink>
    </View>
  );
};

SignupScreen.navigationOptions = () => ({
  headerShown: false
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 250
  }
});

export default SignupScreen;
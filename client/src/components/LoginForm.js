import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import Spacer from './Spacer';
import { Button, Input, Text } from 'react-native-elements';

const LoginForm = ({ title, auth, errorMessage, buttonText }) => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  return (
    <>
      <Spacer>
        <Text h3>{title}</Text>
      </Spacer>
      <Spacer>
        <Input
          value={email}
          label="email"
          onChangeText={setEmail}
          autoCorrect={false}
          autoCapitalize='none'
        />
      </Spacer>
      <Spacer>
        <Input
          label="password"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
          autoCorrect={false}
          autoCapitalize='none'/>
      </Spacer>
      {errorMessage ? <Spacer><Text style={styles.error}>{errorMessage}</Text></Spacer> : null}
      <Spacer>
        <Button title={buttonText} onPress={() => auth({ email, password })}/>
      </Spacer>

    </>
  );
};

const styles = StyleSheet.create({
  error: {
    fontSize: 16,
    color: 'red'
  }
});

export default LoginForm;
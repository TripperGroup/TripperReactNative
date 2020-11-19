import React, { useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput, Button, Text } from 'react-native-paper';
import Logo from '../components/IntroLogo';

import {
  emailValidator,
  passwordValidator,
  nameValidator,
} from '../core/utils';
import { AuthContext, StateContext } from '../../App';

const SignUp = ({ navigation }) => {
  const { signUp } = useContext(AuthContext);
  const { signUpError } = useContext(StateContext);

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        width: '90%',
        alignSelf: 'center',
        marginVertical: 12,
      }}
    >
      <Logo />

      <Text style={styles.header}>‌Become a tripper.</Text>

      <TextInput
        style={styles.input}
        mode="outlined"
        label="Username"
        returnKeyType="next"
        value={userName.value}
        onChangeText={setUserName}
        // error={!!name.error}
        // errorText={name.error}
        styles={styles.input}
      />

      <TextInput
        style={styles.input}
        mode="outlined"
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={setEmail}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        styles={styles.input}
      />

      <TextInput
        style={styles.input}
        mode="outlined"
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={setPassword}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
        styles={styles.input}
      />
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Re enter password"
        returnKeyType="done"
        value={password.value}
        onChangeText={setPassword2}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
        styles={styles.input}
      />

      <Text>{signUpError}</Text>

      <Button
        dark
        mode="contained"
        onPress={() => signUp(userName, email, password, password2)}
        style={styles.button}
      >
        Sign Up
      </Button>

      <View style={styles.row}>
        <Text>Already a tripper? </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('SignIn')}
        >
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 24,
  },
  header: {
    fontWeight: '100',
    textAlign: 'center',
    fontSize: 26,
    paddingVertical: 14,
  },
  row: {
    flexDirection: 'row',
    marginTop: 10,
  },
  link: {
    fontWeight: 'bold',
  },
  label: {
    marginTop: 6,
  },
  input: {
    borderWidth: 0,
    marginTop: 10,
  },
});

export default SignUp;

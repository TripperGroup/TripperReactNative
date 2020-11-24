import React, { useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  TextInput,
  Button,
  Text,
  HelperText,
  Snackbar,
} from 'react-native-paper';
import Logo from '../components/IntroLogo';

import {
  emailValidator,
  passwordValidator,
  nameValidator,
} from '../core/utils';

import { AuthContext, StateContext } from '../../App';
import { colors } from '../constant/theme';

const SignUp = ({ navigation }) => {
  const { signUp } = useContext(AuthContext);
  const { signUpError, loadingIndicator, faild } = useContext(
    StateContext,
  );

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const signingUP = () => {
    signUp(userName, email, password, password2);
    faild ? null : navigation.navigate('SignIn');
  };

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
        autoCapitalize="none"
        returnKeyType="next"
        value={userName.value}
        onChangeText={setUserName}
        styles={styles.input}
        error={signUpError.username}
      />
      {signUpError.username ? (
        <HelperText
          type="error"
          visible={signUpError.username ? true : false}
        >
          {signUpError.username
            ? signUpError.username.toString()
            : null}
        </HelperText>
      ) : null}

      <TextInput
        style={styles.input}
        mode="outlined"
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        styles={styles.input}
        error={signUpError.email}
      />
      {signUpError.email ? (
        <HelperText
          type="error"
          visible={signUpError.email ? true : false}
        >
          {signUpError.email ? signUpError.email.toString() : null}
        </HelperText>
      ) : null}

      <TextInput
        style={styles.input}
        mode="outlined"
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={setPassword}
        error={signUpError.password}
        secureTextEntry
        styles={styles.input}
      />
      {signUpError.password ? (
        <HelperText
          type="error"
          visible={signUpError.password ? true : false}
        >
          {signUpError.password
            ? signUpError.password.toString()
            : null}
        </HelperText>
      ) : null}

      <TextInput
        style={styles.input}
        mode="outlined"
        label="Re enter password"
        returnKeyType="done"
        value={password.value}
        onChangeText={setPassword2}
        error={signUpError.non_field_errors}
        secureTextEntry
        styles={styles.input}
      />
      {signUpError.non_field_errors ? (
        <HelperText
          type="error"
          visible={signUpError.non_field_errors ? true : false}
        >
          {signUpError.non_field_errors
            ? signUpError.non_field_errors.toString()
            : null}
        </HelperText>
      ) : null}
      {signUpError.re_password ? (
        <HelperText
          type="error"
          visible={signUpError.re_password ? true : false}
        >
          {signUpError.re_password
            ? signUpError.re_password.toString()
            : null}
        </HelperText>
      ) : null}

      <Button
        dark
        loading={loadingIndicator || !faild ? true : false}
        mode="contained"
        onPress={signingUP}
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

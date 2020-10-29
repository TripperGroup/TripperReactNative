import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput, Button } from 'react-native-paper';
import Logo from '../components/IntroLogo';

import {
  emailValidator,
  passwordValidator,
  nameValidator,
} from '../core/utils';
import { AuthContext } from '../../App';

const SignUp = ({ navigation }) => {
  const { signUp } = useContext(AuthContext);

  const [name, setName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const _onSignUpPressed = () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
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
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
        styles={styles.input}
      />

      <TextInput
        style={styles.input}
        mode="outlined"
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
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
        onChangeText={(text) =>
          setPassword({ value: text, error: '' })
        }
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
        styles={styles.input}
      />

      <Button
        dark
        mode="contained"
        onPress={_onSignUpPressed}
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

import React, { useState, useContext, useEffect } from 'react';

import {
  TouchableOpacity,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  TextInput,
  Button,
  Text,
  HelperText,
  Snackbar,
} from 'react-native-paper';
import Logo from '../components/IntroLogo';
import { AuthContext } from '../../App';
import { StateContext } from '../../App';
import { colors } from '../constant/theme';

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [forgetPass, setForgetPass] = useState(false);

  useEffect(() => {}, [signedUpOk]);

  const { signIn, guestLogin } = useContext(AuthContext);
  const {
    loadingIndicator,
    faild,
    signInError,
    signedUpOk,
  } = useContext(StateContext);

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
      <Logo style={styles.logo} />

      <Text style={styles.header}>Welcome back</Text>

      <TextInput
        style={styles.input}
        mode="outlined"
        label="Username"
        returnKeyType="next"
        value={userName.value}
        onChangeText={setUserName}
        //onChangeText={(text) => setEmail({ value: text, error: '' })}

        autoCapitalize="none"
        //autoCompleteType="email"
        //textContentType="emailAddress"
        keyboardType="default"
        autoCorrect={false}
        error={signInError.username}
      />

      {signInError.username ? (
        <HelperText
          type="error"
          visible={signInError.username ? true : false}
        >
          {signInError.username
            ? signInError.username.toString()
            : null}
        </HelperText>
      ) : null}

      <TextInput
        mode="outlined"
        style={styles.input}
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={setPassword}
        secureTextEntry
        error={signInError.password}
      />

      {signInError.password ? (
        <HelperText
          type="error"
          visible={signInError.password ? true : false}
        >
          {signInError.password
            ? signInError.password.toString()
            : null}
        </HelperText>
      ) : null}

      <View style={styles.forgotPassword}>
        <TouchableOpacity onPress={() => setForgetPass(true)}>
          <Text
            style={{
              marginTop: 10,
              fontWeight: faild ? '500' : '200',
            }}
          >
            Forgot your password?
          </Text>
        </TouchableOpacity>
      </View>

      <Button
        dark
        loading={loadingIndicator ? true : false}
        mode="contained"
        onPress={() => {
          signIn(userName, password);
        }}
      >
        {faild ? 'TRY AGAIN' : 'LOGIN'}
      </Button>

      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
        <Text> or </Text>
        <TouchableOpacity onPress={() => guestLogin()}>
          <Text style={styles.link}>Login as a guest</Text>
        </TouchableOpacity>
      </View>

      <Snackbar
        visible={signedUpOk}
        onDismiss={() => {}}
        duration={4000}
        //style={{ backgroundColor: colors.accent }}
      >
        🎉 Hoorey! Now you are a tripper.
      </Snackbar>

      <Snackbar
        visible={forgetPass}
        onDismiss={() => setForgetPass(false)}
        duration={2000}
        //style={{ backgroundColor: colors.accent }}
      >
        ِYou should keep your eyes open :(
      </Snackbar>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  header: {
    fontWeight: '100',
    textAlign: 'center',
    fontSize: 26,
    paddingVertical: 14,
  },
  logo: { alignSelf: 'center' },
  row: {
    flexDirection: 'row',
    marginTop: 10,
  },

  link: {
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 0,
    marginTop: 10,
  },
  label: {
    marginTop: 12,
  },
});

export default SignIn;

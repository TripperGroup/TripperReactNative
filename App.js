import React, {
  useReducer,
  useEffect,
  useMemo,
  createContext,
} from 'react';

import {
  ActivityIndicator,
  View,
  ImageBackground,
} from 'react-native';
import {
  DefaultTheme,
  Provider as PaperProvider,
  DarkTheme,
} from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';

import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import AuthNavigations from './src/navigation/AuthNavigations';
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-community/async-storage';

import IntroLogo from './src/components/IntroLogo';
import SplashBackground from './assets/splashImage.jpg';

export const AuthContext = createContext();
export const StateContext = createContext();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'white',
    accent: '#67B75F',
  },
};

const App = ({ navigation }) => {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
            faild: false,
          };
        case 'REQUESTED':
          return {
            ...prevState,
            loadingIndicator: true,
            faild: false,
          };
        case 'FAILD':
          return {
            ...prevState,
            loadingIndicator: false,
            faild: true,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            loadingIndicator: false,
            isSignout: false,
            faild: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            loadingIndicator: false,
            faild: false,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      loadingIndicator: false,
      faild: false,
    },
  );

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('token');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      requesting: () => dispatch({ type: 'REQUESTED' }),
      signIn: async (username, password) => {
        axios
          .post('http://127.0.0.1:8001/api/auth/token/login/', {
            username,
            password,
          })
          .then((response) => {
            let token = response.data.auth_token;
            AsyncStorage.setItem('token', token);
            dispatch({ type: 'SIGN_IN', token: token });
          })
          .catch(
            (error) => console.log(error),
            dispatch({ type: 'FAILD' }),
          );
        //await AsyncStorage.setItem('token', token);
      },
      signOut: async () => {
        let token = await AsyncStorage.getItem('token');
        console.log(token);
        axios
          .post(
            'http://127.0.0.1:8001/api/auth/token/logout/',
            {},
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            },
          )
          .then((res) => {
            console.log(res.data);
            AsyncStorage.removeItem('token');
            dispatch({ type: 'SIGN_OUT' });
          })
          .catch(
            (error) => console.log(error),
            AsyncStorage.removeItem('token'),
            dispatch({ type: 'SIGN_OUT' }),
          );
      },
      signUp: async (name, email, password, password2) => {
        axios
          .post('http://127.0.0.1:8001/api/auth/users/', {
            username: name,
            email: email,
            password: password,
            re_password: password2,
          })
          .then((res) => {
            console.log(res.data);
          })
          .catch((error) => console.log(error));
      },
    }),
    [],
  );

  if (!state.isLoading) {
    return (
      <AuthContext.Provider value={authContext}>
        <StateContext.Provider value={state}>
          <PaperProvider theme={theme}>
            <NavigationContainer>
              {state.userToken == null ? (
                <AuthNavigations />
              ) : (
                <BottomTabNavigator />
              )}
            </NavigationContainer>
          </PaperProvider>
        </StateContext.Provider>
      </AuthContext.Provider>
    );
  } else {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
        }}
      >
        <ImageBackground
          source={SplashBackground}
          style={{
            flex: 1,
            resizeMode: 'cover',
            justifyContent: 'center',
          }}
          imageStyle={{ opacity: 1 }}
        >
          <IntroLogo />
          <ActivityIndicator
            color="white"
            style={{ marginTop: 15 }}
          />
        </ImageBackground>
      </View>
    );
  }
};

export default App;

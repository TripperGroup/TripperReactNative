import React, {
  useReducer,
  useEffect,
  useMemo,
  createContext,
} from 'react';

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
          .post(
            'http://127.0.0.1:8001/api/auth/login/',
            {
              username,
              password,
            },
            200,
          )
          .then((response) => {
            let token = response.data.token;
            AsyncStorage.setItem('token', token);
            dispatch({ type: 'SIGN_IN', token: token });
          })
          .catch(
            (error) => console.log(error),
            dispatch({ type: 'FAILD' }),
          );
      },
      signOut: async () => {
        let token = await AsyncStorage.getItem('token');
        axios
          .get('http://127.0.0.1:8001/api/auth/logout/', {
            headers: {
              Authorization: `Token ${token}`,
            },
          })
          .then((res) => {
            console.log(res.data);
          })
          .catch((error) => console.log(error));
        dispatch({ type: 'SIGN_OUT' });
      },
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    [],
  );
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
};

export default App;

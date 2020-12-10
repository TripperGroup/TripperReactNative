import React, {
  useReducer,
  useEffect,
  useMemo,
  createContext,
  useState,
} from 'react';

import {
  ActivityIndicator,
  View,
  ImageBackground,
  StatusBar,
} from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import AuthNavigations from './src/navigation/AuthNavigations';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import apiUrl from './src/constant/api';

import {
  theme,
  CombinedDarkTheme,
  CombinedDefaultTheme,
} from './src/constant/theme';

export const AuthContext = createContext();
export const StateContext = createContext();
export const ThemeContext = createContext();

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
            signUpError: [],
            signInError: [],
          };

        case 'FAILD':
          return {
            ...prevState,
            loadingIndicator: false,
            faild: true,
            userToken: null,
            signedUpOk: false,
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
        case 'GUEST':
          return {
            ...prevState,
            userToken: null,
            loadingIndicator: false,
            faild: false,
            isGuest: true,
          };
        case 'NOTGUEST':
          return {
            ...prevState,
            userToken: null,
            loadingIndicator: false,
            faild: false,
            isGuest: false,
          };

        case 'SIGN_UP_ERR':
          return {
            ...prevState,
            signUpError: action.errors,
          };
        case 'SIGN_IN_ERR':
          return {
            ...prevState,
            signInError: action.errors,
          };

        case 'SIGN_UP_OK':
          return {
            ...prevState,
            loadingIndicator: false,
            signedUpOk: true,
            faild: false,
          };

        case 'STOP_LOADING':
          return {
            ...prevState,
            loadingIndicator: false,
          };

        case 'USER_ID':
          return {
            ...prevState,
            userId: action.userId,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      loadingIndicator: false,
      faild: false,
      isGuest: false,
      signUpError: [],
      signInError: [],
      signedUpOk: false,
      userId: '',
    },
  );

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const theme = isDarkTheme
    ? CombinedDarkTheme
    : CombinedDefaultTheme; // Use Light/Dark theme based on a state

  const barStyle = isDarkTheme ? 'light-content' : 'dark-content'; // Use Light/Dark theme based on a state

  useEffect(() => {
    const fetchTheme = async () => {
      darkMode = await AsyncStorage.getItem(
        'isDarkTheme',
        (err, value) => {
          if (err) {
            console.log(err);
            setIsDarkTheme(true);
          } else {
            setIsDarkTheme(JSON.parse(value));
          }
        },
      );
    };

    // Fetch the token  from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('token');
      } catch (e) {
        console.log('Restoring token failed');
      }

      // After restoring token, we may need to validate it in production apps

      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    // Fetch the id from storage
    const bootstrapId = async () => {
      let userId;
      try {
        userId = await AsyncStorage.getItem('userId');
        console.log('user id is: ', userId);
      } catch (e) {
        console.log('Restoring id faild'); // maybe should navigate user to login again
        dispatch({ type: 'FAILD' });
      }
      dispatch({ type: 'USER_ID', userId: userId });
    };

    fetchTheme();
    bootstrapAsync();
    bootstrapId();
  }, []);

  const authContext = useMemo(
    () => ({
      guestLogin: () => dispatch({ type: 'GUEST' }),
      guestToSignUp: () => dispatch({ type: 'NOTGUEST' }),
      requesting: () => dispatch({ type: 'REQUESTED' }),

      signIn: (username, password) => {
        let token;
        dispatch({ type: 'REQUESTED' });
        axios
          .post(apiUrl + '/auth/token/login/', {
            username,
            password,
          })
          .then((response) => {
            token = response.data.auth_token;
            AsyncStorage.setItem('token', token);
            console.log(token);
            dispatch({ type: 'SIGN_IN', token: token });
            var myHeaders = new Headers();
            myHeaders.append('Authorization', `Token ${token}`);

            var requestOptions = {
              method: 'GET',
              headers: myHeaders,
              redirect: 'follow',
            };

            fetch(apiUrl + '/auth/users/me/', requestOptions)
              .then((response) => response.json())
              .then((result) => {
                let id = result.id.toString();
                AsyncStorage.setItem('userId', id);
                console.log(id);
                dispatch({ type: 'USER_ID', userId: id });
              })
              .catch((error) => {
                console.log('error fetching id: ', error),
                  dispatch({ type: 'FAILD' });
              });
          })
          .catch((error) => {
            console.log(error);
            if (error.response) {
              console.log(error.response.data);
              let err = error.response.data;
              dispatch({ type: 'SIGN_IN_ERR', errors: err });
              dispatch({ type: 'FAILD' });
            }
          });
      },

      signOut: async () => {
        let token = await AsyncStorage.getItem('token');
        console.log(token);
        axios
          .post(
            apiUrl + '/auth/token/logout/',
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
            AsyncStorage.removeItem('userId'),
            dispatch({ type: 'SIGN_OUT' }),
          );
      },
      signUp: (name, email, password, password2) => {
        dispatch({ type: 'REQUESTED' });
        axios
          .post(apiUrl + '/auth/users/', {
            username: name,
            email: email,
            password: password,
            re_password: password2,
          })
          .then((res) => {
            console.log(res.data);
            dispatch({ type: 'SIGN_UP_OK' });
          })
          .catch((error) => {
            console.log(error);
            if (error.response) {
              let err = error.response.data;
              dispatch({ type: 'SIGN_UP_ERR', errors: err });
              dispatch({ type: 'FAILD' });

              console.log(err);
            }
          });
      },
    }),
    [],
  );

  return (
    <SafeAreaProvider>
      <AuthContext.Provider value={authContext}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle={barStyle}
        />
        <StateContext.Provider value={state}>
          <ThemeContext.Provider
            value={[isDarkTheme, setIsDarkTheme]}
          >
            <PaperProvider theme={theme}>
              <NavigationContainer theme={theme}>
                {state.userToken == null && !state.isGuest ? (
                  <AuthNavigations />
                ) : (
                  <BottomTabNavigator theme={theme} />
                )}
              </NavigationContainer>
            </PaperProvider>
          </ThemeContext.Provider>
        </StateContext.Provider>
      </AuthContext.Provider>
    </SafeAreaProvider>
  );
};

export default App;

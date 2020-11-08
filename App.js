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
  StatusBar,
} from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import AuthNavigations from './src/navigation/AuthNavigations';
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-community/async-storage';

import IntroLogo from './src/components/IntroLogo';
import SplashBackground from './assets/splashImage.jpg';

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
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      loadingIndicator: false,
      faild: false,
      isGuest: false,
    },
  );

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

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

    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('token');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      dispatch({ type: 'RESTORE_TOKEN', token: 'userToken' });
    };
    fetchTheme();
    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      guestLogin: () => dispatch({ type: 'GUEST' }),
      guestToSignUp: () => dispatch({ type: 'NOTGUEST' }),
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

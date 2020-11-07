import React from 'react';
import {
  DefaultTheme,
  Provider as PaperProvider,
  DarkTheme,
  Paragraph,
  useTheme,
} from 'react-native-paper';

import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import { createStackNavigator } from '@react-navigation/stack';

import { darkThemeAuth, lightThemeAuth } from '../constant/theme';

const Stack = createStackNavigator();

export default AuthNavigations = () => {
  const paperTheme = useTheme();

  const theme = paperTheme.dark ? darkThemeAuth : lightThemeAuth;

  return (
    <PaperProvider theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="SignIn"
      >
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
    </PaperProvider>
  );
};

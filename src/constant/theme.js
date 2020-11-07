import { DefaultTheme, DarkTheme } from 'react-native-paper';
import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';

export const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'white',
    accent: '#67B75F',
  },
};
export const CombinedDarkTheme = {
  ...PaperDarkTheme,

  ...NavigationDarkTheme,
};

// export const theme = {
//   ...DefaultTheme,
//   colors: {
//     ...DefaultTheme.colors,
//     primary: 'white',
//     accent: '#67B75F',
//   },
// };

export const colors = {
  primary: 'white',
  accent: '#67B75F',
};

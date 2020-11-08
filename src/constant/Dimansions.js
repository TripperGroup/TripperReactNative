import { Platform, NativeModules } from 'react-native';
const { StatusBarManager } = NativeModules;

export const STATUSBAR_HEIGHT =
  Platform.OS === 'ios' ? null : StatusBarManager.HEIGHT;

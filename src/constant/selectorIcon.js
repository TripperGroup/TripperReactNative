// custom icon renderer passed to iconRenderer prop
// see the switch for possible icon name
// values
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Switch,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  LayoutAnimation,
  Image,
} from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { MaterialIcon, ActivitieIcon } from '../components/Icon';

export const icon = ({ name, size = 25, style }) => {
  // flatten the styles
  const flat = StyleSheet.flatten(style);
  // remove out the keys that aren't accepted on View
  const { color, fontSize, ...styles } = flat;

  let iconComponent;
  // the colour in the url on this site has to be a hex w/o hash
  const iconColor =
    color && color.substr(0, 1) === '#' ? `${color.substr(1)}/` : '';

  const Search = (
    <MaterialIcon
      name="magnify"
      size={size}
      style={{ width: size, height: size }}
    />
  );
  const Down = (
    <MaterialIcon
      name="arrow-down"
      size={size}
      style={{ width: size, height: size }}
    />
  );
  const Up = (
    <MaterialIcon
      name="arrow-up"
      size={size}
      style={{ width: size, height: size }}
    />
  );
  const Close = (
    <MaterialIcon
      name="close"
      size={size}
      style={{ width: size, height: size }}
    />
  );

  const Check = (
    <MaterialIcon
      name="check"
      size={size}
      style={{ width: size, height: size }}
    />
  );
  const Cancel = (
    <MaterialIcon
      name="cancel"
      style={{ width: size, height: size }}
    />
  );

  switch (name) {
    case 'search':
      iconComponent = Search;
      break;
    case 'keyboard-arrow-up':
      iconComponent = Up;
      break;
    case 'keyboard-arrow-down':
      iconComponent = Down;
      break;
    case 'close':
      iconComponent = Close;
      break;
    case 'check':
      iconComponent = Check;
      break;
    case 'cancel':
      iconComponent = Cancel;
      break;
    default:
      iconComponent = null;
      break;
  }
  return <View style={styles}>{iconComponent}</View>;
};

import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'react-native-paper';
import CustomIcon from '../components/CustomIcon.js';

export const MaterialIcon = (props) => {
  const paperTheme = useTheme();
  return (
    <MaterialCommunityIcons
      color={paperTheme.dark ? 'white' : null}
      {...props}
    />
  );
};

export const ActivitieIcon = (props) => {
  const paperTheme = useTheme();
  return (
    <CustomIcon
      color={paperTheme.dark ? 'white' : 'black'}
      {...props}
    />
  );
};

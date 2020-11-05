import React from 'react';
import { useWindowDimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabNavigator from './BottomTabNavigator';
import DrawerContent from '../components/DrawerContent';

const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  const dimensions = useWindowDimensions();
  const isLargeScreen = dimensions.width >= 400;

  return (
    <Drawer.Navigator
      drawerType="front"
      drawerContent={() => <DrawerContent />}
      drawerStyle={isLargeScreen ? null : { width: '80%' }}
    >
      <Drawer.Screen name="Home" component={BottomTabNavigator} />
    </Drawer.Navigator>
  );
};
export default DrawerNavigator;

import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTheme, Portal, FAB } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';

import TripStack from './TripStack';
import WikiStack from './WikiStack';
import ShopStack from './ShopStack';
import ProfileStack from './ProfileStack';

const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigator = () => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;
  return (
    <>
      <Tab.Navigator
        activeColor="#67B75F"
        sceneAnimationEnabled="true"
        initialRouteName="Trips"
        shifting="true"
        barStyle={{ backgroundColor: '#ffff' }}
      >
        <Tab.Screen
          name="Trips"
          component={TripStack}
          options={{
            tabBarIcon: 'map',
          }}
        />
        {/* <Tab.Screen
          name="Booking"
          component={Booking}
          options={{
            tabBarIcon: 'alpha-b-circle',
          }}
        /> */}
        <Tab.Screen
          name="Wiki"
          component={WikiStack}
          options={{
            tabBarIcon: 'book-open-variant',
          }}
        />
        <Tab.Screen
          name="Shop"
          component={ShopStack}
          options={{
            tabBarIcon: 'basket',
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileStack}
          options={{
            tabBarIcon: 'account-outline',
          }}
        />
      </Tab.Navigator>
      <Portal>
        <FAB.Group
          open={open}
          color="#ffff"
          style={{
            position: 'absolute',
            bottom: 40,
          }}
          icon={open ? 'map-plus' : 'plus'}
          actions={[
            {
              icon: 'fountain-pen-tip',
              label: 'Write Travelogue',
              onPress: () => console.log('Pressed email'),
            },
            {
              icon: 'crosshairs-gps',
              label: 'New GPS recording',
              onPress: () => console.log('Pressed notifications'),
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
    </>
  );
};

export default BottomTabNavigator;

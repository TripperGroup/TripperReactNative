import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import TripStack from './TripStack';
import WikiStack from './WikiStack';
import ShopStack from './ShopStack';
import ProfileStack from './ProfileStack';

const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <>
      <Tab.Navigator
        activeColor="#67B75F"
        sceneAnimationEnabled={true}
        initialRouteName="Trips"
        shifting={false} // hide title of inactive tab if true
        //labeled={true}
        //barStyle={{ backgroundColor: '#ffff' }}
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
    </>
  );
};

export default BottomTabNavigator;

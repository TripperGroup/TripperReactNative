import React, { useState } from 'react';
import { TouchableOpacity, Dimensions, View } from 'react-native';
import {
  Appbar,
  Avatar,
  Text,
  Button,
  Portal,
  Modal,
  Provider,
} from 'react-native-paper';
import { STATUSBAR_HEIGHT } from '../constant/Dimansions';

import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Shop from '../screens/shop/Shop';
import Cart from '../screens/shop/Cart';
import Checkout from '../screens/shop/Checkout';
import Detail from '../screens/shop/Detail';

const DEVICE_WIDTH = Dimensions.get('window').width;

MaterialCommunityIcons.loadFont();

const Stack = createStackNavigator();

export const Header = ({ scene, previous, navigation }) => {
  const { options } = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;

  return (
    <>
      <Appbar.Header statusBarHeight={STATUSBAR_HEIGHT}>
        {previous ? ( // Work on that later to handle back button
          <Appbar.BackAction onPress={navigation.goBack} />
        ) : (
          <Appbar.Action
            icon="shopping-outline"
            style={{ opacity: 0.7 }}
          />
        )}
        <Appbar.Content
          style={{
            marginRight: 8,
          }}
          title={title}
        />
      </Appbar.Header>
    </>
  );
};

export default ShopStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Shop"
      headerMode="screen"
      screenOptions={{
        header: ({ scene, previous, navigation }) => (
          <Header
            scene={scene}
            previous={previous}
            navigation={navigation}
          />
        ),
      }}
    >
      <Stack.Screen
        name="Shop"
        component={Shop}
        options={{ headerTitle: 'Shop' }}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{ headerTitle: 'Cart' }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{ headerTitle: 'Detail' }}
      />
      <Stack.Screen
        name="Checkout"
        component={Checkout}
        options={{ headerTitle: 'Checkout' }}
      />
    </Stack.Navigator>
  );
};

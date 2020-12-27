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
  FAB,
} from 'react-native-paper';
import { STATUSBAR_HEIGHT } from '../constant/Dimansions';

import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Shop from '../screens/Shop';
import ShopCart from '../screens/ShopCart';
import ShopCheckout from '../screens/ShopCheckout';
import ShopDetail from '../screens/ShopDetail';
import ShopCategory from '../screens/ShopCategory';

import { useNavigation } from '@react-navigation/native';

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
            onPress={() => {
              navigation.navigate('ShopCart');
            }}
          />
        )}
        <Appbar.Content
          style={{
            marginRight: 8,
          }}
          title={title}
        />
        {previous ? null : (
          <Appbar.Action
            icon="shape-outline"
            style={{ opacity: 0.7 }}
            onPress={() => {
              navigation.navigate('ShopCategory');
            }}
          />
        )}
      </Appbar.Header>
    </>
  );
};

export default ShopStack = () => {
  const navigation = useNavigation();

  return (
    <>
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
          name="ShopCart"
          component={ShopCart}
          options={{ headerTitle: 'Cart' }}
        />
        <Stack.Screen
          name="ShopCategory"
          component={ShopCategory}
          options={{ headerTitle: 'Categories' }}
        />
        <Stack.Screen
          name="ShopDetail"
          component={ShopDetail}
          options={({ route }) => ({
            title: route.params.name,
            id: route.params.id,
          })}
        />
        <Stack.Screen
          name="ShopCheckout"
          component={ShopCheckout}
          options={{ headerTitle: 'Checkout' }}
        />
      </Stack.Navigator>
    </>
  );
};

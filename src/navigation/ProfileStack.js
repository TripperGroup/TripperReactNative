import React, { useState } from 'react';
import { TouchableOpacity, Dimensions } from 'react-native';
import { STATUSBAR_HEIGHT } from '../constant/Dimansions';
import { Appbar, Avatar, Text, Button } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Profile from '../screens/Profile';
import ProfileSetting from '../screens/ProfileSetting';

import SearchHeader from 'react-native-search-header';

const DEVICE_WIDTH = Dimensions.get('window').width;

MaterialCommunityIcons.loadFont();

const Stack = createStackNavigator();

export const Header = ({ scene, previous, navigation }) => {
  const searchHeaderRef = React.useRef(null);

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
            icon="cog-outline"
            onPress={() => {
              navigation.navigate('Setting');
            }}
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

export default ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      headerMode="float"
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
        name="Profile"
        component={Profile}
        options={{ headerTitle: 'Profile' }}
      />
      <Stack.Screen
        name="Setting"
        component={ProfileSetting}
        options={{ headerTitle: 'Setting' }}
      />
    </Stack.Navigator>
  );
};

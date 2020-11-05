import React, { useState } from 'react';
import { TouchableOpacity, Dimensions } from 'react-native';
import { Appbar, Avatar, Text, Button } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Profile from '../screens/Profile';

import Map from '../screens/Map';

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
      <Appbar.Header>
        {previous ? ( // Work on that later to handle back button
          <Appbar.BackAction onPress={navigation.goBack} />
        ) : (
          <Appbar.Action
            icon="cog-outline"
            onPress={() => {
              navigation.navigate('Map');
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
      <SearchHeader
        ref={searchHeaderRef}
        placeholder="Search trips..."
        placeholderColor="gray"
        topOffset={36}
        autoFocus={true}
        visibleInitially={false}
        persistent={false}
        enableSuggestion={true}
        style={{
          header: {
            height: 70,
            backgroundColor: `#fdfdfd`,
          },
        }}
        entryAnimation="from-left-side"
        // pinnedSuggestions={[
        //   `react-native-search-header`,
        //   `react-native`,
        //   `javascript`,
        // ]}
        onClear={() => {
          console.log(`Clearing input!`);
        }}
        // onGetAutocompletions={async (text) => {
        //   if (text) {
        //     const response = await fetch(
        //       `http://suggestqueries.google.com/complete/search?client=firefox&q=${text}`,
        //       {
        //         method: `get`,
        //       },
        //     );
        //     const data = await response.json();
        //     return data[1];
        //   } else {
        //     return [];
        //   }
        // }}
      />
    </>
  );
};

export default ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
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
        name="Profile"
        component={Profile}
        options={{ headerTitle: 'Profile' }}
      />
      <Stack.Screen
        name="Setting"
        component={Map}
        options={{ headerTitle: 'Setting' }}
      />
    </Stack.Navigator>
  );
};
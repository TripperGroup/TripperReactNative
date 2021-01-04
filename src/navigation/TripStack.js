import React, { useState } from 'react';
import { TouchableOpacity, Dimensions } from 'react-native';
import { Appbar, Avatar, Text, Button } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { STATUSBAR_HEIGHT } from '../constant/Dimansions';
import { useTheme, Portal, FAB } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../constant/theme';

import Trips from '../screens/Trips';
import Map from '../screens/Map';
import TripDetail from '../screens/TripDetails';
import TripAdd from '../screens/TripAdd';
import TripAddTrack from '../screens/TripAddTrack';
import OthersProfile from '../screens/OthersProfile';

import SearchHeader from 'react-native-search-header';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';

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
            icon="map-search-outline"
            onPress={() => {
              navigation.navigate('Map');
            }}
            style={{ opacity: 0.7 }}
          />
        )}
        <Appbar.Content
          title={title}
          style={{
            marginRight: 8,
          }}
        />
        {/* <Appbar.Action
          icon="magnify"
          onPress={() => searchHeaderRef.current.show()}
          style={{ opacity: 0.7 }}
        /> */}
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

export default TripStack = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });
  const insets = useSafeAreaInsets();

  const { open } = state;
  return (
    <>
      <Stack.Navigator
        initialRouteName="Trips"
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
          name="TripDetail"
          component={TripDetail}
          options={({ route }) => ({
            title: route.params.name,
            tripId: route.params.tripId,
          })}
        />
        <Stack.Screen
          name="Trips"
          component={Trips}
          options={{ headerTitle: 'Trips' }}
        />
        <Stack.Screen
          name="TripAdd"
          component={TripAdd}
          options={{ headerTitle: 'New travelogue' }}
        />
        <Stack.Screen
          name="TripAddTrack"
          component={TripAddTrack}
          options={{ headerTitle: 'New track' }}
        />
        <Stack.Screen
          name="Map"
          component={Map}
          options={{ headerTitle: 'Map' }}
        />
        <Stack.Screen
          name="OthersProfile"
          component={OthersProfile}
          options={({ route }) => ({
            title: route.params.name,
            id: route.params.id,
          })}
        />
      </Stack.Navigator>
      <Portal>
        <FAB.Group
          visible={isFocused}
          open={open}
          color="#ffff"
          fabStyle={{ backgroundColor: colors.accent }}
          style={{
            position: 'absolute',
            bottom: insets.bottom + 55,
          }}
          icon={open ? 'map-plus' : 'earth-plus'}
          actions={[
            {
              icon: 'pencil-outline',
              label: 'New travelogue',
              onPress: () => navigation.navigate('TripAdd'),
            },
            {
              icon: 'crosshairs-gps',
              label: 'New track',
              onPress: () => navigation.navigate('TripAddTrack'),
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

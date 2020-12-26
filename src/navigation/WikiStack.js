import React, { useState } from 'react';
import { TouchableOpacity, Dimensions } from 'react-native';
import { Appbar, Avatar, Text, Button } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { STATUSBAR_HEIGHT } from '../constant/Dimansions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, Portal, FAB } from 'react-native-paper';
import { colors } from '../constant/theme';

import Wiki from '../screens/Wiki';
import WikiAddArticle from '../screens/WikiAddArticle';

import WikiDetail from '../screens/WikiDetail';
import WikiCategories from '../screens/WikiCategories';
import WikiList from '../screens/WikiList';

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
        {previous ? ( // Work on this later to handle back button
          <Appbar.BackAction onPress={navigation.goBack} />
        ) : (
          <Appbar.Action
            icon="shape"
            onPress={() => {
              navigation.navigate('WikiCategories');
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

export default WikiStack = () => {
  const navigation = useNavigation();

  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });
  const insets = useSafeAreaInsets();

  const { open } = state;

  return (
    <>
      <Stack.Navigator
        initialRouteName="Wiki"
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
          name="Wiki"
          component={Wiki}
          options={{ headerTitle: 'Wiki' }}
        />
        <Stack.Screen
          name="WikiAddArticle"
          component={WikiAddArticle}
          options={{ headerTitle: 'Add Article' }}
        />
        <Stack.Screen
          name="WikiCategories"
          component={WikiCategories}
          options={{ headerTitle: 'Article Categories' }}
        />
        <Stack.Screen
          name="WikiList"
          component={WikiList}
          options={({ route }) => ({
            title: route.params.name,
            id: route.params.id,
          })}
        />
        <Stack.Screen
          name="WikiDetail"
          component={WikiDetail}
          options={({ route }) => ({
            title: route.params.name,
            id: route.params.id,
          })}
        />
      </Stack.Navigator>
      <Portal>
        <FAB.Group
          open={open}
          color="#ffff"
          fabStyle={{ backgroundColor: colors.accent }}
          style={{
            position: 'absolute',
            bottom: insets.bottom + 55,
          }}
          icon={open ? 'map-plus' : 'plus'}
          actions={[
            {
              icon: 'file-outline',
              label: 'Write Article',
              onPress: () => navigation.navigate('WikiAddArticle'),
            },
            // {
            //   icon: 'crosshairs-gps',
            //   label: 'New GPS recording',
            //   onPress: () => console.log('New GPS recording'),
            // },
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

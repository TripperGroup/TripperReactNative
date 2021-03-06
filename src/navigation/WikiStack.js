import React, { useState } from 'react';
import { TouchableOpacity, Dimensions, Linking } from 'react-native';
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
import { useIsFocused } from '@react-navigation/native';

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
  const openWikiAdmin = () => {
    Linking.canOpenURL('https://tripperwiki.netlify.app/#/').then(
      (supported) => {
        if (supported) {
          Linking.openURL('https://tripperwiki.netlify.app/#/');
        } else {
          console.log(
            "Don't know how to open URI: " + this.props.url,
          );
        }
      },
    );
  };

  const navigation = useNavigation();
  const isFocused = useIsFocused();

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
            postId: route.params.postId,
          })}
        />
        <Stack.Screen
          name="WikiDetail"
          component={WikiDetail}
          options={({ route }) => ({
            title: route.params.name,
            postId: route.params.postId,
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
          icon={open ? 'map-plus' : 'fountain-pen-tip'}
          actions={[
            {
              icon: 'file-outline',
              label: 'Write travelouge',
              onPress: () => navigation.navigate('WikiAddArticle'),
            },
            {
              icon: 'shield-account',
              label: 'Wiki Admin (Approved authors)',
              onPress: () => openWikiAdmin(),
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

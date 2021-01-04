import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { List, Switch, Text, useTheme } from 'react-native-paper';
import { ThemeContext, AuthContext, StateContext } from '../../App';
import AsyncStorage from '@react-native-community/async-storage';
import { colors } from '../constant/theme';
import apiUrl from '../constant/api';
import axios from 'axios';

export default function ProfileSetting({ navigation }, props) {
  const paperTheme = useTheme();
  const [isDarkTheme, setIsDarkTheme] = useContext(ThemeContext);
  const { signOut } = useContext(AuthContext);
  const [inTravel, setInTravel] = useState(true);

  const { userId, userToken } = useContext(StateContext);

  const changeAndSaveThemeState = async () => {
    await AsyncStorage.setItem(
      'isDarkTheme',
      JSON.stringify(!isDarkTheme),
    );
    await setIsDarkTheme(!isDarkTheme);
  };

  const fetchTripStatus = async () => {
    await axios
      .get(apiUrl + '/users/' + userId + '/', {
        headers: { Authorization: `Token ${userToken}` },
      })
      .then(function (response) {
        setInTravel(response.data.trip_status);
      })
      .catch(function (error) {
        console.log(error.response);
      });
  };

  const changeTravelStatus = async () => {
    await axios
      .patch(
        apiUrl + '/users/' + userId + '/',
        {
          trip_status: !inTravel,
        },
        {
          headers: { authorization: `Token ${userToken}` },
        },
      )
      .then(() => {
        setInTravel(!inTravel);
      });
  };

  useEffect(() => {
    fetchTripStatus();
    return () => {};
  }, []);

  return (
    <ScrollView>
      <List.Section style={styles.container}>
        <List.Subheader style={styles.sectionHeader}>
          Account
        </List.Subheader>
        {/* <List.Item
          style={styles.item}
          title="Travel Status"
          description="Toggle travel status"
          left={() => (
            <List.Icon style={styles.icon} icon="wallet-travel" />
          )}
          right={() => (
            <Switch
              color={isDarkTheme ? colors.accent : null}
              style={styles.rightContent}
            />
          )}
        /> */}
        {/* <List.Item
          style={styles.item}
          title="Edit Profile"
          left={() => (
            <List.Icon style={styles.icon} icon="account-edit" />
          )}
        /> */}
        <List.Item
          style={styles.item}
          title="Change Trip Status"
          description={
            inTravel ? 'You are traveling' : 'You are not traveling'
          }
          left={() => (
            <List.Icon style={styles.icon} icon="wallet-travel" />
          )}
          right={() => (
            <Switch
              color={isDarkTheme ? colors.accent : null}
              value={inTravel}
              style={styles.rightContent}
              onValueChange={() => changeTravelStatus()}
            />
          )}
        />
        <List.Item
          style={styles.item}
          title="Edit profile"
          onPress={() => navigation.navigate('ProfileEdit')}
          left={() => (
            <List.Icon style={styles.icon} icon="account-edit" />
          )}
        />
        <List.Item
          style={styles.item}
          title="Log out"
          onPress={() => signOut()}
          left={() => <List.Icon style={styles.icon} icon="logout" />}
        />

        {/* ----- */}
        <List.Subheader style={styles.sectionHeader}>
          Appearance
        </List.Subheader>
        <List.Item
          style={styles.item}
          title="Dark mode"
          left={() => (
            <List.Icon style={styles.icon} icon="weather-night" />
          )}
          right={() => (
            <Switch
              color={isDarkTheme ? colors.accent : null}
              value={paperTheme.dark}
              style={styles.rightContent}
              onValueChange={() => changeAndSaveThemeState()}
            />
          )}
        />
        {/* <List.Item
          style={styles.item}
          title="Language"
          left={() => <List.Icon style={styles.icon} icon="web" />}
          right={() => <Text style={styles.rightContent2}> En </Text>}
        /> */}
        {/* ----- */}
        {/* <List.Subheader style={styles.sectionHeader}>
          Danger zone
        </List.Subheader>
        <List.Item
          style={styles.item}
          title="Delete my account"
          left={() => (
            <List.Icon
              color="red"
              style={styles.icon}
              icon="delete"
            />
          )}
        /> */}
      </List.Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionHeader: {
    fontSize: 23,
    fontWeight: '400',
    //color: colors.accent,
    marginTop: 10,
    backgroundColor: '#0001',
  },
  item: {
    fontSize: 18,
    height: 60,
  },
  icon: {
    opacity: 0.5,
  },
  rightContent: {
    marginRight: 20,
    marginVertical: 10,
  },
  rightContent2: {
    marginRight: 30,
    marginVertical: 20,
    fontSize: 15,
    opacity: 0.6,
  },
});

import React, { useContext, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Button,
} from 'react-native';
import { Avatar, Text, Badge } from 'react-native-paper';
import { AuthContext, StateContext } from '../../App';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { colors } from '../constant/theme';
import OthersUserTrips from '../components/OthersUserTrips';
import apiUrl from '../constant/api';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

import manAvatar from '../../assets/man-avatar.jpg';
import womanAvatar from '../../assets/woman-avatar.jpg';

const Tab = createMaterialTopTabNavigator();

const UserAvatar = (props) => {
  return (
    <Avatar.Image
      size={100}
      source={
        props.avatar
          ? {
              uri: props.avatar,
            }
          : props.gender === 'WM'
          ? womanAvatar
          : manAvatar
      }
      style={styles.avatar}
    />
  );
};

export default function Profile() {
  const route = useRoute();
  const userId = route.params.id;

  const { guestToSignUp } = useContext(AuthContext);
  const { userToken } = useContext(StateContext);
  const [tripCount, setTripCount] = useState(0);

  const [user, setUser] = useState('');

  async function fetchUser() {
    await axios
      .get(apiUrl + '/users/' + userId + '/', {
        headers: { Authorization: `Token ${userToken}` },
      })
      .then(function (response) {
        setUser(response.data);
      })
      .catch(function (error) {
        console.log(error.response);
      });
  }

  async function fetchTripCount() {
    await axios
      .get(
        apiUrl + '/tripSummery/',
        { params: { user: userId } },
        {
          headers: userToken
            ? { Authorization: `Token ${userToken}` }
            : null,
        },
      )
      .then(function (response) {
        setTripCount(response.data.count);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchUser();
    fetchTripCount();
  }, [user]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <UserAvatar avatar={user.avatar} gender={user.gender} />
        <Text style={styles.username}>{user.username}</Text>
        <View style={styles.data}>
          <Text>
            <Text style={{ fontWeight: 'bold', marginRight: 3 }}>
              {tripCount}
            </Text>
            <Text> </Text>
            Trips
          </Text>
          {user.trip_status ? (
            <>
              <Text> · </Text>
              <Badge
                style={{
                  backgroundColor: colors.accent,
                  color: 'white',
                }}
              >
                ON TRIP
              </Badge>
            </>
          ) : null}

          {/* following and followers */}
          {/* <Text> · </Text>
            <TouchableOpacity style={styles.statusdata}>
              <Text>
                <Text style={{ fontWeight: 'bold', marginRight: 3 }}>
                  20
                </Text>
                <Text> </Text>
                Followers
              </Text>
            </TouchableOpacity>

            <Text> · </Text>

            <TouchableOpacity style={styles.statusdata}>
              <Text>
                <Text style={{ fontWeight: 'bold' }}>2</Text>
                <Text> </Text>
                <Text>Following</Text>
              </Text>
            </TouchableOpacity> */}
        </View>
        <Text style={{ alignSelf: 'center' }}>{user.about}</Text>
      </View>
      <Tab.Navigator
        backBehavior="history"
        lazy={true}
        lazyPlaceholder={() => <Text>loading</Text>}
        tabBarOptions={{
          indicatorStyle: { backgroundColor: colors.accent },
          showIcon: true,
        }}
      >
        <Tab.Screen
          name="Trips"
          children={() => <OthersUserTrips userId={userId} />}
        />
      </Tab.Navigator>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    flex: 1,
    resizeMode: 'center',
    justifyContent: 'center',
    //backgroundColor: '#fff',
  },
  text: {
    //color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    //backgroundColor: '#000000a0',
  },
  avatar: {
    alignSelf: 'center',
    marginTop: 20,
  },
  data: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 7,
    marginBottom: 17,
  },

  username: {
    fontSize: 20,
    fontWeight: '300',
    //backgroundColor: '#ffffff80',
    marginVertical: 10,
    alignSelf: 'center',
  },
});

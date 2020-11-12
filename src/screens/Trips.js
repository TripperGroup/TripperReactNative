import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  RefreshControl,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import TripCard from '../components/TripCard';
import TripCarousel from '../components/TripCarousel';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { colors } from '../constant/theme';

const Trips = () => {
  const [trips, setTrips] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  async function fetchTrips() {
    let token = await AsyncStorage.getItem('token');

    const configGetTrip = {
      method: 'get',
      url: 'http://127.0.0.1:8001/api/tripSummery/',

      headers: token ? { Authorization: `Token ${token}` } : null,
    };

    axios(configGetTrip)
      .then(function (response) {
        setTrips(response.data.results);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchTrips();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    fetchTrips();
    setRefreshing(false);
  }, [refreshing]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          progressBackgroundColor={colors.accent}
          tintColor={colors.accent}
        />
      }
    >
      {trips.map((trip) => (
        <TripCard
          key={trip.id}
          subject={trip.subject}
          description={trip.description}
          auther={trip.auther.username}
          days={trip.trip_days}
          gender={trip.auther.gender}
          avatar={trip.auther.avatar}
        />
      ))}
    </ScrollView>
  );
};

export default Trips;

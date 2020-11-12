import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import TripCard from '../components/TripCard';
import TripCarousel from '../components/TripCarousel';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

const Trips = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
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
    fetchTrips();
  }, []);

  return (
    <>
      <ScrollView>
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
    </>
  );
};

export default Trips;

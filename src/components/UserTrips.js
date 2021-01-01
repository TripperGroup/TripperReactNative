import React, { useState, useEffect, useContext } from 'react';
import { View } from 'react-native';
import axios from 'axios';
import { StateContext } from '../../App';

import { Text } from 'react-native-paper';
import TripCard from '../components/TripCard';

export default function UserTrips() {
  const [trips, setTrips] = useState([]);
  const { userId, userToken } = useContext(StateContext);

  async function fetchTrips() {
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
        setTrips(response.data.results);
        console.log(trips);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  useEffect(() => {
    fetchTrips();
    return () => {
      null;
    };
  }, []);

  return (
    <View>
      {trips.map((trip) => (
        <TripCard
          data={trip}
          key={trip.id}
          subject={trip.subject}
          description={trip.description}
          auther={trip.auther.username}
          days={trip.trip_days}
          gender={trip.auther.gender}
          avatar={trip.auther.avatar}
          picture={trip.image}
          category={trip.category}
        />
      ))}
    </View>
  );
}

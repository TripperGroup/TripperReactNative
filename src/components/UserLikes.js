import React, { useState, useEffect, useContext } from 'react';
import { View } from 'react-native';
import axios from 'axios';
import { StateContext } from '../../App';

import { Text } from 'react-native-paper';
import TripCard from '../components/TripCard';

export default function UserLikes() {
  const [trips, setTrips] = useState([]);

  let likesId = [];
  let likedTrips = [];

  const { userId, userToken } = useContext(StateContext);

  // neer refactor
  async function fetchLikes() {
    await axios
      .get(
        apiUrl + '/likes/',
        {
          params: { user: userId },
        },
        {
          headers: userToken
            ? { Authorization: `Token ${userToken}` }
            : null,
        },
      )
      .then(function (response) {
        likesId = response.data.results;
      })
      .catch(function (error) {
        console.log(error);
      });

    for (const i in likesId) {
      const trips = await fetchTrip(likesId[i].trip_id);
    }
    setTrips(likedTrips);
  }

  async function fetchTrip(id) {
    var tempData;
    await axios
      .get(apiUrl + '/tripSummery/' + id, {
        headers: userToken
          ? { Authorization: `Token ${userToken}` }
          : null,
      })
      .then(function (response) {
        tempData = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    likedTrips.push(tempData);
  }

  useEffect(() => {
    fetchLikes();
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

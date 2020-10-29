import * as React from 'react';
import { StyleSheet, Text, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import TripCard from '../components/TripCard';
import TripCarousel from '../components/TripCarousel';

const Trips = ({ navigation }) => {
  return (
    <>
      <ScrollView>
        <TripCard />
        <TripCard />

        <TripCard />

        <TripCard />
      </ScrollView>
    </>
  );
};

export default Trips;

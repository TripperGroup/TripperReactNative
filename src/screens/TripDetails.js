import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
} from 'react';

import { View, ScrollView } from 'react-native';

import {
  Avatar,
  Card,
  Title,
  Paragraph,
  Button,
  Text,
} from 'react-native-paper';
import { MaterialIcon, ActivitieIcon } from '../components/Icon';
import { TouchableOpacity } from 'react-native-gesture-handler';

import manAvatar from '../../assets/man-avatar.jpg';
import womanAvatar from '../../assets/woman-avatar.jpg';

import { tripCategories } from '../constant/dataMap';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import LoadingAnimation from '../components/LoadingAnimation';
import MapCard from '../components/MapCard';

export default function TripDetails() {
  const navigation = useNavigation();
  const route = useRoute();

  const [fetching, setFetching] = useState(true);
  const [trip, setTrip] = useState([]);
  const [point, setPoint] = useState([]);

  const tripId = route.params.tripId;

  async function fetchTrip() {
    await axios
      .get(apiUrl + '/trip/' + tripId, {})
      .then(function (response) {
        setTrip(response.data);
        setFetching(false);
      })
      .catch(function (error) {
        console.log(error);
        setFetching(false);
      });
  }

  useEffect(() => {
    fetchTrip();
  }, [trip]);

  return fetching ? (
    <LoadingAnimation />
  ) : (
    <ScrollView>
      <Card
        style={{
          marginBottom: 15,
          borderRadius: 0,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.02,
          shadowRadius: 1,

          elevation: 1,
        }}
      >
        <Card.Title
          title={
            trip.subject +
            (trip.days != null
              ? ' • ' +
                (trip.days > 1
                  ? trip.days + ' days'
                  : trip.days == 0
                  ? 'Less than a day'
                  : 'a day')
              : '') +
            ' • ' +
            tripCategories[trip.category]
          }
          subtitle={
            'By ' +
            trip.auther.username +
            ' •  at ' +
            new Date(trip.created_at).toLocaleDateString()
          }
          style={{ marginVertical: 10 }}
          left={() => (
            <Avatar.Image
              size={40}
              source={
                trip.auther.avatar
                  ? {
                      uri: trip.auther.avatar,
                    }
                  : trip.auther.gender === 'WM'
                  ? womanAvatar
                  : manAvatar
              }
            />
          )}
        />
        <Card.Cover
          source={
            trip.image != null
              ? { uri: trip.image }
              : require('../../assets/placeholder.jpg')
          }
        />

        <Card.Content style={{ padding: 10 }}>
          <Title>Trip activities</Title>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginBottom: 5,
              opacity: 0.7,
            }}
          >
            {trip.activities.map((index) => (
              <ActivitieIcon
                key={index}
                name={index.toString()}
                size={30}
              />
            ))}
          </View>
          {trip.description != null ? (
            <>
              <Title>Trip description</Title>
              <Paragraph>{trip.description}</Paragraph>
            </>
          ) : null}

          {/* <Card.Actions
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          ></Card.Actions> */}
        </Card.Content>
        {trip.geo_json != null ? (
          <>
            <Title style={{ padding: 12 }}>Trip track</Title>

            <View style={{ height: 200 }}>
              <MapCard data={trip} />
            </View>
          </>
        ) : null}
      </Card>
    </ScrollView>
  );
}

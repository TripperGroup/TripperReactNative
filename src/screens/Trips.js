import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
} from 'react';
import { StyleSheet, View, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  ActivityIndicator,
  Button,
  Subheading,
  Text,
} from 'react-native-paper';
import TripCard from '../components/TripCard';
import TripCarousel from '../components/TripCarousel';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { colors } from '../constant/theme';
import { set } from 'react-native-reanimated';
import DoneAnimation from '../components/DoneAnimation';

const isCloseToBottom = ({
  layoutMeasurement,
  contentOffset,
  contentSize,
}) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

const Trips = () => {
  const [trips, setTrips] = useState([]);
  const [pageOffset, setPageOffset] = useState(1);
  const [haveNext, setHaveNext] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [fetching, setFetching] = useState(true);

  async function fetchToken() {
    let token = await AsyncStorage.getItem('token');
    return token;
  }

  async function fetchTrips() {
    setRefreshing(true);
    var token = () => fetchToken();
    const configGetTrip = {
      method: 'get',
      url: 'http://127.0.0.1:8001/api/tripSummery/',

      headers: token ? { Authorization: `Token ${token}` } : null,
    };

    await axios(configGetTrip)
      .then(function (response) {
        setTrips(response.data.results);
        setHaveNext(response.data.next ? true : false);
        setRefreshing(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function fetchMoreTrips() {
    var token = () => fetchToken();

    const configGetTrip = {
      method: 'get',
      url:
        'http://127.0.0.1:8001/api/tripSummery/?page=' + pageOffset,

      headers: token ? { Authorization: `Token ${token}` } : null,
    };

    axios(configGetTrip)
      .then(function (response) {
        setFetching(true);

        setTrips([...trips, ...response.data.results]);
        setPageOffset(pageOffset + 1);
        setHaveNext(response.data.next ? true : false);
      })
      .catch(function (error) {
        console.log(error);
      });

    setFetching(false);
  }

  useEffect(() => {
    fetchTrips();
    fetchMoreTrips();
  }, []);

  const onRefresh = useCallback(async () => {
    fetchTrips();
  }, [refreshing]);

  return (
    <ScrollView
      onScroll={({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent)) {
          if (haveNext) {
            fetchMoreTrips();
          }
        }
      }}
      scrollEventThrottle={400}
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
      {fetching && haveNext ? (
        <ActivityIndicator
          animating={true}
          color={colors.accent}
          style={{ margin: 20 }}
        />
      ) : (
        <>
          {!fetching ? null : (
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 40,
                marginBottom: 8,
              }}
            >
              🙌🏼
            </Text>
          )}
          {/* {fetching ? <DoneAnimation autoPlay /> : null} */}
          {!fetching ? null : (
            <Subheading
              style={{ color: colors.accent, alignSelf: 'center' }}
            >
              You have reached the end!
            </Subheading>
          )}
          {!fetching ? null : (
            <Button
              style={{ marginBottom: 8 }}
              dark
              color={colors.accent}
            >
              Why not write your own story?
            </Button>
          )}
        </>
      )}

      {/* <Button
        dark
        color={colors.accent}
        mode="text"
        onPress={() => fetchMoreTrips()}
      >
        More
      </Button> */}
    </ScrollView>
  );
};

export default Trips;

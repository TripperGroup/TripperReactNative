import React, { useState, useContext, useEffect } from 'react';
import { View } from 'react-native';
import {
  Avatar,
  Card,
  Title,
  Paragraph,
  Button,
  Text,
} from 'react-native-paper';
import { MaterialIcon, ActivitieIcon } from '../components/Icon';
import LottieView from 'lottie-react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import manAvatar from '../../assets/man-avatar.jpg';
import womanAvatar from '../../assets/woman-avatar.jpg';
import apiUrl from '../constant/api';

import { tripCategories } from '../constant/dataMap';

import { StateContext } from '../../App';

const cardSubTitle =
  'Mohammad' + ' · ' + 'Adventure ' + ' · ' + '10 Days';
// for test, All data pass by prob in one backend integration

const LeftContent = (avatar, gender) => (
  <Avatar.Image
    size={40}
    source={
      avatar
        ? {
            uri: avatar,
          }
        : gender === 'WM'
        ? womanAvatar
        : manAvatar
    }
  />
);

const RighContent = (props) => {
  const { userId, userToken } = useContext(StateContext);

  const [like, setLike] = useState(false);

  const [likeId, setLikeId] = useState(0);

  const toggleLike = () => {
    setLike(!like);
    // like ? null : animation.current.play();
  };
  const likeFetchParams = {
    user: userId,
    trip: props.trip,
  };

  function fetchLike() {
    axios
      .get(apiUrl + '/likes/', {
        params: likeFetchParams,
      })
      .then(function (response) {
        setLike(response.data.count == 0 ? false : true);
        if (response.data.count != 0) {
          setLikeId(response.data.results[0].id);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function postLike() {
    axios
      .post(
        apiUrl + '/likes/',
        {
          user_id: userId,
          trip_id: props.trip,
        },
        {
          headers: { Authorization: `Token ${userToken}` },
        },
      )
      .then(function (response) {
        console.log('liked');
      })
      .catch(function (error) {
        setLike(false);
      });
  }

  function deleteLike(likeId) {
    axios
      .delete(apiUrl + '/likes/' + likeId + '/', {
        headers: { Authorization: `Token ${userToken}` },
      })
      .then(function (response) {
        console.log('unliked');
      })
      .catch(function (error) {
        setLike(true);
        console.log(error);
      });
  }

  function likeAndUnlike() {
    if (like) {
      setLike(false);
      deleteLike(likeId);
    } else {
      toggleLike();
      postLike();
    }
  }

  useEffect(() => {
    fetchLike();
  }, [like, likeId]);

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        //opacity: 0.5,
        marginRight: 8,
      }}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => likeAndUnlike()}
      >
        <MaterialIcon
          style={{
            opacity: 0.5,
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          size={25}
          name={like ? 'heart' : 'heart-outline'}
        />
      </TouchableOpacity>
      <MaterialIcon
        style={{ marginLeft: 5, opacity: 0.5 }}
        size={25}
        name="dots-vertical"
      />
    </View>
  );
};

const TripCard = (props) => {
  const navigation = useNavigation();

  return (
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
        title={props.subject}
        subtitle={
          props.auther +
          (props.days != null
            ? ' • ' +
              (props.days > 1
                ? props.days + ' days'
                : props.days == 0
                ? 'Less than a day'
                : 'a day')
            : '') +
          ' • ' +
          tripCategories[props.category]
        }
        left={() => LeftContent(props.avatar, props.gender)}
        right={() => <RighContent trip={props.data.id} />}
      />
      <Card.Cover
        source={
          props.picture != null
            ? { uri: props.picture }
            : require('../../assets/placeholder.jpg')
        }
      />

      <Card.Content style={{ padding: 10 }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginBottom: 5,
            opacity: 0.7,
          }}
        >
          {props.data.activities.map((index) => (
            <ActivitieIcon
              key={index}
              name={index.toString()}
              size={30}
            />
          ))}
        </View>

        <Paragraph>
          {props.description.substring(0, 100)}...
        </Paragraph>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('TripDetail', {
              name: props.subject,
              tripId: props.data.id,
            })
          }
        >
          <Text style={{ marginTop: 6, fontWeight: 'bold' }}>
            More details ...
          </Text>
        </TouchableOpacity>
        <Card.Actions
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        ></Card.Actions>
      </Card.Content>
    </Card>
  );
};

export default TripCard;

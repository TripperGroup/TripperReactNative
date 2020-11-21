import React, { useState, useRef } from 'react';
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

import manAvatar from '../../assets/man-avatar.jpg';
import womanAvatar from '../../assets/woman-avatar.jpg';

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

const RighContent = () => {
  const [like, setLike] = useState(0);

  const animation = useRef();

  const toggleLike = () => {
    setLike(!like);
    // like ? null : animation.current.play();
  };

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
        onPress={() => toggleLike()}
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
            : '')
        }
        left={() => LeftContent(props.avatar, props.gender)}
        right={RighContent}
      />
      <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />

      <Card.Content style={{ padding: 10 }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginBottom: 5,
            opacity: 0.7,
          }}
        >
          <ActivitieIcon name="1" size={30} />
          <ActivitieIcon name="20" size={30} />
          <ActivitieIcon name="3" size={30} />
          <ActivitieIcon name="38" size={30} />
          <ActivitieIcon name="31" size={30} />
          <ActivitieIcon name="108" size={30} />
        </View>

        <Paragraph>{props.description}</Paragraph>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('TripDetail', {
              name: props.subject,
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

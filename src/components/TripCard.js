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

cardSubTitle = 'Mohammad' + ' · ' + 'Adventure ' + ' · ' + '10 Days';
// for test, All data pass by prob in one backend integration

const LeftContent = (props) => (
  <Avatar.Image
    size={40}
    source={{
      uri:
        'https://tinyfac.es//data//avatars//E0B4CAB3-F491-4322-BEF2-208B46748D4A-500w.jpeg',
    }}
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

const TripCard = () => {
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
        title="Trip Name"
        subtitle={cardSubTitle}
        left={LeftContent}
        right={RighContent}
      />
      <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('TripDetail', {
            name: 'Custom trip header name',
          })
        }
      >
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
          <Paragraph>
            Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500
          </Paragraph>
          <Text style={{ marginTop: 6, fontWeight: 'bold' }}>
            More details ...
          </Text>
          <Card.Actions
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          ></Card.Actions>
        </Card.Content>
      </TouchableOpacity>
    </Card>
  );
};

export default TripCard;

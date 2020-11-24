import React, { useContext } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Button,
} from 'react-native';
import { Avatar, Text, Badge } from 'react-native-paper';
import { AuthContext, StateContext } from '../../App';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { colors } from '../constant/theme';
import UserLikes from '../components/UserLikes';
import UserTrips from '../components/UserTrips';

const Tab = createMaterialTopTabNavigator();

export default function Profile() {
  const test = () => {
    return <Text></Text>;
  };
  const { signOut, guestToSignUp } = useContext(AuthContext);
  const { isGuest } = useContext(StateContext);
  if (!isGuest) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Avatar.Image
            size={120}
            source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
            style={styles.avatar}
          />
          <Text style={styles.username}> Mohammad Maso </Text>
          <View style={styles.data}>
            <Text>
              <Text style={{ fontWeight: 'bold', marginRight: 3 }}>
                12
              </Text>
              <Text> </Text>
              Trips
            </Text>
            <Text> · </Text>
            <Badge
              style={{
                backgroundColor: colors.accent,
                color: 'white',
              }}
            >
              ON TRIP
            </Badge>
            {/* following and followers */}
            {/* <Text> · </Text>
            <TouchableOpacity style={styles.statusdata}>
              <Text>
                <Text style={{ fontWeight: 'bold', marginRight: 3 }}>
                  20
                </Text>
                <Text> </Text>
                Followers
              </Text>
            </TouchableOpacity>

            <Text> · </Text>

            <TouchableOpacity style={styles.statusdata}>
              <Text>
                <Text style={{ fontWeight: 'bold' }}>2</Text>
                <Text> </Text>
                <Text>Following</Text>
              </Text>
            </TouchableOpacity> */}
          </View>
        </View>
        <Tab.Navigator
          backBehavior="history"
          lazy={true}
          lazyPlaceholder={() => <Text>loading</Text>}
          tabBarOptions={{
            indicatorStyle: { backgroundColor: colors.accent },
            showIcon: true,
          }}
        >
          <Tab.Screen name="Trips" component={UserTrips} />
          <Tab.Screen name="Likes" component={UserLikes} />
        </Tab.Navigator>
      </ScrollView>
    );
  } else {
    return (
      <>
        <Button
          title="Register or login to accsee "
          onPress={() => guestToSignUp()}
        ></Button>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    flex: 1,
    resizeMode: 'center',
    justifyContent: 'center',
    //backgroundColor: '#fff',
  },
  text: {
    //color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    //backgroundColor: '#000000a0',
  },
  avatar: {
    alignSelf: 'center',
    marginTop: 20,
  },
  data: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 7,
    marginBottom: 17,
  },

  username: {
    fontSize: 20,
    fontWeight: '300',
    //backgroundColor: '#ffffff80',
    marginVertical: 10,
    alignSelf: 'center',
  },
});

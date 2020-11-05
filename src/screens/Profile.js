import React, { useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
} from 'react-native';
import { Avatar, Badge } from 'react-native-paper';
import { AuthContext, StateContext } from '../../App';

export default function Profile() {
  const { signOut, guestToSignUp } = useContext(AuthContext);
  const { isGuest } = useContext(StateContext);
  if (!isGuest) {
    return <Text>s</Text>;
  } else {
    return (
      <View>
        <Button
          title="Register or login to accsee "
          onPress={() => guestToSignUp()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});

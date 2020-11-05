import React, { useContext } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Appbar } from 'react-native-paper';
import { AuthContext, StateContext } from '../../App';

export default function Profile() {
  const { signOut, guestToSignUp } = useContext(AuthContext);
  const { isGuest } = useContext(StateContext);
  if (!isGuest) {
    return (
      <View>
        <Button title="Sign Out" onPress={signOut} />
      </View>
    );
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

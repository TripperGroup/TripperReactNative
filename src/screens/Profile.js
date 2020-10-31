import React, { useContext } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Appbar } from 'react-native-paper';
import { AuthContext } from '../../App';

export default function Profile() {
  const { signOut } = useContext(AuthContext);

  return (
    <View>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({});

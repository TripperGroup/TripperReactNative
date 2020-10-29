import React, { useContext } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Appbar } from 'react-native-paper';
import { AuthContext } from '../../App';

export default function Profile() {
  const { signOut } = useContext(AuthContext);

  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction />
        <Appbar.Content title="Title" subtitle="Subtitle" />
        <Appbar.Action icon="magnify" />
        <Appbar.Action icon="dots-vertical" />
      </Appbar.Header>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({});

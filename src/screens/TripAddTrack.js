import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert, View, Linking } from 'react-native';
import {
  ActivityIndicator,
  Text,
  Title,
  Button,
} from 'react-native-paper';

import { WebView } from 'react-native-webview';

import LoadingAnimation from '../components/LoadingAnimation';
import RNFetchBlob from 'rn-fetch-blob';
import { colors } from '../constant/theme';

export default function TripAddTrack() {
  const openMap = (input) => {
    setTimeout(() => {
      Linking.canOpenURL(
        'https://umap.openstreetmap.fr/en/map/new/',
      ).then((supported) => {
        if (supported) {
          Linking.openURL(
            'https://umap.openstreetmap.fr/en/map/new/',
          );
        } else {
          console.log(
            "Don't know how to open URI: " + this.props.url,
          );
        }
      });
    }, 1000);

    // let dir = RNFetchBlob.fs.dirs.DocumentDir;
    // RNFetchBlob.config({
    //   path: dir + '/jsonMap.json',
    //   // add this option that makes response data to be stored as a file,
    //   // this is much more performant.
    // })
    //   .fetch(
    //     'GET',
    //     'blob:https://umap.openstreetmap.fr/dc366a16-0f97-495f-84d9-65452a7b41aa',
    //     {
    //       //some headers ..
    //     },
    //   )
    //   .then((res) => {
    //     Alert.alert('Track downloaded.');
    //   });
  };

  useEffect(() => {
    openMap();
    return () => {
      null;
    };
  }, []);

  return (
    <View style={{ alignSelf: 'center', marginTop: 100 }}>
      <Title>Redirecting to map creator</Title>
      <ActivityIndicator animating color={colors.accent} />
      <Button
        style={{ margin: 20 }}
        color={colors.accent}
        dark
        mode="contained"
        onPress={openMap()}
      >
        Open Manually
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({});

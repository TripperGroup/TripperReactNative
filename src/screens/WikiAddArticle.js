import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import { WebView } from 'react-native-webview';
import LoadingAnimation from '../components/LoadingAnimation';

export default function WikiAddArticle() {
  useEffect(() => {
    Alert.alert(
      'Your article needs to be approved by Tripper authors. You can also submit articles by other authors with their permission. The submitted article must include the appropriate image.',
    );
    return () => {};
  }, []);
  return (
    <WebView
      originWhitelist={['*']}
      source={{
        uri: 'https://trippergroup.ir/50-2/',
      }}
      startInLoadingState={true}
      renderLoading={() => <LoadingAnimation />}
    />
  );
}

const styles = StyleSheet.create({});

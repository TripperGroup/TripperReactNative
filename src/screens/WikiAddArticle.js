import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import { WebView } from 'react-native-webview';
import LoadingAnimation from '../components/LoadingAnimation';

export default function WikiAddArticle() {
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

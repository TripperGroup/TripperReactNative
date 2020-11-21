import React from 'react';
import { View, ImageBackground } from 'react-native';
import IntroLogo from '../components/IntroLogo';
import SplashBackground from '../../assets/splashImage.jpg';

export default function SplashScreen() {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
      }}
    >
      <ImageBackground
        source={SplashBackground}
        style={{
          flex: 1,
          resizeMode: 'cover',
          justifyContent: 'center',
        }}
        imageStyle={{ opacity: 1 }}
      >
        <IntroLogo />
        <ActivityIndicator color="white" style={{ marginTop: 15 }} />
      </ImageBackground>
    </View>
  );
}

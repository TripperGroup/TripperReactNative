import React from 'react';
import {
  View,
  Text,
  Animated,
  Easing,
  SafeAreaView,
} from 'react-native';
import LottieView from 'lottie-react-native';

const Splash = () => {
  return (
    <>
      <LottieView
        source={require('../../assets/LogoIntro.json')}
        autoPlay
        loop={false}
        style={{
          shadowOpacity: 0.1,
          shadowRadius: 30,
        }}
        speed={1.5}
      />
    </>
  );
};

export default Splash;

import React from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import LottieView from 'lottie-react-native';

const Test = () => {
  return (
    <>
      <LottieView
        source={require('../../assets/logo.json')}
        autoPlay
        loop={false}
      />
    </>
  );
};

export default Test;

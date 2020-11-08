import React from 'react';

import LottieView from 'lottie-react-native';

const IntroAnimation = () => {
  return (
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
  );
};

export default IntroAnimation;

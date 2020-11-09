import React from 'react';

import LottieView from 'lottie-react-native';

const LoadingAnimation = () => {
  return (
    <LottieView
      source={require('../../assets/loadingWorld.json')}
      autoPlay
      // colorFilters={[
      //   {
      //     keypath: "HomeAll.*",
      //     color: theme.secBg,
      //   }
      // ]}
    />
  );
};

export default LoadingAnimation;

import React from 'react';

import LottieView from 'lottie-react-native';

const ShopLoadingAnimation = () => {
  return (
    <LottieView
      source={require('../../assets/shopLoadingAnimation.json')}
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

export default ShopLoadingAnimation;

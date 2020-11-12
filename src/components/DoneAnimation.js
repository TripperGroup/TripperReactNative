import React from 'react';

import LottieView from 'lottie-react-native';

const DoneAnimation = (props) => {
  return (
    <LottieView
      source={require('../../assets/done-animation.json')}
      loop={false}
      style={{ width: 170, alignSelf: 'center' }}
      speed={0.6}
      {...props}
      // colorFilters={[
      //   {
      //     keypath: "HomeAll.*",
      //     color: theme.secBg,
      //   }
      // ]}
    />
  );
};

export default DoneAnimation;

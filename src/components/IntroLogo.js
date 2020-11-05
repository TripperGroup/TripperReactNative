import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo = (props) => (
  <Image
    source={require('../../assets/logo.png')}
    style={styles.image}
  />
);

const styles = StyleSheet.create({
  image: {
    width: 128,
    height: 128,
    marginBottom: 0,
    alignSelf: 'center',
    // borderColor: 'white',
    // borderWidth: 1,
    // borderRadius: 75,
  },
});

export default Logo;

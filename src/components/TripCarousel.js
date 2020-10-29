import React, { useState } from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  ImageBackground,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const carouselData = [
  {
    title: 'Alimestan jungle',
    description:
      'Connect with friends and the world around you on Facebook.',
    image: 'https://picsum.photos/700',
  },
  {
    title: 'Kara jungle',
    description:
      'With WhatsApp, you will get fast, simple, secure messaging and calling for free*, available on phones all over the world.',
    image: 'https://picsum.photos/700',
  },
  {
    title: 'Tabriz City',
    description:
      'Bringing you closer to the people and things you love.',
    image: 'https://picsum.photos/700',
  },
];

function _renderItem({ item, index }) {
  return (
    <View
      style={{
        backgroundColor: 'gray',
        borderRadius: 1,
        height: 200,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
      }}
    >
      <ImageBackground
        source={{ uri: item.image }}
        style={styles.image}
      >
        <Text style={{ fontSize: 30 }}>{item.title}</Text>
        <Text>{item.text}</Text>
      </ImageBackground>
    </View>
  );
}

export default function TripCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  return (
    <Animated.View style={{ paddingBottom: 15 }}>
      <Text></Text>
      <View>
        <Carousel
          data={carouselData}
          renderItem={_renderItem}
          onSnapToItem={(index) => setActiveSlide(index)}
          layout={'default'}
          sliderWidth={windowWidth}
          itemWidth={windowWidth}
          renderItem={_renderItem}
        />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  text: {
    color: 'grey',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

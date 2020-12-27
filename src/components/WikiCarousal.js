import React, { useRef, useState, useEffect } from 'react';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import axios from 'axios';

import { wordpressUrl } from '../constant/api';
import { colors } from '../constant/theme';
import { MaterialIcon } from './Icon';

const { width: screenWidth } = Dimensions.get('window');

const WikiCarousal = (props) => {
  const navigation = useNavigation();

  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  const carouselRef = useRef(null);

  const source = axios.CancelToken.source();

  async function fetchArticles() {
    if (props.category != null) {
      setCategory('&categories=' + props.category);
    }
    await axios
      .get(
        wordpressUrl + '/wp/v2/posts?_embed&per_page=10' + category,
        { cancelToken: source.token },
      )
      .then(function (response) {
        setArticles(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchArticles();
    return () => {
      source.cancel('Wiki carousal got unmounted');
    };
  }, [category, articles]);

  const renderItem = ({ item, index }, parallaxProps) => {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{
            uri:
              item._embedded['wp:featuredmedia'][0].media_details
                .sizes.full.source_url,
          }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('WikiDetail', {
              name: item.title.rendered,
              postId: item.id,
            })
          }
        >
          <Text style={styles.title} numberOfLines={1}>
            {item.title.rendered}
          </Text>
          <Text style={styles.description}>
            <MaterialIcon name="shape" />{' '}
            {item._embedded['wp:term'][0][0].name} |{' '}
            <MaterialIcon name="calendar-range" />{' '}
            {item.date.substr(0, 10)}
          </Text>
          <Text style={styles.description}>Read more..</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return loading ? (
    <ActivityIndicator animating={true} color={colors.accent} />
  ) : (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth - 60}
        data={articles}
        renderItem={renderItem}
        hasParallaxImages={true}
      />
    </View>
  );
};

export default WikiCarousal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth - 170,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  title: {
    marginTop: 10,
    fontWeight: '400',
  },
  description: {
    marginTop: 5,
    fontWeight: '200',
  },
});

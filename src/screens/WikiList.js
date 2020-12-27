import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Image,
  Dimensions,
} from 'react-native';
import {
  ActivityIndicator,
  Text,
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
} from 'react-native-paper';

import HTML from 'react-native-render-html';

import { wordpressUrl } from '../constant/api';

import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';

import LoadingAnimation from '../components/LoadingAnimation';
import { colors } from '../constant/theme';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width: screenWidth } = Dimensions.get('window');

export default function WikiList() {
  const navigation = useNavigation();
  const route = useRoute();

  const categoryId = JSON.stringify(route.params.id);

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const source = axios.CancelToken.source();

  async function fetchArticles() {
    await axios
      .get(
        wordpressUrl +
          '/wp/v2/posts?_embed' +
          '&categories=' +
          categoryId,
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
      source.cancel('Wiki list got unmounted');
    };
  }, [articles]);

  return loading ? (
    <LoadingAnimation />
  ) : (
    <FlatList
      data={articles}
      renderItem={({ item }) => {
        return (
          <Card
            style={{
              marginBottom: 15,
              borderRadius: 0,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.02,
              shadowRadius: 1,

              elevation: 1,
            }}
          >
            <Card.Title
              title={item.title.rendered}
              subtitle={
                item._embedded.author[0].name +
                ' | ' +
                item.date.substr(0, 10)
              }
            />
            <Card.Cover
              source={{
                uri:
                  item._embedded['wp:featuredmedia'][0].media_details
                    .sizes.full.source_url,
              }}
            />

            <Card.Content>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('WikiDetail', {
                    name: item.title.rendered,
                    postId: item.id,
                  })
                }
              >
                <HTML source={{ html: item.excerpt.rendered }} />
                <Text style={{ fontWeight: 'bold' }}>More..</Text>
              </TouchableOpacity>
            </Card.Content>
          </Card>
        );
      }}
      keyExtractor={(item, index) => index}
    />
  );
}

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth - 170,
  },
});

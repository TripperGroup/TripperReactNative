import React, { useState, useEffect } from 'react';
import { View, Share, Image, ScrollView } from 'react-native';
import {
  Text,
  ActivityIndicator,
  Button,
  Snackbar,
  Chip,
  Divider,
  Paragraph,
  Avatar,
  Title,
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LoadingAnimation from '../components/LoadingAnimation';
import { wordpressUrl } from '../constant/api';
import axios from 'axios';
import { WebView } from 'react-native-webview';
import HTML from 'react-native-render-html';

import { useRoute } from '@react-navigation/native';
import { colors } from '../constant/theme';

export default function WikiDetail() {
  const route = useRoute();

  const postId = JSON.stringify(route.params.id);
  const [article, setArticle] = useState([]);
  const [comments, setComments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [thankMessage, setThankMessage] = useState(false);

  const onDismissThankMessage = () => setThankMessage(false);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Read ' +
          article.title.rendered +
          'in Trippe:  ' +
          article.link,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          () => setThankMessage(true);
        } else {
          () => setThankMessage(true);
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const source = axios.CancelToken.source();

  async function fetchArticle() {
    await axios
      .get(wordpressUrl + '/wp/v2/posts/' + postId + '?_embed', {
        cancelToken: source.token,
      })
      .then(function (response) {
        setArticle(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  }

  const source2 = axios.CancelToken.source();

  async function fetchComments() {
    await axios
      .get(wordpressUrl + '/wp/v2/comments?post=' + postId, {
        cancelToken: source2.token,
      })
      .then(function (response) {
        setComments(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchArticle();
    fetchComments();

    return () => {
      source.cancel('WikiDetails got unmounted');
      source2.cancel('Comments got unmounted');
    };
  }, [article, comments]);

  return loading ? (
    <LoadingAnimation />
  ) : (
    <ScrollView>
      <Image
        source={{
          uri: Object.values(
            article._embedded['wp:featuredmedia'][0].media_details
              .sizes.medium,
          )[4],
        }}
      />
      <View style={{ flexDirection: 'row' }}>
        <Chip
          style={{
            marginBottom: 10,
            marginTop: 13,
            marginHorizontal: 10,
          }}
          icon="shape"
          onPress={() => console.log('Pressed')}
        >
          {article._embedded['wp:term'][0][0].name}
        </Chip>
        <Chip
          style={{
            marginBottom: 10,
            marginTop: 13,
          }}
          // icon="account"
          avatar={
            <Image
              source={{
                uri: Object.values(
                  article._embedded.author[0].avatar_urls,
                )[0],
              }}
            />
          }
          onPress={() => console.log('Pressed')}
        >
          {article._embedded.author[0].name}
        </Chip>
      </View>
      <View style={{ margin: 10 }}>
        <HTML
          source={{
            html: article.content.rendered,
          }}
        ></HTML>

        <Title>Reviews</Title>

        {comments.map((comment) => (
          <View key={comment.id}>
            <Divider />
            <View style={{ marginTop: 10, marginBottom: 10 }}>
              <Avatar.Image
                size={36}
                source={{
                  uri: Object.values(
                    article._embedded.author[0].avatar_urls,
                  )[1],
                }}
                style={{ marginBottom: 5 }}
              />
              <Text style={{ fontWeight: 'bold' }}>
                {comment.author_name}
              </Text>
              <HTML
                source={{ html: comment.content.rendered }}
              ></HTML>
            </View>
          </View>
        ))}
      </View>
      <Button
        color={colors.accent}
        icon="share-variant"
        mode="outlined"
        onPress={onShare}
      >
        Share
      </Button>

      <Snackbar
        visible={thankMessage}
        onDismiss={onDismissThankMessage}
        duration={2000}
      >
        You made us happy :)
      </Snackbar>
    </ScrollView>
  );
}

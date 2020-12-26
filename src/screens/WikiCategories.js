import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import {
  ActivityIndicator,
  Text,
  List,
  Title,
  Subheading,
  Badge,
  Caption,
} from 'react-native-paper';
import axios from 'axios';
import { wordpressUrl } from '../constant/api';
import { useNavigation } from '@react-navigation/native';

import LoadingAnimation from '../components/LoadingAnimation';
import { colors } from '../constant/theme';

export default function WikiCategories() {
  const navigation = useNavigation();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  let sumOfArticles = 0;
  let sumOfCategories = Object.keys(categories).length;

  for (let key in categories) {
    sumOfArticles += categories[key].count;
  }

  const source = axios.CancelToken.source();

  async function fetchCategories() {
    await axios
      .get(wordpressUrl + '/wp/v2/categories/', {
        cancelToken: source.token,
      })
      .then(function (response) {
        setCategories(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchCategories();
    return () => {
      source.cancel('Wiki list got unmounted');
    };
  }, [categories]);

  return loading ? (
    <ActivityIndicator
      style={{ margin: 30 }}
      animating={true}
      color={colors.accent}
    />
  ) : (
    <>
      <Subheading
        style={{
          marginHorizontal: 25,
          marginTop: 20,
        }}
      >
        Read {sumOfArticles} Article in {sumOfCategories} Categories
      </Subheading>
      <ScrollView style={{ margin: 10 }}>
        {categories.map((category) => (
          <List.Item
            key={category.id}
            title={category.name}
            description={category.description}
            left={(props) => <Caption>{category.count}</Caption>}
            onPress={() =>
              navigation.navigate('WikiList', {
                name: category.name + ' articles',
                id: category.id,
              })
            }
          />
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({});

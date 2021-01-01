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
import { useNavigation } from '@react-navigation/native';

import { colors } from '../constant/theme';
import ShopLoadingAnimation from '../components/ShopLoadingAnimation';
import ShopApi from '../constant/WooCommerce';
import axios from 'axios';

export default function ShopCategory() {
  const navigation = useNavigation();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const source = axios.CancelToken.source();

  const fetchCategories = ShopApi.get('products/categories', {
    cancelToken: source.token,
  })
    .then((data) => {
      setCategories(data);
      setLoading(false);
    })
    .catch((error) => {
      console.log('Categories fetching in main shop: ' + error);
      setLoading(false);
    });

  useEffect(() => {
    () => fetchCategories;
    return () => {
      source.cancel('Shop main got unmounted');
    };
  }, [categories]);
  return loading ? (
    <ShopLoadingAnimation />
  ) : (
    <>
      <Subheading
        style={{
          marginHorizontal: 25,
          marginTop: 20,
        }}
      >
        Buy from specialized products..
      </Subheading>
      <ScrollView style={{ margin: 10 }}>
        {categories.map((category) => (
          <List.Item
            key={category.id}
            title={category.name}
            description={category.description}
            left={(props) => <Caption>{category.count}</Caption>}
            onPress={() =>
              navigation.navigate('ShopList', {
                name: category.name + ' products',
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

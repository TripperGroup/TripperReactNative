//need to refactor shopCard component

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  FlatList,
  TouchableOpacity,
  Share,
  Image,
} from 'react-native';
import {
  ActivityIndicator,
  Text,
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Subheading,
  Chip,
} from 'react-native-paper';
import ShopLoadingAnimation from '../components/ShopLoadingAnimation';
import ShopApi from '../constant/WooCommerce';
import { useNavigation } from '@react-navigation/native';
import HTML from 'react-native-render-html';
import { MaterialIcon } from '../components/Icon';
import { colors } from '../constant/theme';
import axios from 'axios';

import { useRoute } from '@react-navigation/native';

export default function ShopList() {
  const navigation = useNavigation();
  const route = useRoute();

  const productId = JSON.stringify(route.params.id);

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);

  const source = axios.CancelToken.source();

  const fetchProduct = ShopApi.get('products/' + productId, {
    cancelToken: source.token,
  })
    .then((data) => {
      setProduct(data);
      setLoading(false);
    })
    .catch((error) => {
      console.log('Product ' + productId + ' fetching' + error);
      setLoading(false);
    });

  useEffect(() => {
    () => fetchProduct;
    return () => {
      source.cancel('Shop main got unmounted');
    };
  }, [product]);

  return loading ? (
    <ShopLoadingAnimation />
  ) : (
    <ScrollView>
      <Card
        style={{
          marginBottom: 15,
          borderRadius: 5,
          margin: 7,
          shadowColor: '#000',
          shadowOffset: {
            width: 5,
            height: 5,
          },
          shadowOpacity: 0.02,
          shadowRadius: 1,
          elevation: 1,
          // width: '48%',
        }}
      >
        <Card.Title
          title={product.name}
          subtitle={product.categories[0].name}
        />
        <Card.Cover
          source={{
            uri: product.images[0].src,
          }}
          style={{
            aspectRatio: 1,
            resizeMode: 'cover',
            alignSelf: 'center',
          }}
        />

        <Card.Content style={{ marginTop: 8 }}>
          <HTML source={{ html: product.short_description }} />
          <View
            style={{
              flexDirection: 'row',
              marginTop: 8,
            }}
          >
            <Subheading>
              {product.stock_status === 'instock' ? '✔︎ ' : '✗ '}
            </Subheading>
            <Subheading
              style={{
                color:
                  product.stock_status === 'instock'
                    ? colors.accent
                    : 'red',
                fontWeight: 'bold',
              }}
            >
              {product.stock_status}
            </Subheading>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 8,
              marginBottom: 8,
            }}
          >
            {/* <HTML source={{ html: product.price_html }} /> */}
            <Text>$ {product.price}</Text>
          </View>

          <Button
            icon="basket-outline"
            mode="contained"
            dark
            disabled={
              product.stock_status === 'instock' ? false : true
            }
            onPress={() => console.log('Pressed')}
            style={{ marginTop: 10 }}
            color={colors.accent}
          >
            Add to cart
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    resizeMode: 'cover',
    height: 500,
  },
  container: {
    flex: 1,
  },
});

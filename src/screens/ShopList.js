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

const RighContent = (link, name) => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'Buy ' + name + 'in Trippe Store:  ' + link,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          //
        } else {
          //
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        //opacity: 0.5,
        marginRight: 8,
      }}
    >
      <TouchableOpacity onPress={onShare}>
        <MaterialIcon
          style={{
            opacity: 0.5,
          }}
          size={25}
          name="share"
        />
      </TouchableOpacity>
    </View>
  );
};

export default function ShopList() {
  const navigation = useNavigation();
  const route = useRoute();

  const categoryId = JSON.stringify(route.params.id);

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const source = axios.CancelToken.source();

  const fetchProducts = ShopApi.get('products', {
    category: categoryId,
    cancelToken: source.token,
  })
    .then((data) => {
      setProducts(data);
      setLoading(false);
    })
    .catch((error) => {
      console.log('product fetching in main shop: ' + error);
      setLoading(false);
    });

  useEffect(() => {
    () => fetchProducts;
    return () => {
      source.cancel('Shop main got unmounted');
    };
  }, [products]);

  return loading ? (
    <ShopLoadingAnimation />
  ) : (
    <FlatList
      data={products}
      renderItem={({ item }) => {
        return (
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
              title={item.name}
              subtitle={item.categories[0].name}
              right={() => RighContent(item.permalink, item.name)}
            />
            <Card.Cover
              source={{
                uri: item.images[0].src,
              }}
              style={{
                aspectRatio: 1,
                resizeMode: 'cover',
                alignSelf: 'center',
              }}
            />

            <Card.Content style={{ marginTop: 8 }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ShopDetail', {
                    name: item.name,
                    productId: item.id,
                  })
                }
              >
                <HTML source={{ html: item.short_description }} />
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 8,
                  }}
                >
                  <Subheading>
                    {item.stock_status === 'instock' ? '✔︎ ' : '✗ '}
                  </Subheading>
                  <Subheading
                    style={{
                      color:
                        item.stock_status === 'instock'
                          ? colors.accent
                          : 'red',
                      fontWeight: 'bold',
                    }}
                  >
                    {item.stock_status}
                  </Subheading>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 8,
                    marginBottom: 8,
                  }}
                >
                  {/* <HTML source={{ html: item.price_html }} /> */}
                  <Text>$ {item.price}</Text>
                </View>
                {/* <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ShopDetail', {
                    name: item.name,
                    productId: item.id,
                  })
                }
              >
                <MaterialIcon
                  style={{ opacity: 0.5, marginBottom: 10 }}
                  name="basket-outline"
                  size={40}
                />
              </TouchableOpacity> */}

                <Text style={{ fontWeight: 'bold' }}>More..</Text>
              </TouchableOpacity>
              <Button
                icon="basket-outline"
                mode="contained"
                dark
                disabled={
                  item.stock_status === 'instock' ? false : true
                }
                onPress={() => console.log('Pressed')}
                style={{ marginTop: 10 }}
                color={colors.accent}
              >
                Add to cart
              </Button>
            </Card.Content>
          </Card>
        );
      }}
      keyExtractor={(item, index) => index}
    />
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

import React, { useState, useEffect } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';

import ProductItem from '../../components/shop/ProductItem';

const _renderProduct = (props) => (item) => (
  <ProductItem {...props} product={item} isInCart={false} />
);

const _renderEmpty = () => (
  <Text style={styles.textEmpty}>
    No available product at the moment
  </Text>
);

const Shop = () => {
  const [products, setProducts] = useState([]);

  handleProductPress = (id) => navigation.navigate('Detail', { id });

  useEffect(() => {}, []);

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={products}
      renderItem={_renderProduct(products)}
      keyExtractor={(item) => `${item.id}`}
      numColumns={2}
      ListEmptyComponent={_renderEmpty()}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  textEmpty: {
    textAlign: 'center',
    marginTop: 16,
  },
});

export default Shop;

import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Button, Card, Icon, Rating } from 'react-native-elements';
import HTML from 'react-native-render-html';

const { width: screenWidth } = Dimensions.get('window');

const ProductItem = (props) => {
  const {
    product: {
      id,
      name,
      images: [image],
      price,
    },
    handleProductPress,
    isInCart = false,
  } = props;

  return (
    <TouchableOpacity onPress={() => handleProductPress(id)}>
      <Card
        title={name}
        titleNumberOfLines={2}
        image={{ uri: image.src }}
        containerStyle={styles.card}
      >
        <Text>{price}</Text>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: screenWidth / 2 - 20,
    margin: 10,
  },
  actionView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  rating: {
    paddingVertical: 5,
  },
});

export default ProductItem;

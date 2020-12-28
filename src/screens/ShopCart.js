import React, { useContext } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import { Text, DataTable, Title, Button } from 'react-native-paper';
import { MaterialIcon } from '../components/Icon';
import { colors } from '../constant/theme';

import {
  ShopStateContext,
  ShoppingContex,
} from '../navigation/ShopStack';

export default function ShopCart({ navigation }) {
  const { addItemToCart, removeItemFromCart } = useContext(
    ShoppingContex,
  );
  const { cart } = useContext(ShopStateContext);

  return (
    <ScrollView>
      {cart.length == 0 ? (
        <View
          style={{
            alignContent: 'center',
            marginTop: 10,
          }}
        >
          <Title style={{ alignSelf: 'center' }}>
            Your Cart is empty.
          </Title>
          <MaterialIcon
            style={{
              alignSelf: 'center',
              margin: 5,
              color: colors.accent,
            }}
            name="cart-remove"
            size={50}
          />
        </View>
      ) : (
        <View
          style={{
            margin: 5,
          }}
        >
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Product</DataTable.Title>
              <DataTable.Title numeric>Count</DataTable.Title>
              <DataTable.Title numeric>Price</DataTable.Title>
              <DataTable.Title numeric>Delete</DataTable.Title>
            </DataTable.Header>

            {cart.map((item) => (
              <DataTable.Row key={item.id}>
                <DataTable.Cell>{item.name}</DataTable.Cell>
                <DataTable.Cell numeric>1</DataTable.Cell>
                <DataTable.Cell numeric>{item.price}$</DataTable.Cell>

                <DataTable.Cell numeric>
                  <TouchableOpacity
                    onPress={() => removeItemFromCart(item.id)}
                  >
                    <MaterialIcon
                      name="delete-outline"
                      size={20}
                      style={{ color: 'red', opacity: 0.7 }}
                    />
                  </TouchableOpacity>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
          <Button
            dark
            icon="credit-card-check-outline"
            mode="contained"
            color={colors.accent}
          >
            Check out
          </Button>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({});

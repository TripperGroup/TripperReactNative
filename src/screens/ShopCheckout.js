import React, { useContext, useState } from 'react';
import { StyleSheet, ScrollView, View, Linking } from 'react-native';
import {
  Text,
  TextInput,
  Button,
  ActivityIndicator,
} from 'react-native-paper';
import { Formik } from 'formik';
import {
  ShopStateContext,
  ShoppingContex,
} from '../navigation/ShopStack';
import ShopApi from '../constant/WooCommerce';
import axios from 'axios';
import { wordpressBaseUrl } from '../constant/api';
import { colors } from '../constant/theme';

export default function ShopCheckout({ navigation }) {
  const [loading, setLoading] = useState(false);

  var orderData = [];

  const [error, setError] = useState('');

  const { addItemToCart, removeItemFromCart } = useContext(
    ShoppingContex,
  );
  const { cart } = useContext(ShopStateContext);

  function handleCheckoutSubmit(userInfo) {
    setLoading(true);

    const order = {
      billing: userInfo,
      shipping: userInfo,
      line_items: cart.map((item) => ({
        product_id: item.id,
        quantity: 1,
      })),
      payment_method: 'bacs',
      payment_method_title: 'Direct Bank Transfer',
    };
    ShopApi.post('orders', order)
      .then((data) => {
        setLoading(false);
        orderData = data;
        console.log(data);
        pay(data);
      })
      .catch((error) => {
        setLoading(false);
        setError(JSON.stringify(error));
      });
  }

  function pay(data) {
    const paymentUrl =
      `${wordpressBaseUrl}/checkout/order-pay/${data.id}` +
      `?pay_for_order=true&key=${data.order_key}`;
    return Linking.openURL(paymentUrl);
  }

  return (
    <Formik
      initialValues={{
        first_name: '',
        last_name: '',
        address_1: '',
        address_2: '',
        city: '',
        state: '',
        postcode: '',
        country: '',
        email: '',
        phone: '',
      }}
      onSubmit={(values) => handleCheckoutSubmit(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <ScrollView>
          <TextInput
            label="First Name"
            placeholder="James"
            onChangeText={handleChange('first_name')}
            onBlur={handleBlur('first_name')}
            value={values.first_name}
          />
          <TextInput
            label="Last Name"
            placeholder="Moriarty"
            onChangeText={handleChange('last_name')}
            onBlur={handleBlur('last_name')}
            value={values.last_name}
          />
          <TextInput
            label="Address 1"
            placeholder="221B Baker Street"
            onChangeText={handleChange('address_1')}
            onBlur={handleBlur('address_1')}
            value={values.address_1}
          />
          <TextInput
            label="Address 2"
            onChangeText={handleChange('address_2')}
            onBlur={handleBlur('address_2')}
            value={values.address_2}
          />
          <TextInput
            label="City"
            placeholder="Birmingham"
            onChangeText={handleChange('city')}
            onBlur={handleBlur('city')}
            value={values.city}
          />
          <TextInput
            label="State"
            placeholder="West Midlands"
            onChangeText={handleChange('state')}
            onBlur={handleBlur('state')}
            value={values.state}
          />
          <TextInput
            label="Post Code"
            placeholder="NW1 6XE"
            onChangeText={handleChange('postcode')}
            onBlur={handleBlur('postcode')}
            value={values.postcode}
          />
          <TextInput
            label="Country"
            placeholder="United Kingdom"
            onChangeText={handleChange('country')}
            onBlur={handleBlur('country')}
            value={values.country}
          />
          <TextInput
            label="Email"
            placeholder="james@gov.uk"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
          />
          <TextInput
            label="Phone"
            placeholder="+628123456789"
            onChangeText={handleChange('phone')}
            onBlur={handleBlur('phone')}
            value={values.phone}
          />
          <Button
            color={colors.accent}
            mode="contained"
            onPress={handleSubmit}
            dark
            loading={loading}
          >
            {loading
              ? 'Checking order and redirecting'
              : 'Proceed to payment'}
          </Button>
          {error ? <Text color="red">{error}</Text> : null}
        </ScrollView>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({});

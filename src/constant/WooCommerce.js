import WooCommerceAPI from 'react-native-woocommerce-api';

export default ShopAPI = new WooCommerceAPI({
  url: 'https://trippergroup.ir', // Your store URL
  ssl: true,
  consumerKey: 'ck_a623d92a734af705146d761d422143cf4dccadfa', // Your consumer secret
  consumerSecret: 'cs_667f78ae67f48d80d072ab88c6e94ff2e26702ec', // Your consumer secret
  wpAPI: true, // Enable the WP REST API integration
  version: 'wc/v3', // WooCommerce WP REST API version
  queryStringAuth: true,
});

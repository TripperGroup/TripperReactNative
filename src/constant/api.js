// import axios from 'axios';
// import AsyncStorage from '@react-native-community/async-storage';

// const bootstrapAsync = async () => {
//   let userToken;
//   try {
//     userToken = await AsyncStorage.getItem('token');
//     return userToken;
//   } catch (e) {
//     // Restoring token failed
//   }
// };

// const token = bootstrapAsync();

// export const configGet = {
//   method: 'get',
//   url: 'http://127.0.0.1:8001/api/trip/',
//   headers: { Authorization: `Token ${token}` },
// };

export default apiUrl = 'https://app.trippergroup.ir/api';

export const wordpressUrl = 'https://trippergroup.ir/wp-json';

export const wordpressBaseUrl = 'https://trippergroup.ir';

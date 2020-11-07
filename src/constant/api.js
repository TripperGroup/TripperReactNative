import axios from 'react-native-axios';
import AsyncStorage from '@react-native-community/async-storage';

const bootstrapAsync = async () => {
  let userToken;
  try {
    userToken = await AsyncStorage.getItem('token');
    return userToken;
  } catch (e) {
    // Restoring token failed
  }
};

const token = bootstrapAsync();

axios.defaults.baseURL = 'http://127.0.0.1:8001/api';
axios.defaults.headers.common['Authorization'] = `Token ${token}`;

const TripperApi = axios.create();

TripperApi.defaults.timeout = 2500;

export default TripperApi;

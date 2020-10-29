import SignIn from '../../screens/SignIn';
import axios from 'react-native-axios';

import {
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
  RESTORE_TOKEN,
  SIGN_IN_SUCCESS,
} from '../constants';

import AsyncStorage from '@react-native-async-storage/async-storage';

// Api calls

export function restoreToken() {
  userToken = AsyncStorage.getItem('token');
  if (userToken != null) {
    return {
      type: RESTORE_TOKEN,
      userToken,
    };
  } else {
    return;
  }
}

export function signInRequest(username, password) {
  return (dispatch) => {
    return axios
      .post(
        'http://127.0.0.1:8001/api/auth/login/',
        {
          username,
          password,
        },
        200,
      )
      .then((response) => {
        let token = response.data.token;
        AsyncStorage.setItem('token', token);
        dispatch(singInSuccess(token));
      })
      .catch((error) => console.log(error));
  };
}
export function singInSuccess(token) {
  return {
    type: SIGN_IN_SUCCESS,
    token,
  };
}

// Sign up now handles in SingUp.js & should to be here
// export function signUp(data) {
//   return {
//     type: SIGN_UP,
//     data,
//   };
// }

export function signOut() {
  return {
    type: SIGN_OUT,
  };
}

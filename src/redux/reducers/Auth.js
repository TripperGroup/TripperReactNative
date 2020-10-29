import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS,
  RESTOR_TOKEN,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
} from '../constants';

export default function authReducer(
  state = {
    isLoadingToken: true,
    isSignout: false,
    isSignIn: false,
    userToken: null,
    isRequesting: false,
  },
  action,
) {
  switch (action.type) {
    case RESTOR_TOKEN:
      return Object.assign({}, state, {
        userToken: action.token,
        isLoadingToken: false,
      });
    case SIGN_IN_REQUEST:
      return Object.assign({}, state, {
        isRequesting: true,
        isSignout: true,
        userToken: null,
      });
    case SIGN_IN_SUCCESS:
      return Object.assign({}, state, {
        userToken: action.token,
      });

    case SIGN_UP_REQUEST:
      return Object.assign({}, state, {
        isSignout: true,
        isRequesting: true,
      });

    case SIGN_UP_SUCCESS:
      return Object.assign({}, state, {
        isSignout: true,
        isRequesting: false,
        userToken: null, // get token when sign up?
      });

    case SIGN_OUT_SUCCESS:
      return Object.assign({}, state, {
        isSignout: true,
        userToken: null,
      });
    default:
      return Object.assign(state);
  }
}

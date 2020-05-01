import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'save_token':
      return { token: action.payload, errorMessage: '' };
    case 'signout':
      return { token: null, errorMessage: '' };
    case 'error':
      return { ...state, errorMessage: action.payload };
    case 'clear_error_message':
      return { ...state, errorMessage: '' };
    default:
      return state;
  }
};

const authenticate = (dispatch, url) => async ({ email, password }) => {
  try {
    const { data } = await trackerApi.post(url, { email, password });
    await AsyncStorage.setItem('token', data.token);
    dispatch({ type: 'save_token', payload: data.token });
    navigate('TrackList');

  } catch (e) {
    dispatch({ type: 'error', payload: e.response.data.error });
  }
};

const signup = (dispatch) => authenticate(dispatch, 'signup');

const signin = (dispatch) => authenticate(dispatch, 'signin');

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem('token');
  dispatch({ type: 'signout' });
  navigate('loginFlow');
};

const clearErrorMessage = (dispatch) => () => dispatch({ type: 'clear_error_message' });

const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    dispatch({ type: 'save_token', payload: token });
    navigate('TrackList');
  } else {
    navigate('loginFlow');
  }
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin, signout, clearErrorMessage, tryLocalSignin },
  { token: null, errorMessage: '' }
);

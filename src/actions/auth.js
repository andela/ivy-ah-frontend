import * as actions from './actionTypes';
import { signup, login } from '../api';
import { fetchBookmarks } from './bookmark';

export const authStart = () => ({
  type: actions.AUTH_LOADING
});

export const toggleModal = (modalPane = 'sign in') => ({
  type: actions.TOGGLE_MODAL,
  modalPane
});

export const signOut = () => ({
  type: actions.SIGN_OUT
});

export const authSuccess = (token, id, email) => ({
  type: actions.AUTH_SUCCESS,
  userId: id,
  email,
  token
});

export const authFail = error => ({
  type: actions.AUTH_FAIL,
  error
});

export const verifyEmail = email => ({
  type: actions.VERIFY_EMAIL,
  email
});

export const signUp = (firstname, lastname, email, password) => (dispatch) => {
  dispatch(authStart());
  const authData = {
    firstname,
    lastname,
    email,
    password,
  };
  signup(authData)
    .then((response) => {
      dispatch(verifyEmail(response.data.user.email));
      dispatch(fetchBookmarks());
    })
    .catch((err) => {
      const { error } = err.response.data;
      dispatch(authFail(error));
    });
};

export const logIn = (email, password) => (dispatch) => {
  dispatch(authStart());
  const authData = {
    email,
    password,
  };
  login(authData)
    .then((response) => {
      const { id, token } = response.data.user;
      if (!response.data.user.isVerified) {
        dispatch(authSuccess(token, id, response.data.user.email));
      } else {
        dispatch(authSuccess(token, id, response.data.user.email));
      }
      dispatch(fetchBookmarks());
    })
    .catch((err) => {
      const { error } = err.response.data;
      dispatch(authFail(error));
    });
};

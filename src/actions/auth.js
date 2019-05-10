import * as actions from './actionTypes';
import signup from '../api';


export const authStart = () => ({
  type: actions.AUTH_LOADING
});

export const toggleModal = (modalPane = 'sign in') => ({
  type: actions.TOGGLE_MODAL,
  modalPane
});

export const signUpSuccess = (token, id, email) => ({
  type: actions.SIGNUP_SUCCESS,
  userId: id,
  userEmail: email,
  token
});

export const signUpFail = error => ({
  type: actions.SIGNUP_FAIL,
  error
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
      const { userid, token } = response.data.user;
      dispatch(signUpSuccess(token, userid, response.data.user.email));
    })
    .catch((err) => {
      const { error } = err.response.data;
      dispatch(signUpFail(error));
    });
};

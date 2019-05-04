import axios from 'axios';
import * as actions from './actionTypes';


export const authStart = () => ({
  type: actions.AUTHLOADING
});

export const signUpSuccess = (token, id, email) => ({
  type: actions.SIGNUPSUCCESS,
  userId: id,
  userEmail: email,
  token
});

export const signUpFail = error => ({
  type: actions.SIGNUPFAIL,
  error
});

export const failedValidation = error => ({
  type: actions.SIGNUPFAIL,
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
  const url = 'https://ivy-ah-backend-staging.herokuapp.com/api/v1/users/signup';
  axios.post(url, authData)
    .then((response) => {
      const { userid, token } = response.data.user;
      localStorage.setItem('user', JSON.stringify(response.data.user));
      dispatch(signUpSuccess(token, userid, response.data.user.email));
    })
    .catch((err) => {
      const { error } = err.response.data;
      dispatch(signUpFail(error));
    });
};

export const login = (email, password) => (dispatch) => {
  dispatch(authStart());
  const authData = {
    email,
    password,
  };
  const url = 'https://ivy-ah-backend-staging.herokuapp.com/api/v1/users/login';
  axios.post(url, authData)
    .then((response) => {
      const { userid, token } = response.data.user;
      localStorage.setItem('user', JSON.stringify(response.data.user));
      dispatch(signUpSuccess(token, userid, response.data.user.email));
    })
    .catch((err) => {
      const { error } = err.response.data;
      dispatch(signUpFail(error));
    });
};

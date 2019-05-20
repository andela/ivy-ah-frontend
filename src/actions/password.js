import * as actions from './actionTypes';
import { forgotPassword, resetPassword } from '../api';


export const passwordStart = () => ({
  type: actions.PASSWORD_LOADING
});

export const sendResetLinkSuccess = passwordResetToken => ({
  type: actions.PASSWORD_SUCCESS,
  passwordResetToken
});

export const sendResetLinkFail = error => ({
  type: actions.PASSWORD_FAIL,
  error
});

export const sendLink = email => (dispatch) => {
  dispatch(passwordStart());
  const url = 'https://ivy-ah-frontend.herokuapp.com/resetPassword';
  forgotPassword({ email, url })
    .then((response) => {
      dispatch(sendResetLinkSuccess(response.data.passwordResetToken));
    })
    .catch((err) => {
      const { error } = err.response.data;
      dispatch(sendResetLinkFail(error));
    });
};

export const resetSuccess = message => ({
  type: actions.RESET_SUCCESS,
  message
});

export const resetFail = error => ({
  type: actions.RESET_FAIL,
  error
});

export const reset = password => (dispatch) => {
  dispatch(passwordStart());
  const authData = {
    password,
  };
  resetPassword({ ...authData })
    .then((response) => {
      dispatch(resetSuccess(response.data.message));
    })
    .catch((err) => {
      const { error } = err.response.data;
      dispatch(sendResetLinkFail(error));
    });
};

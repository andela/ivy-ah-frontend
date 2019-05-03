import axios from 'axios';
import * as actions from './actionTypes';


export const authStart = () => ({
  type: actions.AUTHLOADING
});

export const signUpSuccess = (token, userId, userEmail) => ({
  type: actions.SIGNUPSUCCESS,
  userId,
  token
});

export const signUpFail = error => ({
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
      
    });
};


// export const auth = (email, password, isSignup) => {
//   return dispatch => {
//       dispatch(authStart());
//       const authData = {
//           email: email,
//           password: password,
//           returnSecureToken: true
//       };resp
//       let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyB5cHT6x62tTe-g27vBDIqWcwQWBSj3uiY';
//       if (!isSignup) {
//           url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyB5cHT6x62tTe-g27vBDIqWcwQWBSj3uiY';
//       }
//       axios.post(url, authData)
//           .then(response => {
//               console.log(response);
//               const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
//               localStorage.setItem('token', response.data.idToken);
//               localStorage.setItem('expirationDate', expirationDate);
//               localStorage.setItem('userId', response.data.localId);
//               dispatch(authSuccess(response.data.idToken, response.data.localId));
//               dispatch(checkAuthTimeout(response.data.expiresIn));
//           })
//           .catch(err => {
//               dispatch(authFail(err.response.data.error));
//           });
//   };
// };

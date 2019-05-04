import * as actions from '../actions/actionTypes';

const initialState = {
  token: null,
  userId: null,
  userEmail: null,
  error: null,
  verified: null,
  loading: false,
  authRedirectPath: '/'
};

const authLoading = (state, action) => ({
  ...state,
  error: null,
  loading: true
});

const signupSuccess = (state, action) => ({
  ...state,
  token: action.token,
  userId: action.userId,
  userEmail: action.userEmail,
  signedUp: true,
  verified: false,
  loading: false,
  error: null

});

const signupFail = (state, action) => ({
  ...state,
  error: action.error,
  loading: false
});

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.AUTHLOADING: return authLoading(state, action);
    case actions.SIGNUPSUCCESS: return signupSuccess(state, action);
    case actions.SIGNUPFAIL: return signupFail(state, action);
    default:
      return state;
  }
};

export default AuthReducer;

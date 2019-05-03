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

const authLoading = (state, action) => {
  console.log('i am auth loading');
  return {
    ...state,
    error: null,
    loading: true
  };
};

const signupSuccess = (state, action) => {
  console.log('i am from signupSuccess');
  return {
    ...state,
    token: action.token,
    userId: action.userId,
    userEmail: action.userEmail,
    verified: false,
    loading: false,
    error: null

  };
};

const signupFail = (state, action) => {
  console.log('i am from failing signup');
  return {
    ...state,
    error: action.error,
    loading: false
  };
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.AUTHLOADING: return authLoading(state, action);
    case actions.SIGNUPSUCCESS: return signupSuccess(state, action);
    case actions.SIGNUPFAIL: return signupFail(state, action);
    // case actions.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
    default:
      return state;
  }
};

export default AuthReducer;

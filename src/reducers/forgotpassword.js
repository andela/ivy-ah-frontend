import * as actions from '../actions/actionTypes';

const initialState = {
  passwordResetToken: null,
  error: null,
  loading: false,
  isAuthenticated: false
};

const passwordLoading = state => ({
  ...state,
  error: null,
  loading: true
});

const sendResetLinkSuccess = (state, action) => ({
  ...state,
  passwordResetToken: action.passwordResetToken,
  loading: false,
  error: null
});

const sendResetLinkFail = (state, action) => ({
  ...state,
  error: action.error,
  loading: false
});


const passwordReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.AUTH_LOADING: return passwordLoading(state, action);
    case actions.PASSWORD_SUCCESS: return sendResetLinkSuccess(state, action);
    case actions.PASSWORD_FAIL: return sendResetLinkFail(state, action);
    default:
      return state;
  }
};

export default passwordReducer;

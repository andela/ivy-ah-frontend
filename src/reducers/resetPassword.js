import * as actions from '../actions/actionTypes';

const initialState = {
  message: null,
  error: null,
  loading: false,
  isAuthenticated: false,
  login: null

};

const passwordLoading = state => ({
  ...state,
  error: null,
  loading: true
});

const resetSuccess = (state, action) => ({
  ...state,
  message: action.message,
  loading: false,
  error: null
});

const resetFail = (state, action) => ({
  ...state,
  error: action.error,
  loading: false
});


const resetReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.AUTH_LOADING: return passwordLoading(state, action);
    case actions.RESET_SUCCESS: return resetSuccess(state, action);
    case actions.RESET_FAIL: return resetFail(state, action);
    default:
      return state;
  }
};

export default resetReducer;

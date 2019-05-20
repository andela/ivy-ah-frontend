import { persistReducer } from 'redux-persist';
import { decode } from 'jsonwebtoken';
import storage from 'redux-persist/lib/storage';
import * as actions from '../actions/actionTypes';

const authPersistConfig = {
  key: 'auth',
  storage
};

const initialState = {
  token: '',
  userId: null,
  email: null,
  error: null,
  verified: false,
  loading: false,
  openModal: false,
  modalPane: 'sign in',
  shouldRedirect: false,
  user: {},
};

const authLoading = state => ({
  ...state,
  error: null,
  openModal: true,
  loading: true
});

const authSuccess = (state, action) => ({
  ...state,
  token: action.token,
  userId: action.userId,
  email: action.email,
  verified: false,
  openModal: false,
  loading: false,
  error: null,
  user: decode(action.token) || {}
});

const authFail = (state, action) => ({
  ...state,
  error: action.error,
  openModal: true,
  loading: false
});

const toggleModal = (state, action) => ({
  ...state,
  openModal: !state.openModal,
  modalPane: action.modalPane
});

const verifyEmail = (state, action) => ({
  ...state,
  shouldRedirect: true,
  email: action.email
});

const signOut = () => initialState;

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.AUTH_LOADING: return authLoading(state, action);
    case actions.AUTH_SUCCESS: return authSuccess(state, action);
    case actions.AUTH_FAIL: return authFail(state, action);
    case actions.TOGGLE_MODAL: return toggleModal(state, action);
    case actions.VERIFY_EMAIL: return verifyEmail(state, action);
    case actions.SIGN_OUT: return signOut();
    default:
      return state;
  }
};

export default persistReducer(authPersistConfig, AuthReducer);

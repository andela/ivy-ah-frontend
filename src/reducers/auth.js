import * as actions from '../actions/actionTypes';

const initialState = {
  token: null,
  userId: null,
  email: null,
  error: null,
  verified: false,
  loading: false,
  openModal: false,
  modalPane: 'sign in',
  shouldRedirect: false
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
  error: null
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

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.AUTH_LOADING: return authLoading(state, action);
    case actions.AUTH_SUCCESS: return authSuccess(state, action);
    case actions.AUTH_FAIL: return authFail(state, action);
    case actions.TOGGLE_MODAL: return toggleModal(state, action);
    case actions.VERIFY_EMAIL: return verifyEmail(state, action);
    default:
      return state;
  }
};

export default AuthReducer;

import * as actions from '../actions/actionTypes';

const initialState = {
  token: null,
  userId: null,
  userEmail: null,
  error: null,
  verified: false,
  loading: false,
  authRedirectPath: '/',
  openModal: false,
  modalPane: 'sign in'
};

const authLoading = state => ({
  ...state,
  error: null,
  openModal: true,
  loading: true
});

const signupSuccess = (state, action) => ({
  ...state,
  token: action.token,
  userId: action.userId,
  userEmail: action.userEmail,
  verified: false,
  loading: false,
  error: null
});

const signupFail = (state, action) => ({
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

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.AUTH_LOADING: return authLoading(state, action);
    case actions.SIGNUP_SUCCESS: return signupSuccess(state, action);
    case actions.SIGNUP_FAIL: return signupFail(state, action);
    case actions.TOGGLE_MODAL: return toggleModal(state, action);
    default:
      return state;
  }
};

export default AuthReducer;

import React from 'react';
import { shallow } from 'enzyme';
import { Message, Modal } from 'semantic-ui-react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import AuthErrorMessage from '../src/components/AuthErrorMessage';
import AuthModal from '../src/components/AuthModal';
import AuthReducer from '../src/reducers/auth';
import * as actions from '../src/actions/auth';
import * as types from '../src/actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('<AuthErrorMessage/>', () => {
  let wrapper;

  beforeEach(() => {

  });

  it('should return a <Message/> element ', () => {
    wrapper = shallow(<AuthErrorMessage
      hidden={false}
      error={{ email: 'please provide a valid email' }}
    />);
    expect(wrapper.find(<Message />));
  });

  it('should return a <Message/> element when given error in form of string', () => {
    wrapper = shallow(<AuthErrorMessage
      hidden={false}
      error="please provide a valid email"
    />);
    expect(wrapper.find(<Message />));
  });
});

describe('<AuthModal/>', () => {
  let wrapper;
  beforeEach(() => {
    // eslint-disable-next-line function-paren-newline
    wrapper = shallow(
      <AuthModal size="large" dimmer="inverted" close={value => value} open>
        <p>this is a wonderful paragraph</p>
      </AuthModal>);
  });
  it('should return a <Modal/> element', () => {
    expect(wrapper.find(<Modal />));
  });

  it('renders children when passed ', () => {
    expect(wrapper.contains(<p>this is a wonderful paragraph</p>));
  });
});

describe('Auth reducer', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  const initialState = {
    token: null,
    userId: null,
    email: null,
    error: null,
    verified: false,
    loading: false,
    shouldRedirect: false,
    openModal: false,
    modalPane: 'sign in'
  };

  it('should return the initial state', () => {
    expect(AuthReducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      email: null,
      error: null,
      verified: false,
      loading: false,
      shouldRedirect: false,
      openModal: false,
      modalPane: 'sign in'
    });
  });

  it('should change loading to true', () => {
    expect(AuthReducer(initialState, actions.authStart())).toEqual({
      ...initialState,
      loading: true,
      openModal: true,
    });
  });

  it('it should store the token, user-email, user-id in the state', () => {
    expect(AuthReducer(initialState, actions.authSuccess('some-token', 'some-id', 'some-email'))).toEqual({
      token: 'some-token',
      userId: 'some-id',
      email: 'some-email',
      modalPane: 'sign in',
      openModal: false,
      error: null,
      verified: false,
      loading: false,
      shouldRedirect: false,
    });
  });

  it('it should add the error message to the state', () => {
    expect(AuthReducer(initialState, actions.authFail({ email: 'please provide a valid email' }))).toEqual({
      ...initialState,
      error: { email: 'please provide a valid email' },
      loading: false,
      openModal: true,
    });
  });

  it('it should toggle open the auth modal', () => {
    expect(AuthReducer(initialState, actions.toggleModal('sign up'))).toEqual({
      ...initialState,
      modalPane: 'sign up',
      openModal: true
    });
  });

  it('it should toggle close the auth modal', () => {
    expect(AuthReducer({
      token: null,
      userId: null,
      email: null,
      error: null,
      verified: false,
      loading: false,
      openModal: true,
      modalPane: 'sign in',
      shouldRedirect: false,
    }, actions.toggleModal('sign up'))).toEqual({
      ...initialState,
      modalPane: 'sign up',
      openModal: false
    });
  });

  it('it should signup a user', () => {
    fetchMock.post('https://ivy-ah-backend-staging.herokuapp.com/api/v1/users/signup', {
      response: { userid: 'some-id', token: 'some-t' },
      headers: { 'content-type': 'application/json' }
    });

    const expectedActions = [
      { type: types.AUTH_LOADING },
    ];

    const store = mockStore({
      auth: {
        token: null,
        userId: null,
        email: null,
        error: null,
        verified: false,
        loading: false,
      }
    });
    store.dispatch(actions.signUp('innocent', 'element', 'eme@gmail.com', 'ssssssss'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('it should login a user', () => {
    fetchMock.post('https://ivy-ah-backend-staging.herokuapp.com/api/v1/users/login', {
      response: { userid: 'some-id', token: 'some-t' },
      headers: { 'content-type': 'application/json' }
    });

    const expectedActions = [
      { type: types.AUTH_LOADING },
    ];

    const store = mockStore({
      auth: {
        token: null,
        userId: null,
        email: null,
        error: null,
        verified: false,
        loading: false,
      }
    });
    store.dispatch(actions.logIn('eme@gmail.com', 'ssssssss'));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('Auth actions', () => {
  it('should create an action of the type authLoading', () => {
    const expectedAction = {
      type: 'AUTH_LOADING',
    };
    expect(actions.authStart()).toEqual(expectedAction);
  });

  it('should create an action of the type authLoading', () => {
    const expectedAction = {
      type: types.AUTH_LOADING,
    };
    expect(actions.authStart()).toEqual(expectedAction);
  });

  it('should create an action of the type TOGGLE_MODAL', () => {
    const expectedAction = {
      type: types.TOGGLE_MODAL,
      modalPane: 'sign in'
    };
    expect(actions.toggleModal()).toEqual(expectedAction);
  });

  it('should create an action of the type AUTH_SUCCESS', () => {
    const expectedAction = {
      type: types.AUTH_SUCCESS,
      userId: 'some-id',
      email: 'some-email',
      token: 'some-token'
    };
    expect(actions.authSuccess('some-token', 'some-id', 'some-email')).toEqual(expectedAction);
  });

  it('should create an action of the type AUTH_FAIL', () => {
    const expectedAction = {
      type: types.AUTH_FAIL,
      error: { email: 'please provide email' }

    };
    expect(actions.authFail({ email: 'please provide email' })).toEqual(expectedAction);
  });

  it('should create an action of the type VERIFY_EMAIL', () => {
    const expectedAction = {
      type: types.VERIFY_EMAIL,
      email: 'mail@mail.com'
    };
    expect(actions.verifyEmail('mail@mail.com')).toEqual(expectedAction);
  });
});

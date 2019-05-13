import React from 'react';
import { shallow } from 'enzyme';
import { Message } from 'semantic-ui-react';
import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import AuthErrorMessage from '../src/components/AuthErrorMessage';
import forgotPasswordReducer from '../src/reducers/forgotpassword';
import resetPasswordReducer from '../src/reducers/resetPassword';
import * as actions from '../src/actions/password';
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

  describe('Forgot password reducer', () => {
    afterEach(() => {
      fetchMock.restore();
    });

    const initialState = {
      passwordResetToken: null,
      error: null,
      loading: false,
    };

    it('it should store the passwordResetToken in the state', () => {
      expect(forgotPasswordReducer(initialState, actions.sendResetLinkSuccess('some-token'))).toEqual({
        passwordResetToken: 'some-token',
        loading: false,
        error: null,
      });
    });

    it('it should add the error message to the state', () => {
      expect(forgotPasswordReducer(initialState, actions.sendResetLinkFail({ email: 'please provide a valid email' }))).toEqual({
        ...initialState,
        error: { email: 'please provide a valid email' },
        loading: false,
      });
    });
    it('it should send password to a', () => {
      fetchMock.post('http://localhost:3000/api/v1/users/forgotPassword', {
        response: { passwordResetToken: 'some-t' },
        headers: { 'content-type': 'application/json' }
      });

      const expectedActions = [
        { type: types.PASSWORD_LOADING },
      ];

      const store = mockStore({
        password: {
          passwordResetToken: null,
          loading: false,
          error: null,
        }
      });
      store.dispatch(actions.sendLink('eme@gmail.com'));
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('it should login a user', () => {
      fetchMock.post('https://ivy-ah-backend-staging.herokuapp.com/api/v1/users/resetPassword', {
        response: { message: 'some-t' },
        headers: { 'content-type': 'application/json' }
      });

      const expectedActions = [
        { type: types.PASSWORD_LOADING },
      ];

      const store = mockStore({
        password: {
          message: null,
          loading: false,
          error: null,
        }
      });
      store.dispatch(actions.reset('ssssssss'));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('Reset password reducer', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  const initialState = {
    message: null,
    error: null,
    loading: false,
    isAuthenticated: false,
    login: null
  };

  it('it should store the message in the state', () => {
    expect(resetPasswordReducer(initialState, actions.resetSuccess('some-message'))).toEqual({
      message: 'some-message',
      error: null,
      loading: false,
      isAuthenticated: false,
      login: null
    });
  });

  it('it should add the error message to the state', () => {
    expect(forgotPasswordReducer(initialState, actions.sendResetLinkFail({ password: 'please provide a valid password' }))).toEqual({
      ...initialState,
      error: { password: 'please provide a valid password' },
      loading: false,
    });
  });
  it('it should login a user', () => {
    fetchMock.post('https://ivy-ah-backend-staging.herokuapp.com/api/v1/users/resetPassword', {
      response: { message: 'some-t' },
      headers: { 'content-type': 'application/json' }
    });

    const expectedActions = [
      { type: types.PASSWORD_LOADING },
    ];

    const store = mockStore({
      password: {
        message: null,
        loading: false,
        error: null,
      }
    });
    store.dispatch(actions.reset('ssssssss'));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

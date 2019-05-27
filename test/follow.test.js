import React from 'react';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import MockAdapter from 'axios-mock-adapter';
import * as api from '../src/api';
import * as actions from '../src/actions/actionTypes';
import {
  fetchFollowingStarted, userFollowing, followUserStarted,
  followUser, unFollowUserStarted, unFollowUser
} from '../src/actions/follow';
import follow from '../src/reducers/follow';
import FollowSwitch from '../src/components/Follow';
import { FollowContainer } from '../src/containers/Follow';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(api.client);

describe('Tests for the Follow/Unfollow user action creators', () => {
  const userId = 'f60cd301-f922-4f02-8316-2012df279636';
  const authorId = '5dc35524-b257-496e-9264-a089db25ff4f';

  it('fetchFollowingStarted', () => {
    const expectedAction = {
      type: actions.FETCH_FOLLOWING_STARTED,
      payload: {
        userId
      }
    };

    expect(fetchFollowingStarted(userId)).toEqual(expectedAction);
  });

  it('fetchFollowingSucceeded', () => {
    let user;
    mock.onGet(`/profiles/${userId}/following`).reply(200, {
      data: {}
    });

    const getState = {};
    const expectedActions = [
      { type: actions.FETCH_FOLLOWING_STARTED, payload: { userId } },
      { type: actions.FETCH_FOLLOWING_SUCCEEDED, payload: { user } }
    ];

    const store = mockStore(getState, expectedActions);
    return store.dispatch(userFollowing(userId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('followUserStarted', () => {
    const expectedAction = {
      type: actions.FOLLOW_USER_STARTED,
      payload: { authorId }
    };

    expect(followUserStarted(authorId)).toEqual(expectedAction);
  });

  it('followUserSucceeded', () => {
    mock.onPost(`/profiles/${authorId}/follow`).reply(200, {
      data: {}
    });

    const getState = {};
    const expectedActions = [
      { type: actions.FOLLOW_USER_STARTED, payload: { authorId } },
      { type: actions.FOLLOW_USER_SUCCEEDED, payload: { authorId } }
    ];

    const store = mockStore(getState, expectedActions);
    return store.dispatch(followUser(authorId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('followUserStarted', () => {
    const expectedAction = {
      type: actions.FOLLOW_USER_STARTED,
      payload: { authorId }
    };

    expect(followUserStarted(authorId)).toEqual(expectedAction);
  });

  it('unFollowUserStarted', () => {
    const expectedAction = {
      type: actions.UNFOLLOW_USER_STARTED,
      payload: { authorId }
    };

    expect(unFollowUserStarted(authorId)).toEqual(expectedAction);
  });

  it('unFollowUserSucceeded', () => {
    mock.onDelete(`/profiles/${authorId}/follow`).reply(200, {
      data: {}
    });

    const getState = {};
    const expectedActions = [
      { type: actions.UNFOLLOW_USER_STARTED, payload: { authorId } },
      { type: actions.UNFOLLOW_USER_SUCCEEDED, payload: { authorId } }
    ];

    const store = mockStore(getState, expectedActions);
    return store.dispatch(unFollowUser(authorId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('Tests for the Follow Reducer', () => {
  const initialState = {
    following: [],
    isFollowing: false,
    error: null,
  };

  it('should handle initial state', () => {
    expect(follow(undefined, {})).toEqual(initialState);
  });

  it('should handle fetch following succeeded', () => {
    const action = {
      type: actions.FETCH_FOLLOWING_SUCCEEDED,
      payload: {
        user: {
          following: ['Array of authors the user is folloing']
        }
      }
    };
    const expectedState = {
      ...initialState,
      following: action.payload.user.following,
      isFollowing: false
    };

    expect(follow(initialState, action)).toEqual(expectedState);
  });

  it('should handle follow user succeeded', () => {
    const action = {
      type: actions.FOLLOW_USER_SUCCEEDED,
      payload: {
        authorId: '5dc35524-b257-496e-9264-a089db25ff4f'
      }
    };
    const expectedState = {
      ...initialState,
      following: initialState.following.concat(action.payload.authorId),
      isFollowing: true
    };

    expect(follow(initialState, action)).toEqual(expectedState);
  });

  it('should handle unfollow user succeeded', () => {
    const action = {
      type: actions.UNFOLLOW_USER_SUCCEEDED,
      payload: {
        authorId: '5dc35524-b257-496e-9264-a089db25ff4f'
      }
    };
    const expectedState = {
      ...initialState,
      following: initialState.following.filter(follows => follows.id !== action.payload.authorId),
      isFollowing: false
    };

    expect(follow(initialState, action)).toEqual(expectedState);
  });
});

describe('Tests for the Follow Component', () => {
  it('renders the button with Unfollow when isFollowing is true', () => {
    const userId = 'f60cd301-f922-4f02-8316-2012df279636';
    const authorId = '5dc35524-b257-496e-9264-a089db25ff4f';
    const onClickFollow = jest.fn();
    const isFollowing = true;
    const tree = renderer
      .create(<FollowSwitch
        onClickFollow={onClickFollow}
        isFollowing={isFollowing}
        userId={userId}
        authorId={authorId}
      />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the button with Follow when isFollowing is false', () => {
    const userId = 'f60cd301-f922-4f02-8316-2012df279636';
    const authorId = '5dc35524-b257-496e-9264-a089db25ff4f';
    const onClickFollow = jest.fn();
    const isFollowing = false;
    const tree = renderer
      .create(<FollowSwitch
        onClickFollow={onClickFollow}
        isFollowing={isFollowing}
        userId={userId}
        authorId={authorId}
      />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders <Follow Container />', () => {
    const wrapper = shallow(<FollowContainer
      dispatch
      userId
      authorId
      isFollowing
    />);

    expect(wrapper.find(FollowContainer).length).toEqual(0);
  });
});

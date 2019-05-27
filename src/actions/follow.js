import * as api from '../api';
import * as actions from './actionTypes';

export const followUserStarted = authorId => ({
  type: actions.FOLLOW_USER_STARTED,
  payload: { authorId }
});

export const followUserSucceeded = authorId => ({
  type: actions.FOLLOW_USER_SUCCEEDED,
  payload: { authorId }
});

export const followUser = authorId => (dispatch) => {
  dispatch(followUserStarted(authorId));
  return api.followUser(authorId).then((res) => {
    dispatch(followUserSucceeded(authorId));
  });
};

export const fetchFollowingStarted = userId => ({
  type: actions.FETCH_FOLLOWING_STARTED,
  payload: { userId }
});

export const fetchFollowingSucceeded = user => ({
  type: actions.FETCH_FOLLOWING_SUCCEEDED,
  payload: { user }
});

export const userFollowing = userId => (dispatch) => {
  dispatch(fetchFollowingStarted(userId));
  return api.fetchUserFollowing(userId).then((res) => {
    dispatch(fetchFollowingSucceeded(res.data.data[0]));
  });
};

export const unFollowUserStarted = authorId => ({
  type: actions.UNFOLLOW_USER_STARTED,
  payload: { authorId }
});

export const unFollowUserSucceeded = authorId => ({
  type: actions.UNFOLLOW_USER_SUCCEEDED,
  payload: { authorId }
});

export const unFollowUser = authorId => (dispatch) => {
  dispatch(unFollowUserStarted(authorId));
  return api.unFollowUser(authorId).then((res) => {
    dispatch(unFollowUserSucceeded(authorId));
  });
};

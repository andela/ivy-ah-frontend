import * as actions from './actionTypes';
import { fetchProfile, fetchUserArticle, fetchUserFollowers } from '../api';


export const getProfileStart = () => ({
  type: actions.GET_PROFILE_STARTED
});

export const getProfileSucceeded = profile => ({
  type: actions.GET_PROFILE_SUCCEEDED,
  profile
});


export const getProfileFailed = () => ({
  type: actions.GET_PROFILE_FAILED
});

export const getProfileContentStart = () => ({
  type: actions.GET_PROFILE_CONTENT_START
});

export const getProfileContentSucceeded = (content, contentType) => ({
  type: actions.GET_PROFILE_CONTENT_SUCCEEDED,
  content,
  contentType
});

export const getProfileContentFailed = () => ({
  type: actions.GET_PROFILE_CONTENT_FAILED
});

export const getUserArticle = userId => (dispatch) => {
  dispatch(getProfileContentStart());
  return fetchUserArticle(userId)
    .then((response) => {
      const userArticles = response.data;
      dispatch(getProfileContentSucceeded(userArticles, 'articles'));
    })
    .catch((err) => {
      dispatch(getProfileContentFailed());
    });
};

export const getUserFollowers = authorId => (dispatch) => {
  dispatch(getProfileContentStart());
  return fetchUserFollowers(authorId)
    .then((response) => {
      const userFollowers = response.data.data[0].followers;
      dispatch(getProfileContentSucceeded(userFollowers, 'followers'));
    })
    .catch((err) => {
      dispatch(getProfileContentFailed());
    });
};

export const getProfile = id => (dispatch) => {
  dispatch(getProfileStart());
  return fetchProfile(id)
    .then((response) => {
      const { profile } = response.data;
      dispatch(getProfileSucceeded(profile));
    })
    .catch((err) => {
      dispatch(getProfileFailed());
    });
};

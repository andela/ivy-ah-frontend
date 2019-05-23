import * as api from '../api';
import * as actions from './actionTypes';

export const fetchArticleStarted = () => ({
  type: actions.FETCH_ARTICLE_STARTED
});

export const fetchArticleSucceeded = article => ({
  type: actions.FETCH_ARTICLE_SUCCEEDED,
  payload: { article }
});

export const fetchArticleFailed = error => ({
  type: actions.FETCH_ARTICLE_FAILED,
  payload: { error }
});

export const updateArticleHype = totalRating => ({
  type: actions.FETCH_ARTICLE_HYPE_SUCCESS,
  payload: { totalRating }
});

export const fetchCommentsSucceeded = article => ({
  type: actions.FETCH_COMMENTS_SUCCEEDED,
  payload: article,
});

export const fetchArticle = id => (dispatch) => {
  dispatch(fetchArticleStarted());
  return api.fetchArticle(id)
    .then((response) => {
      dispatch(fetchArticleSucceeded(response.data));
      dispatch(fetchCommentsSucceeded(response.data.data));
    })
    .catch((error) => {
      dispatch(fetchArticleFailed(error));
    });
};

export const fetchArticleHype = articleId => (dispatch) => {
  api.fetchLatestArticleHype(articleId)
    .then((response) => {
      dispatch(updateArticleHype(response.data.data.totalRating));
    });
};

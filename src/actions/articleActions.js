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

export const fetchArticle = id => (dispatch) => {
  dispatch(fetchArticleStarted());
  return api.fetchArticle(id)
    .then((response) => {
      dispatch(fetchArticleSucceeded(response.data));
    })
    .catch(error => dispatch(fetchArticleFailed(error)));
};

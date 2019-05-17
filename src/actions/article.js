import * as api from '../api';
import * as actions from './actionTypes';

export const fetchArticlesStarted = () => ({
  type: actions.FETCH_ALL_ARTICLES_STARTED,
});

const fetchArticlesSucceeded = articles => ({
  type: actions.FETCH_ALL_ARTICLES_SUCCEEDED,
  payload: { articles }
});

const fetchArticlesFailed = err => ({
  type: actions.FETCH_ALL_ARTICLES_FAILED,
  payload: { err }
});

export const fetchArticles = (page, limit) => (dispatch) => {
  dispatch(fetchArticlesStarted());
  return api.fetchArticles(page, limit).then((res) => {
    dispatch(fetchArticlesSucceeded(res.data));
  }).catch((err) => {
    dispatch(fetchArticlesFailed(err.message));
  });
};

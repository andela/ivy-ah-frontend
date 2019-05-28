import { toast } from 'react-toastify';
import * as api from '../api';
import * as actions from './actionTypes';


export const createArticleBegin = () => ({
  type: actions.ADD_ARTICLE_BEGIN
});

export const createArticleSuccess = article => ({
  type: actions.ADD_ARTICLE_SUCCESS,
  payload: article
});

export const createArticleFailure = error => ({
  type: actions.ADD_ARTICLE_FAILURE,
  payload: error
});

export const updateArticleBegin = () => ({
  type: actions.UPDATE_ARTICLE_BEGIN,
});

export const updateArticleSuccess = article => ({
  type: actions.UPDATE_ARTICLE_SUCCESS,
  payload: article
});

export const updateArticleFailed = () => ({
  type: actions.UPDATE_ARTICLE_FAILED,
});

export const createArticle = article => (dispatch) => {
  dispatch(createArticleBegin());
  const body = JSON.stringify(article);
  return api.addArticle(body).then((res) => {
    dispatch(createArticleSuccess(res.data));
    toast.success('Article has successfully been created');
  })
    .catch((error) => {
      dispatch(createArticleFailure(error));
      toast.error('An Error occured');
    });
};

export const updateArticle = (id, article) => (dispatch) => {
  dispatch(updateArticleBegin());
  const body = JSON.stringify(article);
  return api.updateArticle(id, body).then((res) => {
    dispatch(updateArticleSuccess(res.data));
  }).catch(() => dispatch(updateArticleFailed()));
};

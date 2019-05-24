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

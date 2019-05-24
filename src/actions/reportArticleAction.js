import { toast } from 'react-toastify';
import * as api from '../api';
import * as actions from './actionTypes';


export const reportArticleBegin = () => ({
  type: actions.REPORT_ARTICLE_STARTED
});

export const reportArticleSuccess = article => ({
  type: actions.REPORT_ARTICLE_SUCCEEDED,
  payload: article
});

export const reportArticleFailure = error => ({
  type: actions.REPORT_ARTICLE_FAILED,
  payload: error
});

export const reportArticle = article => (dispatch) => {
  dispatch(reportArticleBegin());
  const body = JSON.stringify(article);
  return api.reportArticle(body).then((res) => {
    dispatch(reportArticleSuccess(res.data));
    toast.success('Article successfully reported');
  })
    .catch((error) => {
      dispatch(reportArticleFailure(error));
      toast.error('An Error occured');
    });
};

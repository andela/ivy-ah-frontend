import * as actions from './actionTypes';
import { rateArticle } from '../api';
import { fetchArticleHype } from './articleActions';

export const rateArticleSuccess = rating => ({
  type: actions.RATE_ARTICLE_SUCCESS,
  rating
});

export const rateArticleFailure = () => ({
  type: actions.RATE_ARTICLE_FAILURE,
});

export const rateAnArticle = (articleId, rating) => dispatch => rateArticle({ articleId, rating })
  .then((response) => {
    dispatch(fetchArticleHype(articleId));
    dispatch(rateArticleSuccess(rating));
  })
  .catch((err) => {
    dispatch(rateArticleFailure());
  });

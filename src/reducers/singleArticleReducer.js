import {
  FETCH_ARTICLE_STARTED,
  FETCH_ARTICLE_SUCCEEDED,
  FETCH_ARTICLE_FAILED,
  RATE_ARTICLE_SUCCESS,
  RATE_ARTICLE_FAILURE,
  FETCH_ARTICLE_HYPE_SUCCESS
} from '../actions/actionTypes';

const initialArticleState = {
  article: {},
  error: false,
  loading: false,
  totalArticleHype: 0,
  userCurrentHype: 0,
  updateHypeError: false
};

const singleArticleReducer = (state = initialArticleState, action) => {
  switch (action.type) {
    case FETCH_ARTICLE_STARTED:
      return {
        ...state, loading: true
      };
    case FETCH_ARTICLE_SUCCEEDED:
      return {
        ...state,
        loading: false,
        article: action.payload.article,
        totalArticleHype: action.payload.article.data.ratings
      };
    case FETCH_ARTICLE_FAILED:
      return {
        ...state,
        error: true,
        loading: false
      };
    case FETCH_ARTICLE_HYPE_SUCCESS:
      return {
        ...state,
        totalArticleHype: action.payload.totalRating
      };
    case RATE_ARTICLE_SUCCESS:
      return {
        ...state,
        userCurrentHype: action.rating,
      };
    case RATE_ARTICLE_FAILURE:
      return {
        ...state,
        updateHypeError: true,
      };
    default:
      return state;
  }
};

export default singleArticleReducer;

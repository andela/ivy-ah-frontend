import {
  FETCH_ARTICLE_STARTED,
  FETCH_ARTICLE_SUCCEEDED,
  FETCH_ARTICLE_FAILED
} from '../actions/actionTypes';

const initialArticleState = {
  article: {},
  error: false,
  loading: false
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
        article: action.payload.article
      };
    case FETCH_ARTICLE_FAILED:
      return {
        ...state,
        error: true,
        loading: false
      };
    default:
      return state;
  }
};

export default singleArticleReducer;

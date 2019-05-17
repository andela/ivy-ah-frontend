import { ADD_ARTICLE_BEGIN, ADD_ARTICLE_SUCCESS, ADD_ARTICLE_FAILURE } from '../actions/actionTypes';

const initialArticleState = {
  createdArticle: {},
  error: [],
  loading: false
};

export default (state = initialArticleState, { type, payload }) => {
  switch (type) {
    case ADD_ARTICLE_BEGIN:
      return {
        ...state,
        loading: true,
        error: [],
        createdArticle: {}
      };
    case ADD_ARTICLE_SUCCESS:
      return {
        ...state,
        loading: false,
        createdArticle: payload,
        error: []
      };
    case ADD_ARTICLE_FAILURE:
      return {
        ...state,
        loading: false,
        error: state.error.concat(payload),
        createdArticle: {}
      };
    default:
      return state;
  }
};

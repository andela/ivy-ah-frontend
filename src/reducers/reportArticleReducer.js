import { REPORT_ARTICLE_STARTED, REPORT_ARTICLE_SUCCEEDED, REPORT_ARTICLE_FAILED } from '../actions/actionTypes';

const initialArticleState = {
  reportedArticle: {},
  error: [],
  loading: false
};

export default (state = initialArticleState, { type, payload }) => {
  switch (type) {
    case REPORT_ARTICLE_STARTED:
      return {
        ...state,
        loading: true,
        error: [],
        reportedArticle: {}
      };
    case REPORT_ARTICLE_SUCCEEDED:
      return {
        ...state,
        loading: false,
        reportedArticle: payload,
        error: []
      };
    case REPORT_ARTICLE_FAILED:
      return {
        ...state,
        loading: false,
        error: state.error.concat(payload),
        reportedArticle: {}
      };
    default:
      return state;
  }
};

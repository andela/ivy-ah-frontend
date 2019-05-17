import * as actions from '../actions/actionTypes';

const initialArticleState = {
  articles: [],
  newArticles: [],
  currentPage: 0,
  numberOfPages: 1,
  isLoading: false,
  error: false,
};

export default function articleReducer(state = initialArticleState, action) {
  switch (action.type) {
    case actions.FETCH_ALL_ARTICLES_STARTED: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case actions.FETCH_ALL_ARTICLES_SUCCEEDED: {
      return {
        ...state,
        newArticles: action.payload.articles.articles,
        articles: state.articles.concat(action.payload.articles.articles),
        currentPage: Number(action.payload.articles.currentPage),
        numberOfPages: Number(action.payload.articles.numberOfPages),
        isLoading: false
      };
    }
    case actions.FETCH_ALL_ARTICLES_FAILED: {
      return {
        ...state,
        error: true
      };
    }
    default:
      return state;
  }
}

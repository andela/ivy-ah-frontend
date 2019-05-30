import * as actions from '../actions/actionTypes';

const initialArticleState = {
  createdArticle: {},
  error: [],
  edit: {},
  loading: false,
  updateLoading: false,
  editorOpen: false,
};

export default (state = initialArticleState, { type, payload }) => {
  switch (type) {
    case actions.ADD_ARTICLE_BEGIN:
      return {
        ...state,
        loading: true,
        error: [],
        createdArticle: {}
      };
    case actions.ADD_ARTICLE_SUCCESS:
      return {
        ...state,
        loading: false,
        createdArticle: payload,
        error: []
      };
    case actions.ADD_ARTICLE_FAILURE:
      return {
        ...state,
        loading: false,
        error: state.error.concat(payload),
        createdArticle: {}
      };
    case actions.UPDATE_ARTICLE_BEGIN:
      return {
        ...state,
        updateLoading: true,
      };
    case actions.UPDATE_ARTICLE_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        createdArticle: payload,
      };
    case actions.UPDATE_ARTICLE_FAILED:
      return {
        ...state,
        updateLoading: false,
      };
    case actions.EDIT_ARTICLE:
      return {
        ...state,
        edit: payload,
        createdArticle: {
          article: { id: payload.id }
        },
        editorOpen: true,
      };
    case actions.CLEAR_ARTICLE_EDITOR:
      return {
        ...initialArticleState,
        editorOpen: true,
      };
    case actions.CHANGE_EDITOR_STATUS:
      return {
        ...state,
        editorOpen: false,
      };
    default:
      return state;
  }
};

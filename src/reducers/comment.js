import {
  POST_COMMENT_STARTED,
  POST_COMMENT_SUCCEEDED,
  POST_COMMENT_FAILED,
  FETCH_COMMENTS_SUCCEEDED,
} from '../actions/actionTypes';

const initialCommentState = {
  comment: {},
  articleId: '',
  error: false,
  loading: false,
  comments: []
};

const commentReducer = (state = initialCommentState, action) => {
  switch (action.type) {
    case POST_COMMENT_STARTED:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case POST_COMMENT_SUCCEEDED:
      return {
        ...state,
        comments: [action.payload.comment].concat(state.comments),
        loading: false,
        error: false,
      };
    case POST_COMMENT_FAILED:
      return {
        ...state,
        loading: false,
        error: true
      };
    case FETCH_COMMENTS_SUCCEEDED:
      return {
        ...state,
        articleId: action.payload.id,
        comments: action.payload.comments,
        error: false,
      };
    default:
      return state;
  }
};

export default commentReducer;

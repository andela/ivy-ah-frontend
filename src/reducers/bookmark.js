import * as actions from '../actions/actionTypes';

const initialBookmarkState = {
  bookmarks: [],
  error: false,
  target: false,
  bookmarked: null
};

export default (state = initialBookmarkState, action) => {
  switch (action.type) {
    case actions.EDIT_BOOKMARKS_STARTED: {
      return {
        ...state,
        target: action.payload.articleId,
        bookmarked: action.payload.bookmarked,
        error: false
      };
    }
    case actions.FETCH_BOOKMARKS_SUCCEEDED: {
      return {
        ...state,
        bookmarks: action.payload.bookmarks.bookmarks
      };
    }
    case actions.ADD_BOOKMARKS_SUCCEEDED: {
      return {
        ...state,
        bookmarks: state.bookmarks.concat(action.payload.bookmarks),
        target: action.payload.bookmarks.article,
        bookmarked: null,
        error: false
      };
    }
    case actions.REMOVE_BOOKMARKS_SUCCEEDED: {
      return {
        ...state,
        bookmarks: state.bookmarks
          .filter(bookmark => bookmark.article !== action.payload.bookmarks),
        target: action.payload.bookmarks,
        bookmarked: null,
        error: false
      };
    }
    case actions.EDIT_BOOKMARKS_FAILED: {
      return {
        ...state,
        error: true,
        target: action.payload,
        bookmarked: null
      };
    }
    default:
      return state;
  }
};

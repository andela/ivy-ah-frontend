import * as api from '../api';
import * as actions from './actionTypes';


export const editBookmarkStarted = (articleId, bookmarked) => ({
  type: actions.EDIT_BOOKMARKS_STARTED,
  payload: { articleId, bookmarked }
});

export const editBookmarksFailed = articleId => ({
  type: actions.EDIT_BOOKMARKS_FAILED,
  payload: articleId
});

export const fetchBookmarksSucceeded = bookmarks => ({
  type: actions.FETCH_BOOKMARKS_SUCCEEDED,
  payload: { bookmarks }
});

export const fetchBookmarks = () => dispatch => api.fetchBookmarks().then((res) => {
  dispatch(fetchBookmarksSucceeded(res.data));
});

export const addBookmarksSucceeded = bookmarks => ({
  type: actions.ADD_BOOKMARKS_SUCCEEDED,
  payload: { bookmarks }
});

export const addBookmarks = articleId => (dispatch) => {
  dispatch(editBookmarkStarted(articleId, true));
  return api.addBookmark(articleId).then((res) => {
    dispatch(addBookmarksSucceeded(res.data.bookmarks));
  }).catch(() => {
    dispatch(editBookmarksFailed(articleId));
  });
};

export const removeBookmarksSucceeded = bookmarks => ({
  type: actions.REMOVE_BOOKMARKS_SUCCEEDED,
  payload: { bookmarks }
});

export const removeBookmarks = articleId => (dispatch) => {
  dispatch(editBookmarkStarted(articleId, false));
  return api.removeBookmark(articleId).then(() => {
    dispatch(removeBookmarksSucceeded(articleId));
  }).catch(() => {
    dispatch(editBookmarksFailed(articleId));
  });
};

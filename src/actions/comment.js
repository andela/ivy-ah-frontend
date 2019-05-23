import * as api from '../api';
import * as actions from './actionTypes';

export const postCommentStarted = () => ({
  type: actions.POST_COMMENT_STARTED
});

export const postCommentSucceeded = comment => ({
  type: actions.POST_COMMENT_SUCCEEDED,
  payload: { comment }
});

export const postCommentFailed = error => ({
  type: actions.POST_COMMENT_FAILED,
  payload: { error }
});

export const postComment = (articleId, body) => (dispatch) => {
  dispatch(postCommentStarted());
  return api.postComment(articleId, body)
    .then((res) => {
      dispatch(postCommentSucceeded(res.data.comment));
    })
    .catch((error) => {
      dispatch(postCommentFailed(error));
    });
};

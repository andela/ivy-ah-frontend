import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { postComment } from '../actions/comment';
import Comment from '../components/comments/Comment';
import { toggleModal } from '../actions/auth';
import Highlight from '../components/comments/Highlight';

export const CommentContainer = ({
  articleId, loading, comments, postCommentHandler, error, isAuth, requestAuth, match
}) => match.params.id === articleId && (
  <div>
    <Comment
      postCommentHandler={postCommentHandler}
      articleId={articleId}
      loading={loading}
      error={error}
      comments={comments}
      isAuth={isAuth}
      requestAuth={requestAuth}
    />
    <Highlight
      postCommentHandler={postCommentHandler}
      articleId={articleId}
      loading={loading}
      error={error}
      isAuth={isAuth}
      requestAuth={requestAuth}
    />
  </div>
);

const mapStateToProps = ({
  comment: {
    error, loading, articleId, comments
  },
  auth: { token }
}) => ({
  loading,
  error,
  articleId,
  comments,
  isAuth: !!token
});

const mapDispatchToProps = dispatch => ({
  postCommentHandler: (articleId, body, highlightedText, textPosition) =>
    dispatch(postComment(articleId, body, highlightedText, textPosition)),
  requestAuth: () => dispatch(toggleModal('sign in'))
});

CommentContainer.propTypes = {
  articleId: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  postCommentHandler: PropTypes.func.isRequired,
  requestAuth: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
  isAuth: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentContainer);

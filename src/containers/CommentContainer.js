import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { postComment } from '../actions/comment';
import Comment from '../components/comments/Comment';
import { toggleModal } from '../actions/auth';

export const CommentContainer = ({
  articleId, loading, comments, postCommentHandler, error, isAuth, requestAuth
}) => (
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
  </div>
);

const mapStateToProps = ({
  comment: {
    error, loading, articleId, comments
  },
  auth: {
    token
  }
}) => ({
  loading, error, articleId, comments, isAuth: !!token
});

const mapDispatchToProps = dispatch => ({
  postCommentHandler: (articleId, body) => dispatch(postComment(articleId, body)),
  requestAuth: () => dispatch(toggleModal('sign in')),
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

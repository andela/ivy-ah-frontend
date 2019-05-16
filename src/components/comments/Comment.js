import React from 'react';
import PropTypes from 'prop-types';
import CommentInput from './CommentInput';
import CommentBox from './CommentBox';
import commentIcon from './commentIcon.svg';

const Comment = ({
  postCommentHandler, articleId, comments, loading, error, isAuth, requestAuth
}) => articleId ? (
  <div className="comment-container">
    <div className="comment-count-container">
      <span className="comment-count-icon">
        <img src={commentIcon} alt="comment icon" />
      </span>
      <span className="comment-count-text">
        {comments.length === 0 ? 'There are no comments for this article yet. Be the first to comment' : `${comments.length} comments`}
      </span>
    </div>
    <CommentInput
      postCommentHandler={postCommentHandler}
      articleId={articleId}
      loading={loading}
      error={error}
      isAuth={isAuth}
      requestAuth={requestAuth}
    />
    <CommentBox
      comments={comments}
      loading={loading}
      articleId={articleId}
      error={error}
    />
  </div>
) : null;

Comment.propTypes = {
  articleId: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  postCommentHandler: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
  isAuth: PropTypes.bool.isRequired,
  requestAuth: PropTypes.func.isRequired,
};

export default Comment;

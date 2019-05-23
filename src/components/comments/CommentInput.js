import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import autosize from 'autosize';

const CommentInput = ({
  postCommentHandler, articleId, loading, error, isAuth, requestAuth
}) => {
  const [inputValue, updateInput] = useState('');
  const [isSubmitted, setSubmitted] = useState(false);

  let inputRef;

  const inputChange = ({ target }) => {
    updateInput(target.value);
  };

  useEffect(() => {
    if (inputRef && !loading && isSubmitted) {
      updateInput(error ? inputValue : '');
      setSubmitted(false);
    }
    if (inputRef) {
      inputRef.value = inputValue;
      autosize(inputRef);
      if (!inputValue) {
        inputRef.style.removeProperty('height');
      }
    }
  });

  const handlePost = () => {
    if (!isAuth) {
      requestAuth();
      return;
    }
    setSubmitted(true);
    postCommentHandler(articleId, inputValue);
  };

  return (
    <div className="comment-input-container">
      <textarea
        ref={(ref) => { inputRef = ref; }}
        onInput={inputChange}
        rows="1"
        className="comment-input-main"
        placeholder="Add a comment"
      />
      <button
        type="button"
        className="comment-post-button"
        disabled={inputValue === ''}
        onClick={handlePost}
      >
        post comment
      </button>
      {loading
        ? (
          <div className="comment-input-loader">
            <div className="comment ui active centered inline loader" />
          </div>
        ) : null}
    </div>
  );
};

CommentInput.propTypes = {
  postCommentHandler: PropTypes.func.isRequired,
  articleId: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  isAuth: PropTypes.bool.isRequired,
  requestAuth: PropTypes.func.isRequired,
};

export default CommentInput;

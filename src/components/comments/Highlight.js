import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CommentInput from './CommentInput';

const Highlight = ({
  postCommentHandler, articleId, loading, error, isAuth, requestAuth,
}) => {
  const [highlightMenu, setHighlightMenu] = useState(false);
  const initial = { x: 0, y: 0, width: 0 };
  const [position, setPosition] = useState(initial);
  const [highlightedText, setHighlightedText] = useState('');
  const [openCommentInput, setOpenCommentInput] = useState(false);

  const textPosition = 5;
  const hideHighlightMenu = () => {
    setHighlightMenu(false);
  };

  const showHighlightMenu = () => {
    setHighlightMenu(true);
  };

  const updateHighlightedText = (text) => {
    setHighlightedText(highlightedText + text);
  };

  const closeModal = () => {
    setOpenCommentInput(false);
  };
  const openModal = () => {
    setOpenCommentInput(true);
  };

  const checkHighlight = () => {
    const selection = window.getSelection();
    const text = selection.toString().trim();
    if (!text) {
      return hideHighlightMenu();
    }
    const selectionRange = selection.getRangeAt(0);
    const startNode = selectionRange.startContainer.parentNode;
    const endNode = selectionRange.endContainer.parentNode;
    const articleBody = document.querySelector('.main-editor');
    if (!articleBody.contains(startNode) || !articleBody.contains(startNode)) {
      return hideHighlightMenu();
    }
    if (!startNode.isSameNode(endNode)) {
      return hideHighlightMenu();
    }
    const { x, y, width } = selectionRange.getBoundingClientRect();
    updateHighlightedText(text);
    showHighlightMenu();
    setPosition({
      x: ((width / 2) + x),
      y: y + (window.scrollY - 10),
      width
    });
  };
  useEffect(() => {
    window.addEventListener('mouseup', checkHighlight);
    return () => {
      window.removeEventListener('mouseup', checkHighlight);
    };
  }, []);
  return (
    <div>
      {highlightMenu && (
        <div
          className="highlight"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`
          }}
        >
          <span
            className="item"
            onMouseDown={(e) => {
              e.preventDefault();
            }}
            onClick={() => openModal()}
          >
            comment
          </span>
        </div>
      )}
      {openCommentInput && (
        <div
          className="comment-modal"
          style={{
            right: '50px',
            top: `${position.y}px`,
          }}
        >
          <CommentInput
            textPosition={textPosition}
            highlight={highlightedText}
            postCommentHandler={postCommentHandler}
            articleId={articleId}
            loading={loading}
            error={error}
            isAuth={isAuth}
            requestAuth={requestAuth}
          />
          <span
            className="close-btn"
            onClick={() => closeModal()}
          >
              X
          </span>
        </div>
      )}
    </div>
  );
};

Highlight.propTypes = {
  postCommentHandler: PropTypes.func.isRequired,
  articleId: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  isAuth: PropTypes.bool.isRequired,
  requestAuth: PropTypes.func.isRequired,
};

export default Highlight;

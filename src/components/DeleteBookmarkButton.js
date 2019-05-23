import React from 'react';
import PropTypes from 'prop-types';

const DeleteBookmarkButton = ({ bookmarkId, deleteBookmark }) => (
  <div className="article-hypes" onClick={e => deleteBookmark(bookmarkId, e)}>
    <span style={{ color: 'blue', cursor: 'pointer' }}>
      remove article
    </span>
  </div>
);

DeleteBookmarkButton.propTypes = {
  bookmarkId: PropTypes.string,
  deleteBookmark: PropTypes.func.isRequired,
};

DeleteBookmarkButton.defaultProps = {
  bookmarkId: '',
};

export default DeleteBookmarkButton;

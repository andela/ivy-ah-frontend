import React from 'react';
import PropTypes from 'prop-types';

const Bookmark = ({ bookmark, onClickBookmark }) => (
  <button type="button" className="bookmark-button" onClick={e => onClickBookmark(!bookmark, e)}>
    <i className={bookmark ? 'fas fa-bookmark' : 'far fa-bookmark'} />
  </button>
);

Bookmark.propTypes = {
  bookmark: PropTypes.bool.isRequired,
  onClickBookmark: PropTypes.func.isRequired,
};

export default Bookmark;

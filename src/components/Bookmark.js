import React from 'react';
import PropTypes from 'prop-types';

const Bookmark = ({ bookmark, onClickBookmark }) => (
  <button type="button" className="bookmark-button" onClick={() => onClickBookmark(!bookmark)}>
    <i className={bookmark ? 'bookmark icon' : 'bookmark outline icon'} />
  </button>
);

Bookmark.propTypes = {
  bookmark: PropTypes.bool.isRequired,
  onClickBookmark: PropTypes.func.isRequired,
};

export default Bookmark;

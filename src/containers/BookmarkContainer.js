import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addBookmarks, removeBookmarks } from '../actions/bookmark';
import Bookmark from '../components/Bookmark';

const BookmarkContainer = ({
  bookmarks, bookmarked, error, articleId, dispatch
}) => {
  let awaitingBooked;
  let booked;

  if ((bookmarked === true || bookmarked === false) && !error) {
    awaitingBooked = true;
    booked = bookmarked;
  } else {
    booked = bookmarks.some(bookmark => bookmark.article === articleId);
  }

  const onClickBookmark = (bookmark, e) => {
    e.stopPropagation();
    if (awaitingBooked) { return; }
    if (bookmark) {
      dispatch(addBookmarks(articleId));
    } else {
      dispatch(removeBookmarks(articleId));
    }
  };

  return (
    <div>
      <Bookmark
        bookmark={booked}
        onClickBookmark={onClickBookmark}
      />
    </div>
  );
};

BookmarkContainer.propTypes = {
  bookmarks: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])).isRequired,
  dispatch: PropTypes.func.isRequired,
  articleId: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
  bookmarked: PropTypes.bool,
};

BookmarkContainer.defaultProps = {
  bookmarked: null
};

const mapStateToProps = ({ bookmarkReducer }, { articleId }) => ({
  ...bookmarkReducer,
  articleId
});

export default connect(mapStateToProps, null, null, {
  areStatePropsEqual: ({ target, articleId }) => !(!target || target === articleId)
})(BookmarkContainer);

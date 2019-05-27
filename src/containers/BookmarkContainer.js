import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addBookmarks, removeBookmarks } from '../actions/bookmark';
import Bookmark from '../components/Bookmark';
import { toggleModal } from '../actions/auth';

const BookmarkContainer = ({
  bookmarks, bookmarked, error, articleId, dispatch, isAuth
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
    if (!isAuth) {
      return dispatch(toggleModal('sign in'));
    }
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
  isAuth: PropTypes.bool.isRequired,
};

BookmarkContainer.defaultProps = {
  bookmarked: null
};

const mapStateToProps = ({ bookmarkReducer, auth: { token } }, { articleId }) => ({
  ...bookmarkReducer,
  articleId,
  isAuth: !!token,
});

export default connect(mapStateToProps, null, null, {
  areStatePropsEqual: ({ target, articleId }) => !(!target || target === articleId)
})(BookmarkContainer);

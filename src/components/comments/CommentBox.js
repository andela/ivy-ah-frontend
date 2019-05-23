import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import timeConverter from '../../helpers/timeConverter';

const CommentBox = ({ comments }) => {
  const [count, setCount] = useState(4);

  const sortFn = (comment1, comment2) => {
    const date1 = new Date(comment1.createdAt);
    const date2 = new Date(comment2.createdAt);
    if (date1 > date2) { return -1; }
    if (date1 < date2) { return 1; }
    return 0;
  };

  const sortedComments = comments.sort(sortFn);

  const onButtonClick = (e) => {
    e.preventDefault();
    setCount(count + 4);
  };

  let commentRef;

  const setCommentRef = (ref, index) => {
    if ((count !== 4) && index === count - 5) {
      commentRef = ref;
    }
  };

  useEffect(() => {
    if (commentRef) {
      commentRef.scrollIntoView({
        behavior: 'smooth', block: 'start', inline: 'nearest'
      });
    }
  }, [count]);

  return (
    <div>
      <div className="comment-container">
        {comments.length > 0
          && (sortedComments.slice(0, count).map((comment, index) => (
            <div
              ref={ref => setCommentRef(ref, index)}
              className="single-comment-container"
              key={comment.id}
            >
              <div className="comment-details">
                <Link to={`/profile/${comment.user.id}`}>
                  <img
                    alt="profile"
                    className="comment-author-pic"
                    src={comment.user.image
                    || `https://ui-avatars.com/api/?bold=true&background=3157BE&color=fff&name=+${comment.user.firstname}+${comment.user.lastname}`}
                  />
                </Link>
                <div className="comment-info">
                  <p className="comment-author-name text">{`${comment.user.firstname} ${comment.user.lastname}`}</p>
                  <p className="comment-createdAt text">{timeConverter(comment.createdAt)}</p>
                </div>
              </div>
              <p>{comment.body}</p>
            </div>
          )))
        }
      </div>
      {
        count + 1 < comments.length ? (
          <div className="more-comments-btn-container">
            <button
              className="more-comments-btn"
              type="submit"
              onClick={onButtonClick}
              onSubmit={onButtonClick}
            >
            Show more comments
            </button>
          </div>
        ) : null
      }
    </div>
  );
};

CommentBox.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default CommentBox;

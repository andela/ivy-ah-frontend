import React from 'react';
import PropTypes from 'prop-types';

const FollowSwitch = ({
  onClickFollow, isFollowing, userId, authorId
}) => (
  userId !== authorId
    && (
      <div>
        <button type="button" className="ui button follow" onClick={() => onClickFollow(isFollowing)}>{isFollowing ? 'Unfollow' : 'Follow'}</button>
      </div>
    )
);

FollowSwitch.propTypes = {
  onClickFollow: PropTypes.func.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
  authorId: PropTypes.string.isRequired
};

export default FollowSwitch;

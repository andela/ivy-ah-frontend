import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleModal } from '../actions/auth';
import Follow from '../components/Follow';
import { followUser, userFollowing, unFollowUser } from '../actions/follow';

export const FollowContainer = ({
  dispatch, userId, isFollowing, authorId
}) => {
  useEffect(() => {
    dispatch(userFollowing(userId));
  }, [userId]);

  const onClickFollow = (followed) => {
    if (!userId) {
      return dispatch(toggleModal('sign in'));
    }
    return followed ? dispatch(unFollowUser(authorId)) : dispatch(followUser(authorId));
  };


  return (
    <Follow
      onClickFollow={onClickFollow}
      isFollowing={isFollowing}
      userId={userId}
      authorId={authorId}
    />
  );
};

FollowContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
  authorId: PropTypes.string.isRequired
};

const mapStateToProps = (state, { authorId }) => {
  const { following } = state.follow;
  const { userId } = state.auth;
  const followingTheseAuthors = following.map(user => user.id);
  let { isFollowing } = state.follow;

  if (followingTheseAuthors.includes(authorId)) {
    isFollowing = true;
  }

  return {
    authorId,
    isFollowing,
    following: followingTheseAuthors,
    userId
  };
};

export default connect(mapStateToProps)(FollowContainer);

import React from 'react';
import ProfileFollowingCard from './ProfileFollowingCard';

const ProfileFollowingList = ({ followers }) => {
  const userFollowers = followers.map(follower => (
    <ProfileFollowingCard follower={follower} />
  ));
  return userFollowers;
};

export default ProfileFollowingList;

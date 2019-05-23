import React from 'react';
import ProfileBookmarkCard from './ProfileBookmarkCard';

const ProfileBookmarkCardList = ({ articles }) => {
  const userArticles = articles
    ? articles.map(article => (
      <ProfileBookmarkCard article={article} />
    ))
    : null;

  return userArticles;
};

export default ProfileBookmarkCardList;

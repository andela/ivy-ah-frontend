import React from 'react';
import ProfileArticleCard from './ProfileArticleCard';

const ProfileArticleCardList = ({ articles }) => {
  const userArticles = articles.articles
    ? articles.articles.map(article => (
      <ProfileArticleCard article={article} />
    ))
    : null;

  return userArticles;
};

export default ProfileArticleCardList;

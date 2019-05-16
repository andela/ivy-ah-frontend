import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProfileArticleCardList from '../components/ProfileArticleCardList';
import ProfileArticleCard from '../components/ProfileArticleCard';
import ProfileFollowingList from '../components/ProfileFollowingList';

export const profileRedirect = ({ match }) => (
  <Redirect to={`/profile/${match.params.id}`} />
);

export const contentHandler = (loadedContentType, profileContent) => {
  let noOfFollowers;
  let lastTwoFollowers;
  let latestContent;
  let content;
  switch (loadedContentType) {
    case 'articles':
      if (profileContent.articles.length !== 0) {
        latestContent = (
          <ProfileArticleCard article={profileContent.articles.shift()} />
        );
        content = <ProfileArticleCardList articles={profileContent} />;
      } else {
        latestContent = '0 articles';
      }
      return [latestContent, content];
    case 'followers':
      noOfFollowers = profileContent.length;
      lastTwoFollowers = profileContent.splice(0, 3);
      latestContent = (
        <div>
          <p>{`${noOfFollowers} followers`}</p>
          <ProfileFollowingList followers={lastTwoFollowers} />
        </div>
      );
      content = <ProfileFollowingList followers={profileContent} />;
      return [latestContent, content];
    default:
      content = profileContent;
  }
};

profileRedirect.propTypes = {
  match: PropTypes.shape({})
};

profileRedirect.defaultProps = {
  match: {}
};

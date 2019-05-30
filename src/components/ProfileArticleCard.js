import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Image, Grid } from 'semantic-ui-react';
import EditBtns from '../containers/ProfileArticleBtns';

const ProfileArticleCard = ({ article, signedInUser }) => (
  <Grid.Column>
    <Link href="article" to={`/article/${article.id}`}>
      <div
        style={{ display: 'block' }}
        className="profile-article"
      >
        <Card.Group>
          <div className="profile-article-wrapper">
            <Image
              className="profile-article-user-image"
              src={
                article.user.image
                  ? article.user.image
                  : `https://ui-avatars.com/api/?bold=true&background=3157BE&color=fff&name=+${
                    article.user.firstname
                  }+${article.user.lastname}`
              }
              avatar
              floated="left"
            />
            <p className="profile-article-user-name">
              {`${article.user.firstname} ${article.user.lastname}`}
            </p>
            <p className="profile-article-readtime">
              {' '}
              {`${Math.floor(parseInt(article.readTime, 10) / 60)
                || '< 1'} min read`}
              {' '}
              {`${!article.isPublished ? '| Draft' : ''}`}
            </p>
          </div>
          <EditBtns article={article} signedInUser={signedInUser} />
          <div
            style={{
              overflow: 'hidden',
              minWidth: '100%',
              height: '10rem',
              backgroundImage: `url(${article.bannerImage})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            `
          </div>
          <div className="w-100">
            <div className="detail-container">
              <p style={{ color: 'black' }}>{article.title}</p>
              <div className="article-hypes">
                <span style={{ color: 'blue' }}>
                  {`${article.ratings} hypes`}
                </span>
              </div>
            </div>
          </div>
        </Card.Group>
      </div>
    </Link>
  </Grid.Column>
);

ProfileArticleCard.propTypes = {
  article: PropTypes.shape({}),
  signedInUser: PropTypes.string.isRequired
};

ProfileArticleCard.defaultProps = {
  article: {}
};

export default ProfileArticleCard;

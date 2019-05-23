import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Image, Grid } from 'semantic-ui-react';
import DeleteBookmarkButton from './DeleteBookmarkButton';
import { removeBookmarks } from '../actions/bookmark';


const ProfileBookmarkCard = ({ article, deleteBookmark }) => {
  const deleteBookmarkHandler = (id, e) => {
    e.preventDefault();
    deleteBookmark(id);
  };

  return (
    <Grid.Column>
      <Link href="article" to={`/article/${article.article}`} replace>
        <div
          style={{ display: 'block' }}
          className="profile-article"
        >
          <Card.Group>
            <div className="profile-article-wrapper">
              <Image
                className="profile-article-user-image"
                src={
                  article.articleDetail.user.image
                    ? article.articleDetail.user.image
                    : `https://ui-avatars.com/api/?bold=true&background=3157BE&color=fff&name=+${
                      article.articleDetail.user.lastname
                    }+${article.articleDetail.user.firstname}`
              }
                avatar
                floated="left"
              />
              <span className="profile-article-user-name">
                {`${article.articleDetail.user.firstname} ${article.articleDetail.user.lastname}`}
              </span>
              <p className="profile-article-readtime">
                {' '}
                {`${Math.floor(parseInt(article.articleDetail.readTime, 10) / 60)
                || '< 1'} min read`}
              </p>
            </div>
            <div
              style={{
                overflow: 'hidden',
                minWidth: '100%',
                height: '10rem',
                backgroundImage: `url(${article.articleDetail.bannerImage})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
            `
            </div>
            <div className="w-100">
              <div className="detail-container">
                <p style={{ color: 'black' }}>{article.articleDetail.title}</p>
                <DeleteBookmarkButton
                  bookmarkId={article.articleDetail.id}
                  deleteBookmark={deleteBookmarkHandler}
                />
              </div>
            </div>
          </Card.Group>
        </div>
      </Link>
    </Grid.Column>
  );
};

const mapStateToProps = state => ({
  vvv: state.bookmarkReducer.bookmarks
});

const mapDispatchToProps = dispatch => ({
  deleteBookmark: articleId => dispatch(removeBookmarks(articleId, true)),
});

ProfileBookmarkCard.propTypes = {
  article: PropTypes.shape({}),
  deleteBookmark: PropTypes.func.isRequired
};

ProfileBookmarkCard.defaultProps = {
  article: {}
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileBookmarkCard);

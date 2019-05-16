import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Grid, Container } from 'semantic-ui-react';
import ProfileUserCard from '../components/ProfileUserCard';
import ProfilePlaceholder from '../components/ProfilePlaceholder';
import ProfileTab from '../components/ProfileTab';
import { contentHandler } from '../helpers/profileHelper';
import {
  getProfile,
  getUserArticle,
  getUserFollowers
} from '../actions/profileActions';

const Profile = ({
  match,
  getUserProfile,
  profileContent,
  loadingContent,
  user,
  loadingProfile,
  signedInUser,
  didLoadingFail,
  getArticles,
  getFollowers,
  loadedContentType
}) => {
  if (didLoadingFail) {
    return <Redirect to="/notfound" />;
  }

  useEffect(() => {
    getUserProfile(match.params.id);
  }, []);

  useEffect(() => {
    getArticles(match.params.id);
  }, []);

  const tabHandler = (event) => {
    if (event.target.text === 'followers') {
      return getFollowers(match.params.id);
    }
    if (event.target.text === 'articles') {
      return getArticles(match.params.id);
    }
  };

  let content, latestContent;
  if (profileContent) {
    const formatedContent = contentHandler(loadedContentType, profileContent);
    [latestContent, content] = formatedContent;
  }

  return (
    <Container>
      {loadingProfile ? (
        <ProfilePlaceholder />
      ) : (
        <div>
          <Grid stackable>
            <Grid.Column width={6}>
              <ProfileUserCard
                signedInUser={signedInUser}
                profile={user}
                loadingProfile={loadingProfile}
              />
            </Grid.Column>
            <Grid.Column width={10}>
              <div className="tab-wrapper">
                <ProfileTab tabHandler={tabHandler} />
                {latestContent && !loadingContent ? (
                  latestContent
                ) : (
                  <ProfilePlaceholder />
                )}
              </div>
            </Grid.Column>
          </Grid>

          {loadingContent ? null : (
            <Grid stackable columns={2} padded>
              {content}
            </Grid>
          )}
        </div>
      )}
    </Container>
  );
};

const mapStateToProps = state => ({
  user: state.profile.user,
  loadingProfile: state.profile.loadingProfile,
  signedInUser: state.auth.userId,
  didLoadingFail: state.profile.loadingFailed,
  loadingContent: state.profile.loadingContent,
  profileContent: state.profile.profileContent,
  loadedContentType: state.profile.loadedContentType
});

const mapDispatchToProps = dispatch => ({
  getUserProfile: id => dispatch(getProfile(id)),
  getArticles: id => dispatch(getUserArticle(id)),
  getFollowers: id => dispatch(getUserFollowers(id))
});


Profile.propTypes = {
  match: PropTypes.shape({}),
  getUserProfile: PropTypes.func.isRequired,
  profileContent: PropTypes.oneOf([PropTypes.shape({}), [], null]).isRequired,
  loadingContent: PropTypes.bool.isRequired,
  signedInUser: PropTypes.string.isRequired,
  didLoadingFail: PropTypes.bool.isRequired,
  getArticles: PropTypes.func.isRequired,
  getFollowers: PropTypes.func.isRequired,
  loadedContentType: PropTypes.string.isRequired,
  user: PropTypes.shape({}),
  loadingProfile: PropTypes.bool.isRequired,

};

Profile.defaultProps = {
  match: {},
  user: {},
};

export default connect(mapStateToProps,
  mapDispatchToProps)(Profile);

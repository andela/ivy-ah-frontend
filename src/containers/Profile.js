import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Grid, Container } from 'semantic-ui-react';
import ProfileBioCard from 'Components/ProfileBioCard';
import ProfileUserCard from '../components/ProfileUserCard';
import ProfilePlaceholder from '../components/ProfilePlaceholder';
import ProfileTab from '../components/ProfileTab';
import ProfileArticleCardList from '../components/ProfileArticleCardList';
import ProfileArticleCard from '../components/ProfileArticleCard';
import ProfileBookmarkCardList from '../components/ProfileBookmarkCardList';
import ProfileBookmarkCard from '../components/ProfileBookmarkCard';
import ProfileFollowingList from '../components/ProfileFollowingList';
import { contentHandler } from '../helpers/profileHelper';
import { fetchBookmarks } from '../actions/bookmark';
import {
  getProfile,
  getUserArticle,
  getUserFollowers,
  getUserBio,
  editProfile,
  editProfileCancelled,
  saveEditedProfile,
  changeProfileImage,
  getProfileContentStart
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
  loadedContentType,
  getBio,
  editUserProfile,
  editingProfile,
  editUserProfileCancelled,
  saveProfile,
  savingProfile,
  changingProfileImage,
  changeImage,
  getBookmarks,
  getBookmarkStart
}) => {
  if (didLoadingFail) {
    return <Redirect to="/notfound" />;
  }

  useEffect(() => {
    getUserProfile(match.params.id);
  }, [match.params.id]);

  useEffect(() => {
    getArticles(match.params.id);
  }, [match.params.id]);

  const tabHandler = (event) => {
    if (event.target.text === 'followers') {
      return getFollowers(match.params.id);
    }
    if (event.target.text === 'articles') {
      return getArticles(match.params.id);
    }
    if (event.target.text === 'bio') {
      return getBio();
    }
    if (event.target.text === 'bookmarks') {
      getBookmarkStart();
      return getBookmarks();
    }
  };

  const profileEditHandler = () => editUserProfile();
  const profileEditCancelled = () => editUserProfileCancelled();

  const onImageChange = (event) => {
    const file = event.target.files[0];
    changeImage(file);
  };

  const savingEditedProfile = (profile) => {
    profile.image = user.image;
    saveProfile(profile);
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
                onEdit={profileEditHandler}
                editingProfile={editingProfile}
                onImageChange={onImageChange}
                changingProfileImage={changingProfileImage}
              />
            </Grid.Column>
            <Grid.Column width={10}>
              <div className="tab-wrapper">
                <ProfileTab tabHandler={tabHandler} />
                {loadingContent ? <ProfilePlaceholder /> : null}
                {loadedContentType === 'articles'
                && !loadingContent ? (!latestContent) ? <div> No articles yet </div> : (
                  <ProfileArticleCard article={latestContent} signedInUser={signedInUser} />
                ) : null}
                {loadedContentType === 'bio'
                && latestContent
                && !loadingContent
                && !savingProfile ? (
                  <ProfileBioCard
                    savingProfile={savingProfile}
                    changingProfileImage={changingProfileImage}
                    saveProfile={savingEditedProfile}
                    cancelledEditing={profileEditCancelled}
                    editingProfile={editingProfile}
                    bio={latestContent}
                  />
                  )
                  : null}
                {(savingProfile) ? <ProfilePlaceholder /> : null}
                {loadedContentType === 'followers'
                && latestContent
                && !loadingContent ? (
                  <div>
                    <div>
                      {profileContent.length}
                      {' '}
followers
                    </div>
                    <ProfileFollowingList followers={latestContent} />
                    {' '}
                  </div>
                  ) : null}
                {loadedContentType === 'bookmarks'
                && latestContent !== '0 articles'
                && !loadingContent ? (
                  <div>
                    <ProfileBookmarkCard article={latestContent} />
                  </div>
                  ) : null}
              </div>
            </Grid.Column>
          </Grid>
          {loadingContent ? null : (
            <Grid stackable columns={2} padded>
              {loadedContentType === 'articles' && content ? (
                <ProfileArticleCardList articles={content} />
              ) : null}
              {loadedContentType === 'followers' && content ? (
                <ProfileFollowingList followers={content} />
              ) : null}
              {loadedContentType === 'bookmarks' && content ? (
                <ProfileBookmarkCardList articles={content} />
              ) : null}
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
  loadedContentType: state.profile.loadedContentType,
  editingProfile: state.profile.editingProfile,
  savingProfile: state.profile.savingProfile,
  changingProfileImage: state.profile.changingProfileImage
});

const mapDispatchToProps = dispatch => ({
  getUserProfile: id => dispatch(getProfile(id)),
  getArticles: id => dispatch(getUserArticle(id)),
  getFollowers: id => dispatch(getUserFollowers(id)),
  getBio: () => dispatch(getUserBio()),
  editUserProfile: () => dispatch(editProfile()),
  editUserProfileCancelled: () => dispatch(editProfileCancelled()),
  saveProfile: profile => dispatch(saveEditedProfile(profile)),
  changeImage: profileImage => dispatch(changeProfileImage(profileImage)),
  getBookmarks: () => dispatch(fetchBookmarks(true)),
  getBookmarkStart: () => dispatch(getProfileContentStart())
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
  getBio: PropTypes.func.isRequired,
  editUserProfile: PropTypes.func.isRequired,
  editingProfile: PropTypes.bool.isRequired,
  editUserProfileCancelled: PropTypes.func.isRequired,
  saveProfile: PropTypes.func.isRequired,
  savingProfile: PropTypes.bool.isRequired,
  changingProfileImage: PropTypes.bool.isRequired,
  changeImage: PropTypes.func.isRequired,
  getBookmarks: PropTypes.func.isRequired,
  getBookmarkStart: PropTypes.func.isRequired
};

Profile.defaultProps = {
  match: {},
  user: {}
};

export default connect(mapStateToProps,
  mapDispatchToProps)(Profile);

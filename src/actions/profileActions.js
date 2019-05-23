import * as actions from './actionTypes';
import {
  fetchProfile,
  fetchUserArticle,
  fetchUserFollowers,
  updateProfile,
  uploadProfileImage
} from '../api';

export const getProfileStart = () => ({
  type: actions.GET_PROFILE_STARTED
});

export const getProfileSucceeded = profile => ({
  type: actions.GET_PROFILE_SUCCEEDED,
  profile
});

export const updateProfileSucceeded = profile => ({
  type: actions.EDIT_PROFILE_SUCCEEDED,
  profile
});

export const getProfileFailed = () => ({
  type: actions.GET_PROFILE_FAILED
});

export const getProfileContentStart = () => ({
  type: actions.GET_PROFILE_CONTENT_START
});

export const getProfileContentSucceeded = (content, contentType) => ({
  type: actions.GET_PROFILE_CONTENT_SUCCEEDED,
  content,
  contentType
});

export const updateProfileBookmark = articleId => ({
  type: actions.REMOVE_PROFILE_BOOKMARK,
  articleId
});

export const getProfileContentFailed = () => ({
  type: actions.GET_PROFILE_CONTENT_FAILED
});

export const getUserBio = () => ({
  type: actions.FETCH_USER_BIO
});

export const getUserArticle = userId => (dispatch) => {
  dispatch(getProfileContentStart());
  return fetchUserArticle(userId)
    .then((response) => {
      const userArticles = response.data;
      dispatch(getProfileContentSucceeded(userArticles, 'articles'));
    })
    .catch((err) => {
      dispatch(getProfileContentFailed());
    });
};

export const getUserFollowers = authorId => (dispatch) => {
  dispatch(getProfileContentStart());
  return fetchUserFollowers(authorId)
    .then((response) => {
      const userFollowers = response.data.data[0].followers;
      dispatch(getProfileContentSucceeded(userFollowers, 'followers'));
    })
    .catch((err) => {
      dispatch(getProfileContentFailed());
    });
};

export const getProfile = id => (dispatch) => {
  dispatch(getProfileStart());
  return fetchProfile(id)
    .then((response) => {
      const { profile } = response.data;
      dispatch(getProfileSucceeded(profile));
    })
    .catch((err) => {
      dispatch(getProfileFailed());
    });
};

export const editProfileStart = () => ({
  type: actions.EDIT_PROFILE_START
});

export const editProfile = () => (dispatch) => {
  dispatch(editProfileStart());
};

export const editProfileCancelled = () => ({
  type: actions.EDIT_PROFILE_CANCELLED
});

export const saveEditProfileStart = () => ({
  type: actions.SAVE_EDITED_PROFILE_START
});

export const editProfileFailed = () => ({
  type: actions.EDIT_PROFILE_FAILED
});
export const saveEditedProfile = profile => (dispatch) => {
  dispatch(saveEditProfileStart());
  const {
    email, firstname, lastname
  } = profile;
  const image = `${profile.image}`;
  const profileData = {
    bio: profile.bio,
    email,
    firstname,
    lastname,
    image
  };
  return updateProfile(profileData)
    .then((response) => {
      const { user } = response.data;
      dispatch(updateProfileSucceeded(user));
    })
    .catch((err) => {
      dispatch(editProfileFailed());
    });
};

export const changingProfileImageStart = () => ({
  type: actions.CHANGING_PROFILE_IMAGE_START
});

export const changingProfileImageSucceeded = imageUrl => ({
  type: actions.CHANGING_PROFILE_IMAGE_SUCCEEDED,
  imageUrl
});

export const changingProfileImageFailed = () => ({
  type: actions.CHANGING_PROFILE_IMAGE_FAILED
});

export const changeProfileImage = profileImage => (dispatch) => {
  dispatch(changingProfileImageStart());
  return uploadProfileImage(profileImage)
    .then((response) => {
      const imageUrl = response.data.url;
      dispatch(changingProfileImageSucceeded(imageUrl));
    })
    .catch((error) => {
      dispatch(changingProfileImageFailed());
    });
};

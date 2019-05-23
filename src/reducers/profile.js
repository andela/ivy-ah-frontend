import * as actions from '../actions/actionTypes';

const initialState = {
  user: {},
  profileContent: null,
  loadingProfile: false,
  loadingContent: false,
  loadedContentType: 'articles',
  loadingFailed: false,
  error: null,
  editingProfile: false,
  savingProfile: false,
  changingProfileImage: false,
  prevProfileImage: '',
};

const getProfileStarted = state => ({
  ...state,
  loadingProfile: true
});

const getProfileContentStart = state => ({
  ...state,
  loadingContent: true
});

const getProfileContentSucceeded = (state, action) => ({
  ...state,
  loadingContent: false,
  profileContent: action.content,
  loadedContentType: action.contentType
});

const getProfileFailed = state => ({
  ...state,
  loadingProfile: false,
  loadingFailed: true
});

const getProfileSucceeded = (state, action) => ({
  ...state,
  user: action.profile,
  loadingProfile: false,
  editingProfile: false,
  prevProfileImage: action.profile.image
});

const getProfileContentFailed = state => ({
  ...state,
  loadingContent: false,
  editingProfile: false
});

const setUserBio = state => ({
  ...state,
  profileContent: state.user,
  loadedContentType: 'bio',
  loadingContent: false,
  editingProfile: false
});

const editUserProfile = state => ({
  ...state,
  profileContent: state.user,
  loadedContentType: 'bio',
  editingProfile: true,
  loadingContent: false,
});

const editUserProfileCancelled = state => ({
  ...state,
  profileContent: state.user,
  loadedContentType: 'bio',
  editingProfile: false,
  loadingContent: false,
  user: { ...state.user, image: state.prevProfileImage },

});

const editUserProfileSucceeded = (state, action) => ({
  ...state,
  user: { ...state.user, ...action.profile },
  profileContent: { ...state.user, ...action.profile },
  loadingProfile: false,
  editingProfile: false,
  savingProfile: false
});

const editUserProfileStart = state => ({
  ...state,
  savingProfile: true
});

const changingProfileImageStart = state => ({
  ...state,
  changingProfileImage: true
});

const changingProfileImageSucceeded = (state, action) => ({
  ...state,
  user: { ...state.user, image: action.imageUrl },
  changingProfileImage: false,
});

const changingProfileImageFailed = state => ({
  ...state,
  changingProfileImage: false,
});


const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_PROFILE_STARTED:
      return getProfileStarted(state);
    case actions.GET_PROFILE_SUCCEEDED:
      return getProfileSucceeded(state, action);
    case actions.GET_PROFILE_FAILED:
      return getProfileFailed(state);
    case actions.GET_PROFILE_CONTENT_START:
      return getProfileContentStart(state);
    case actions.GET_PROFILE_CONTENT_SUCCEEDED:
      return getProfileContentSucceeded(state, action);
    case actions.GET_PROFILE_CONTENT_FAILED:
      return getProfileContentFailed(state, action);
    case actions.FETCH_USER_BIO:
      return setUserBio(state, action);
    case actions.EDIT_PROFILE_START:
      return editUserProfile(state);
    case actions.EDIT_PROFILE_CANCELLED:
      return editUserProfileCancelled(state);
    case actions.EDIT_PROFILE_SUCCEEDED:
      return editUserProfileSucceeded(state, action);
    case actions.SAVE_EDITED_PROFILE_START:
      return editUserProfileStart(state, action);
    case actions.CHANGING_PROFILE_IMAGE_START:
      return changingProfileImageStart(state);
    case actions.CHANGING_PROFILE_IMAGE_SUCCEEDED:
      return changingProfileImageSucceeded(state, action);
    case actions.CHANGING_PROFILE_IMAGE_FAILED:
      return changingProfileImageFailed(state);
    default:
      return state;
  }
};

export default profileReducer;

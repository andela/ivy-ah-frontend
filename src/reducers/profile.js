import * as actions from '../actions/actionTypes';

const initialState = {
  user: {},
  profileContent: null,
  loadingProfile: false,
  loadingContent: false,
  loadedContentType: 'articles',
  loadingFailed: false,
  error: null
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
  loadingProfile: false
});

const getProfileContentFailed = state => ({
  ...state,
  loadingContent: false
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
    default:
      return state;
  }
};

export default profileReducer;

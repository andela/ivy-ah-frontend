import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import { Grid } from 'semantic-ui-react';
import ProfileReducer from '../src/reducers/profile';
import * as api from '../src/api';
import ProfileArticleCard from '../src/components/ProfileArticleCard';
import ProfileFollowingCard from '../src/components/ProfileFollowingCard';
import ProfileUserCard from '../src/components/ProfileUserCard';
import * as actions from '../src/actions/profileActions';
import * as types from '../src/actions/actionTypes';

const mockStore = configureStore([thunk]);

describe('<ProfileArticleCard/>', () => {
  const article = {
    id: 'someid',
    user: {
      image: 'someUrl',
      firtname: 'someName',
      lastname: 'anothername'
    },
    readTime: '7 sec'
  };
  it('should return a <Grid.Column> </Grid.Column> component', () => {
    const wrapper = shallow(<ProfileArticleCard article={article} />);
    expect(wrapper.find(<Grid.Column />));
  });
});

describe('<ProfileFollowingCard/>', () => {
  const follower = {
    lastname: 'somelastname',
    firstname: 'anyname',
    image: 'someurl',
    id: 'someid'
  };
  it('should return a <Grid.Column> </Grid.Column> component', () => {
    const wrapper = shallow(<ProfileFollowingCard follower={follower} />);
    expect(wrapper.find(<Grid.Column />));
  });

  it('Should match the snapshot', () => {
    const tree = renderer
      .create(<MemoryRouter>
        <ProfileFollowingCard follower={follower} />
      </MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('<ProfileFollowingCard/>', () => {
  const profile = {
    lastname: 'somelastname',
    firstname: 'anyname',
    image: 'someurl',
    id: 'someid'
  };

  const signedInUser = 'someotherid';
  it('should return a <Grid.Column> </Grid.Column> component', () => {
    const wrapper = shallow(<ProfileUserCard profile={profile} signedInUser={signedInUser} />);
    expect(wrapper.find(<Grid.Column />));
  });
});

describe('Profile reducers', () => {
  const initialState = {
    user: { profile: {} },
    profileContent: null,
    loadingProfile: false,
    loadingContent: false,
    loadedContentType: 'articles',
    loadingFailed: false,
    error: null
  };

  it('should return the initial state', () => {
    expect(ProfileReducer(undefined, {})).toEqual({
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
    });
  });

  it('should change loadingProfile to true', () => {
    expect(ProfileReducer(initialState, actions.getProfileStart())).toEqual({
      ...initialState,
      loadingProfile: true
    });
  });

  it('should change loadingContent to false', () => {
    expect(ProfileReducer(initialState, actions.getProfileContentFailed())).toEqual({
      ...initialState,
      loadingContent: false,
      editingProfile: false
    });
  });

  it('should change loadingContent to true', () => {
    expect(ProfileReducer(initialState, actions.getProfileContentStart())).toEqual({
      ...initialState,
      loadingContent: true
    });
  });

  it('should load a new content', () => {
    expect(ProfileReducer(initialState, actions.getProfileContentSucceeded())).toEqual({
      ...initialState,
      loadingContent: false,
      profileContent: actions.content,
      loadedContentType: actions.contentType
    });
  });


  it('should change loadingFailed to true and loadingProfile to false', () => {
    expect(ProfileReducer(initialState, actions.getProfileFailed())).toEqual({
      ...initialState,
      loadingProfile: false,
      loadingFailed: true
    });
  });

  it('should set user bio', () => {
    expect(ProfileReducer(initialState, actions.getUserBio())).toEqual({
      ...initialState,
      loadedContentType: 'bio',
      profileContent: initialState.user,
      loadingContent: false,
      editingProfile: false,
    });
  });

  it('should start edit user profile', () => {
    expect(ProfileReducer(initialState, actions.editProfileStart())).toEqual({
      ...initialState,
      profileContent: initialState.user,
      loadedContentType: 'bio',
      editingProfile: true,
      loadingContent: false,
    });
  });

  it('should cancel edit user profile', () => {
    expect(ProfileReducer(initialState, actions.editProfileCancelled())).toEqual({
      ...initialState,
      profileContent: initialState.user,
      loadedContentType: 'bio',
      editingProfile: false,
      loadingContent: false,
      user: { ...initialState.user, image: initialState.prevProfileImage },
    });
  });

  it('should edit user profile', () => {
    expect(ProfileReducer(initialState, actions.updateProfileSucceeded())).toEqual({
      ...initialState,
      user: { ...initialState.user, ...actions.profile },
      profileContent: { ...initialState.user, ...actions.profile },
      loadingProfile: false,
      editingProfile: false,
      savingProfile: false
    });
  });

  it('should start saving edited user profile', () => {
    expect(ProfileReducer(initialState, actions.saveEditProfileStart())).toEqual({
      ...initialState,
      savingProfile: true
    });
  });

  it('should start changing user profile image', () => {
    expect(ProfileReducer(initialState, actions.changingProfileImageStart())).toEqual({
      ...initialState,
      changingProfileImage: true
    });
  });

  it('should change user profile image', () => {
    expect(ProfileReducer(initialState, actions.changingProfileImageSucceeded())).toEqual({
      ...initialState,
      user: { ...initialState.user, image: actions.imageUrl },
      changingProfileImage: false,
    });
  });

  it('change user profile image failed', () => {
    expect(ProfileReducer(initialState, actions.changingProfileImageFailed())).toEqual({
      ...initialState,
      changingProfileImage: false,
    });
  });
});


describe('Profile actions', () => {
  it('should create an action of type GET_PROFILE_STARTED', () => {
    const expectedAction = {
      type: types.GET_PROFILE_STARTED
    };
    expect(actions.getProfileStart()).toEqual(expectedAction);
  });

  it('should create an action of type GET_PROFILE_SUCCEEDED', () => {
    const expectedAction = {
      type: types.GET_PROFILE_SUCCEEDED,
      profile: 'some-profile'
    };
    expect(actions.getProfileSucceeded('some-profile')).toEqual(expectedAction);
  });

  it('should create an action of type GET_PROFILE_FAILED', () => {
    const expectedAction = {
      type: types.GET_PROFILE_FAILED,
    };
    expect(actions.getProfileFailed()).toEqual(expectedAction);
  });

  it('should create an action of type GET_PROFILE_CONTENT_FAILED', () => {
    const expectedAction = {
      type: types.GET_PROFILE_CONTENT_FAILED,
    };
    expect(actions.getProfileContentFailed()).toEqual(expectedAction);
  });

  it('should create an action of type GET_PROFILE_CONTENT_START', () => {
    const expectedAction = {
      type: types.GET_PROFILE_CONTENT_START,
    };
    expect(actions.getProfileContentStart()).toEqual(expectedAction);
  });

  it('should create an action of type GET_PROFILE_CONTENT_START', () => {
    const expectedAction = {
      type: types.GET_PROFILE_CONTENT_START,
    };
    expect(actions.getProfileContentStart()).toEqual(expectedAction);
  });

  it('should create an action of type GET_PROFILE_CONTENT_SUCCEEDED', () => {
    const expectedAction = {
      type: types.GET_PROFILE_CONTENT_SUCCEEDED,
      content: 'some-content',
      contentType: 'some-contentType',
    };
    expect(actions.getProfileContentSucceeded('some-content', 'some-contentType')).toEqual(expectedAction);
  });

  it('should create an action of type GET_PROFILE_CONTENT_FAILED', () => {
    const expectedAction = {
      type: types.GET_PROFILE_CONTENT_FAILED,
    };
    expect(actions.getProfileContentFailed()).toEqual(expectedAction);
  });

  it('should create an action of type EDIT_PROFILE_SUCCEEDED', () => {
    const expectedAction = {
      type: types.EDIT_PROFILE_SUCCEEDED,
      profile: 'SOME-PROFILE'
    };
    expect(actions.updateProfileSucceeded('SOME-PROFILE')).toEqual(expectedAction);
  });

  it('should create an action of type EDIT_PROFILE_START', () => {
    const expectedAction = {
      type: types.EDIT_PROFILE_START
    };
    expect(actions.editProfileStart()).toEqual(expectedAction);
  });

  it('should create an action of type EDIT_PROFILE_CANCELLED', () => {
    const expectedAction = {
      type: types.EDIT_PROFILE_CANCELLED
    };
    expect(actions.editProfileCancelled()).toEqual(expectedAction);
  });

  it('should create an action of type SAVE_EDITED_PROFILE_START', () => {
    const expectedAction = {
      type: types.SAVE_EDITED_PROFILE_START
    };
    expect(actions.saveEditProfileStart()).toEqual(expectedAction);
  });

  it('should create an action of type EDIT_PROFILE_FAILED', () => {
    const expectedAction = {
      type: types.EDIT_PROFILE_FAILED
    };
    expect(actions.editProfileFailed()).toEqual(expectedAction);
  });

  it('should create an action of type FETCH_USER_BIO', () => {
    const expectedAction = {
      type: types.FETCH_USER_BIO
    };
    expect(actions.getUserBio()).toEqual(expectedAction);
  });

  it('should create an action of type CHANGING_PROFILE_IMAGE_START', () => {
    const expectedAction = {
      type: types.CHANGING_PROFILE_IMAGE_START
    };
    expect(actions.changingProfileImageStart()).toEqual(expectedAction);
  });

  it('should create an action of type CHANGING_PROFILE_IMAGE_SUCCEEDED', () => {
    const expectedAction = {
      type: types.CHANGING_PROFILE_IMAGE_SUCCEEDED,
      imageUrl: 'SOME-IMAGEURL'
    };
    expect(actions.changingProfileImageSucceeded('SOME-IMAGEURL')).toEqual(expectedAction);
  });

  it('should create an action of type CHANGING_PROFILE_IMAGE_FAILED', () => {
    const expectedAction = {
      type: types.CHANGING_PROFILE_IMAGE_FAILED
    };
    expect(actions.changingProfileImageFailed()).toEqual(expectedAction);
  });

  it('should create an action of type GET_PROFILE_CONTENT_STARTED and GET_PROFILE_CONTENT_SUCCEEDED if successful', () => {
    api.client.get = jest.fn().mockReturnValue(Promise.resolve({
      data: {
        body: JSON.stringify({}),
        data: {
          articleCount: 6,
          articles: [{ }, { }, { }, {}, { }],
          currentPage: 1,
          pageCount: 1,
          status: 200
        }
      }
    }));

    const expectedActions = [
      'GET_PROFILE_CONTENT_START',
      'GET_PROFILE_CONTENT_SUCCEEDED'
    ];
    const store = mockStore({});
    return store.dispatch(actions.getUserArticle('e25af1ae-3835-46cb-a488-716936a07ab5'))
      .then(() => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
      });
  });

  it('should create an action of type GET_PROFILE_CONTENT_START & GET_PROFILE_CONTENT_FAILED', () => {
    api.client.get = jest.fn().mockReturnValue(Promise.reject(new Error('An error occured')));
    const expectedActions = [
      'GET_PROFILE_CONTENT_START',
      'GET_PROFILE_CONTENT_FAILED',
    ];
    const store = mockStore({});
    return store.dispatch(actions.getUserArticle('2aec1bef'))
      .then(() => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
      });
  });

  it('should create an action of type GET_PROFILE_CONTENT_STARTED and GET_PROFILE_CONTENT_SUCCEEDED if successful', () => {
    api.client.get = jest.fn().mockReturnValue(Promise.resolve({
      data: {
        data: [
          {
            authorId: 'c1f9596a-922c-41fc-95fd-513a21bd688d',
            count: 1,
            followers: []
          }
        ]
      }

    }));

    const expectedActions = [
      'GET_PROFILE_CONTENT_START',
      'GET_PROFILE_CONTENT_SUCCEEDED'
    ];
    const store = mockStore({});
    return store.dispatch(actions.getUserFollowers('e25af1ae-3835-46cb-a488-716936a07ab5'))
      .then(() => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
      });
  });

  it('should create an action of type GET_PROFILE_CONTENT_START and GET_PROFILE_CONTENT_FAILED', () => {
    api.client.get = jest.fn().mockReturnValue(Promise.reject(new Error('An error occured')));
    const expectedActions = [
      'GET_PROFILE_CONTENT_START',
      'GET_PROFILE_CONTENT_FAILED',
    ];
    const store = mockStore({});
    return store.dispatch(actions.getUserFollowers('e25af1ae-3835-46cb-a488-716936a07ab5'))
      .then(() => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
      });
  });

  it('should create an action of type GET_PROFILE_STARTED and GET_PROFILE_SUCCEEDED if successful', () => {
    api.client.get = jest.fn().mockReturnValue(Promise.resolve({
      data: {
        body: JSON.stringify({}),
        data: {
          articleCount: 6,
          articles: [{ }, { }, { }, {}, { }],
          currentPage: 1,
          pageCount: 1,
          status: 200
        }
      }
    }));

    const expectedActions = [
      'GET_PROFILE_STARTED',
      'GET_PROFILE_SUCCEEDED'
    ];
    const store = mockStore({});
    return store.dispatch(actions.getProfile('e25af1ae-3835-46cb-a488-716936a07ab5'))
      .then(() => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
      });
  });

  it('should create an action of type GET_PROFILE_CONTENT_START & GET_PROFILE_CONTENT_FAILED', () => {
    api.client.get = jest.fn().mockReturnValue(Promise.reject(new Error('An error occured')));
    const expectedActions = [
      'GET_PROFILE_STARTED',
      'GET_PROFILE_FAILED',
    ];
    const store = mockStore({});
    return store.dispatch(actions.getProfile('2aec1bef'))
      .then(() => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
      });
  });

  it('should create an action of type SAVE_EDITED_PROFILE_START and EDIT_PROFILE_SUCCEEDED if successful', () => {
    api.client.patch = jest.fn().mockReturnValue(Promise.resolve({
      data: {
        body: JSON.stringify({}),
        data: {
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
        }
      }
    }));

    const expectedActions = [
      'SAVE_EDITED_PROFILE_START',
      'EDIT_PROFILE_SUCCEEDED'
    ];
    const store = mockStore({});
    return store.dispatch(actions.saveEditedProfile({}))
      .then(() => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
      });
  });

  it('should create an action of type SAVE_EDITED_PROFILE_START and EDIT_PROFILE_SUCCEEDED if successful', () => {
    api.client.patch = jest.fn().mockReturnValue(Promise.reject(new Error('An error occured')));

    const expectedActions = [
      'SAVE_EDITED_PROFILE_START',
      'EDIT_PROFILE_FAILED'
    ];
    const store = mockStore({});
    return store.dispatch(actions.saveEditedProfile({}))
      .then(() => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
      });
  });

  it('should create an action of type CHANGING_PROFILE_IMAGE_START and CHANGING_PROFILE_IMAGE_SUCCEEDED if successful', () => {
    api.client.patch = jest.fn().mockReturnValue(Promise.resolve({
      data: {
        body: JSON.stringify({}),
        data: {
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
        }
      }
    }));

    const expectedActions = [
      'CHANGING_PROFILE_IMAGE_START',
      'CHANGING_PROFILE_IMAGE_FAILED'
    ];
    const store = mockStore({});
    return store.dispatch(actions.changeProfileImage('someimage'))
      .then(() => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
      });
  });
});

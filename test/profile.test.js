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

  it('Should match the snapshot', () => {
    const tree = renderer.create(<MemoryRouter>
      <ProfileArticleCard article={article} />
    </MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();
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

  it('Should match the snapshot', () => {
    const tree = renderer
      .create(<ProfileUserCard profile={profile} signedInUser={signedInUser} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Profile reducers', () => {
  const initialState = {
    user: {},
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
      error: null
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
      loadingContent: false
    });
  });

  it('should change loadingContent to true', () => {
    expect(ProfileReducer(initialState, actions.getProfileContentStart())).toEqual({
      ...initialState,
      loadingContent: true
    });
  });

  it('should change load a new profile', () => {
    expect(ProfileReducer(initialState, actions.getProfileSucceeded())).toEqual({
      ...initialState,
      user: actions.profile,
      loadingProfile: false
    });
  });

  it('should change load a new content', () => {
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
});

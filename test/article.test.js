import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { mount } from 'enzyme';
import * as api from '../src/api';
import * as actions from '../src/actions/actionTypes';
import { fetchArticlesStarted, fetchArticles } from '../src/actions/article';
import articleReducer from '../src/reducers/article';
import ArticlePreviewList from '../src/components/ArticlePreviewList';
import ArticlePreviewSwitch from '../src/components/ArticlePreviewSwitch';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(api.client);

jest.mock('../src/containers/BookmarkContainer', () => jest.fn(() => (<div />)));
jest.mock('../src/components/ArticlePreviewImage', () => jest.fn(() => (<div />)));
jest.mock('react-router-dom', () => jest.fn(() => ({ Redirect: () => (<div />) })));

describe(' Test for fetch all articles action creators', () => {
  mock.onGet('/articles/').reply(200, {
    articles: [
      {
        id: 'f60cd301-f922-4f02-8316-2012df279636',
        title: 'Using the Effect Hook',
        body: 'Hooks are a new addition in React 16.8.',
        ratings: 5
      },
    ]
  });
  it('fetchArticlesStarted', () => {
    const expectedAction = {
      type: actions.FETCH_ALL_ARTICLES_STARTED
    };

    expect(fetchArticlesStarted()).toEqual(expectedAction);
  });

  it('fetchArticlesSucceeded', () => {
    const getState = {};
    const expectedActions = [
      { type: actions.FETCH_ALL_ARTICLES_STARTED },
      {
        type: actions.FETCH_ALL_ARTICLES_SUCCEEDED,
        payload: {
          articles: {
            articles: [
              {
                id: 'f60cd301-f922-4f02-8316-2012df279636',
                title: 'Using the Effect Hook',
                body: 'Hooks are a new addition in React 16.8.',
                ratings: 5
              },
            ]
          }
        }
      }
    ];

    const store = mockStore(getState, expectedActions);
    return store.dispatch(fetchArticles()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('fetchArticlesFailed', () => {
    mock.onGet('/articles/').networkError();
    const getState = {};
    const expectedActions = [
      { type: actions.FETCH_ALL_ARTICLES_STARTED },
      {
        type: actions.FETCH_ALL_ARTICLES_FAILED,
        payload: {
          err: 'Network Error'
        }
      }
    ];

    const store = mockStore(getState, expectedActions);
    return store.dispatch(fetchArticles()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('Test for fetch all articles reducer', () => {
  const initialState = {
    articles: [],
    newArticles: [],
    currentPage: 0,
    numberOfPages: 1,
    isLoading: false,
    error: false,
  };

  it('should handle initial state', () => {
    expect(articleReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle fetch all articles started', () => {
    const action = {
      type: actions.FETCH_ALL_ARTICLES_STARTED
    };
    const expectedState = {
      ...initialState,
      isLoading: true
    };

    expect(articleReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle fetch all articles succeeded', () => {
    const action = {
      type: actions.FETCH_ALL_ARTICLES_SUCCEEDED,
      payload: {
        articles: {
          articles: ['Article List'],
          currentPage: 'the page No. of the page currently displayed',
          numberOfPages: 'the possible No. of pages that can be displayed'
        }
      }
    };
    const expectedState = {
      ...initialState,
      newArticles: action.payload.articles.articles,
      articles: initialState.articles.concat(action.payload.articles.articles),
      currentPage: Number(action.payload.articles.currentPage),
      numberOfPages: Number(action.payload.articles.numberOfPages),
      isLoading: false
    };
    expect(articleReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle fetch all articles failed', () => {
    const action = {
      type: actions.FETCH_ALL_ARTICLES_FAILED
    };
    const expectedState = {
      ...initialState,
      error: true
    };

    expect(articleReducer(initialState, action)).toEqual(expectedState);
  });
});

it('renders <ArticlePreviewList />', () => {
  const wrapper = mount(<ArticlePreviewList
    initial
    ads={[]}
    isLoading
    articles={[]}
  />);

  expect(wrapper.find(ArticlePreviewList).length).toEqual(1);
  wrapper.unmount();

  const wrapper2 = mount(<ArticlePreviewList
    initial={false}
    ads={[]}
    isLoading={false}
    articles={[]}
  />);

  expect(wrapper2.find(ArticlePreviewList).length).toEqual(1);
});

it('renders <ArticlePreviewSwitch />', () => {
  const article = {
    id: 'c26cf521-b555-4d13-8596-a597adefe0c7',
    bannerImage: 'https://images.unsplash.com/photo-1557381733-949765af91b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=331&q=80',
    slug: 'Using-the-Effect-Hook-gs7dgogpz4800',
    title: 'Using the Effect Hook',
    description: 'react hooks',
    body: 'Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class.',
    plainText: 'Higher order components are decorators that add powerful functionality to your standard components.',
    tagList: [
      'react',
      'hooks',
      'javascript'
    ],
    readTime: '4 secs',
    isPremium: false,
    authorLastSeen: '2019-05-10T14:18:57.584Z',
    createdAt: '2019-05-10T14:18:56.962Z',
    updatedAt: '2019-05-10T14:18:56.962Z',
    author: '5dc35524-b257-496e-9264-a089db25ff4f',
    user: {
      firstname: 'Kayode',
      lastname: 'Okunlade',
      image: null
    },
    ratings: 5
  };

  const wrapper = mount(<ArticlePreviewSwitch
    isSmall
    article={article}
  />);

  expect(wrapper.find(ArticlePreviewSwitch).length).toEqual(1);
  wrapper.unmount();

  const wrapper2 = mount(<ArticlePreviewSwitch
    article={article}
    isSmall={false}
  />);
  expect(wrapper2.find(ArticlePreviewSwitch).length).toEqual(1);
});

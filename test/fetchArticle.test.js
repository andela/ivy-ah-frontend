import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { createStore } from 'redux';
import * as api from '../src/api';
import { Article } from '../src/containers/FetchArticle';
import ArticleContent from '../src/components/ArticleContent';
import ArticleMetadata from '../src/components/ArticleMetadata';
import ArticleTag from '../src/components/ArticleTag';
import singleArticleReducer from '../src/reducers/singleArticleReducer';
import * as articleActions from '../src/actions/articleActions';
import AuthorMetadata from '../src/components/AuthorMetadata';


const mockStore = configureStore([thunk]);

describe('Test Article actions', () => {
  it('calls request and success actions if the fetch response was successful', () => {
    api.client.get = jest.fn().mockReturnValue(Promise.resolve({
      data: {
        body: JSON.stringify({}),
        tagList: ['Movies', 'Sport', 'Business'],
        user: {
          firstname: 'Jude',
          lastname: 'Afam',
          username: 'bobjayafam'
        }
      }
    }));

    const expectedActions = [
      'FETCH_ARTICLE_STARTED',
      'FETCH_ARTICLE_SUCCEEDED'
    ];
    const store = mockStore({});
    return store.dispatch(articleActions.fetchArticle('2aec1bef'))
      .then(() => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
      });
  });

  it('calls request and success actions if the fetch response was successful', () => {
    api.client.get = jest.fn().mockReturnValue(Promise.reject(new Error('An error occured')));
    const expectedActions = [
      'FETCH_ARTICLE_STARTED',
      'FETCH_ARTICLE_FAILED'
    ];
    const store = mockStore({});
    return store.dispatch(articleActions.fetchArticle('2aec1bef'))
      .then(() => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
      });
  });
});

describe('Test single article reducer', () => {
  const initialArticleState = {
    article: {},
    error: false,
    loading: false
  };

  it('should return loading when passed FETCH_ARTICLE_STARTED', () => {
    const action = articleActions.fetchArticleStarted();
    const newState = singleArticleReducer(initialArticleState, action);
    expect(newState).toEqual({
      article: {},
      error: false,
      loading: true
    });
  });
  it('should return an article when passed FETCH_ARTICLE_SUCCEEDED', () => {
    const article = {
      title: 'My first article'
    };
    const action = articleActions.fetchArticleSucceeded(article);
    const newState = singleArticleReducer(initialArticleState, action);
    expect(newState).toEqual({ loading: false, article, error: false });
  });

  it('should return an error when passed FETCH_ARTICLE_FAILED', () => {
    const error = true;
    const action = articleActions.fetchArticleFailed(error);
    const newState = singleArticleReducer(initialArticleState, action);
    expect(newState).toEqual({ article: {}, loading: false, error });
  });
});

describe('<Article />', () => {
  it('renders the component', () => {
    const props = {
      article: {
        data: {
          body: JSON.stringify({
            entityMap: {},
            blocks: [{
              key: '637gr',
              text: 'Initialized from content state.',
              type: 'unstyled',
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {}
            }]
          }),
          tagList: ['Movies', 'Sport', 'Business'],
          user: {
            firstname: 'Jude',
            lastname: 'Afam',
            username: 'bobjayafam'
          },
          title: 'My First Article',
          readTime: '76 secs',
          isPremium: true,
          createdAt: '2019-05-06T15:21:13.799Z',
          ratings: 100,
        },
      },
      match: {
        params: {}
      },
      fetchArticle: jest.fn()
    };
    const wrapper = mount(<Article {...props} />);
    expect(wrapper.find('h1').text()).toEqual('My First Article');
  });
});

describe('<ArticleContent />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const props = {
        body: JSON.stringify({
          entityMap: {},
          blocks: [{
            key: '637gr',
            text: 'Initialized from content state.',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {}
          }]
        }),
      };

      const wrapper = shallow(<ArticleContent {...props} />);

      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
});

describe('<ArticleMetadata />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const props = {
        data: {
          title: 'My First Article',
          readTime: '76 secs',
          isPremium: true,
          createdAt: '2019-05-06T15:21:13.799Z',
          ratings: 100,
          user: {
            firstname: 'Jude',
            lastname: 'Afam',
            username: 'bobjayafam'
          }
        }
      };

      const wrapper = shallow(<ArticleMetadata {...props} />);
      expect(wrapper.find('h1').text()).toEqual('My First Article');
      expect(wrapper.find('.author-name').text()).toEqual('Jude Afam');
    });
  });
});

describe('<ArticleTag />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const props = {
        tagList: ['Movies', 'Sport', 'Business']
      };

      const wrapper = shallow(<ArticleTag {...props} />);

      expect(wrapper.find('.article-tag').at(0).text()).toEqual('Movies');
    });
  });
});

describe('<AuthorMetadata />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const props = {
        user: {
          firstname: 'Jude',
          lastname: 'Afam',
          username: 'bobjayafam',
          bio: 'A web developer'
        }
      };

      const wrapper = shallow(<AuthorMetadata {...props} />);
      expect(wrapper.find('.author-name').text()).toEqual('Jude');
    });
  });
});

describe('Test Store', () => {
  it('should handle fetching a single article', () => {
    const initialArticleState = {
      article: {},
      error: false,
      loading: false
    };
    const article = {
      title: 'My first article'
    };
    const store = createStore(singleArticleReducer, initialArticleState);
    const action = articleActions.fetchArticleSucceeded(article);
    store.dispatch(action);
    const fetchedArticle = store.getState().article;
    expect(fetchedArticle).toEqual(article);
  });
});

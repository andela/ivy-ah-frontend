import { createStore } from 'redux';
import articlesReducer from 'Reducers/articlesReducer';
import * as articleActions from 'Actions/createArticleActions';
import * as types from 'Actions/actionTypes';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(axios);

describe('actions', () => {
  it('should create an ADD_ARTICLE_BEGIN action', () => {
    const expectedAction = {
      type: types.ADD_ARTICLE_BEGIN
    };
    expect(articleActions.createArticleBegin()).toEqual(expectedAction);
  });
});

describe('actions', () => {
  it('should create an ADD_ARTICLE_SUCCESS action', () => {
    const article = 'This is the article';
    const expectedAction = {
      type: types.ADD_ARTICLE_SUCCESS,
      payload: article
    };
    expect(articleActions.createArticleSuccess(article)).toEqual(expectedAction);
  });

  it('should create an ADD_ARTICLE_FAILURE action', () => {
    const article = 'this is error';
    const expectedAction = {
      type: types.ADD_ARTICLE_FAILURE,
      payload: article
    };
    expect(articleActions.createArticleFailure(article)).toEqual(expectedAction);
  });
});


describe('Test Store', () => {
  it('should test the create article function', () => {
    const initialArticleState = {
      createdArticle: {},
      error: [],
      loading: false
    };
    const article = {
      title: 'My first article',
      body: 'this is the body',
      description: 'here is the description',
      tagList: ['yes', 'come'],
      plainText: 'here is it'
    };
    const store = createStore(articlesReducer, initialArticleState);
    const action = articleActions.createArticleSuccess(article);
    store.dispatch(action);
    const createdArticle = store.getState().article;
    expect(createdArticle).toEqual(createdArticle);
  });
});

describe('async actions', () => {
  afterEach(() => {
    mock.restore();
  });


  it('creates ADD_ARTICLE_SUCESS when creating article has been done', () => {
    mock.onPost('/artiles', {
      body: { todos: ['do something'] },
      headers: {
        'content-type': 'application/json',
        Authorization: '825afkafjaf.fafafdfsfjaf.afkafja'
      }
    })
      .reply(200, {
        users: [
          { id: 1, name: 'John Smith' }
        ]
      });


    const expectedActions = [
      { type: types.ADD_ARTICLE_BEGIN },
      { type: types.ADD_ARTICLE_FAILURE, payload: new Error('Request failed with status code 401') }
    ];
    const store = mockStore({ todos: [] });

    return store.dispatch(articleActions.createArticle({ todos: ['do something'] })).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

import { createStore } from 'redux';
import articlesReducer from 'Reducers/articlesReducer';
import * as articleActions from 'Actions/reportArticleAction';
import * as types from 'Actions/actionTypes';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(axios);

describe('actions', () => {
  it('Should return a REPORT_ARTICLE_BEGIN action', () => {
    const expectedAction = {
      type: types.REPORT_ARTICLE_STARTED
    };
    expect(articleActions.reportArticleBegin()).toEqual(expectedAction);
  });
  it('Should return a REPORT_ARTICLE_SUCCEEDED action', () => {
    const expectedAction = {
      type: types.REPORT_ARTICLE_SUCCEEDED,
      payload: 'article'
    };
    expect(articleActions.reportArticleSuccess('article')).toEqual(expectedAction);
  });
  it('Should return a REPORT_ARTICLE_FAILED action', () => {
    const expectedAction = {
      type: types.REPORT_ARTICLE_FAILED,
      payload: 'error'
    };
    expect(articleActions.reportArticleFailure('error')).toEqual(expectedAction);
  });
});

describe('Test Store', () => {
  it('should test the report article functionality', () => {
    const initialArticleState = {
      reportedArticle: {},
      error: [],
      loading: false
    };
    const reportArticle = {
      id: 's53424kl43l4342l3342l33l22l',
      reason: 'This article can spite religious intolerance',
      userId: 'aar34kfj35q54q5454523243l23l4',
    };
    const store = createStore(articlesReducer, initialArticleState);
    const action = articleActions.reportArticleSuccess(reportArticle);
    store.dispatch(action);
    const reportedArticle = store.getState().reporArticle;
    expect(reportedArticle).toEqual(reportedArticle);
  });
});

describe('async actions', () => {
  afterEach(() => {
    mock.restore();
  });


  it('creates ADD_ARTICLE_SUCESS when creating article has been done', () => {
    mock.onPost('/artiles', {
      body: { reportReason: 'spam' },
      headers: {
        'content-type': 'application/json',
      }
    })
      .reply(200, {
        users: [
          {
            id: '9151945qwriufjaf',
            reportReason: 'spam',
            userId: '35wfqrwkr45234'
          }
        ]
      });

    const expectedActions = [
      { type: types.REPORT_ARTICLE_STARTED },
      { type: types.REPORT_ARTICLE_FAILED, payload: new Error('Request failed with status code 401') }
    ];
    const store = mockStore({ reportedArticle: {}, error: [], loading: false });

    return store.dispatch(articleActions.reportArticle({ reportReason: 'spam' })).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

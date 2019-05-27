import React from 'react';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import bookmarksReducer from '../src/reducers/bookmark';
import Bookmark from '../src/components/Bookmark';
import * as api from '../src/api';
import * as actions from '../src/actions/actionTypes';
import {
  fetchBookmarksSucceeded,
  fetchBookmarks,
  addBookmarks,
  removeBookmarks
} from '../src/actions/bookmark';

const articleId = 'f2fba6df-75d5-4672-9923-834a6da4e11e';
const onClickBookmark = jest.fn();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

it("renders an empty icon if article isn't bookmarked", () => {
  const bookmark = false;
  const tree = renderer
    .create(<Bookmark
      articleId={articleId}
      bookmark={bookmark}
      onClickBookmark={onClickBookmark}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders a filled icon if article has been bookmarked', () => {
  const bookmark = true;
  const tree = renderer
    .create(<Bookmark
      articleId={articleId}
      bookmark={bookmark}
      onClickBookmark={onClickBookmark}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});


describe('addBookmark', () => {
  api.client.post = jest.fn(() => new Promise((resolve, reject) => resolve({
    data: { bookmarks: 'bookmark' }
  })));
  it('addBookmarks', () => {
    const getState = {};
    const expectedActions = {
      type: actions.EDIT_BOOKMARKS_STARTED,
      payload: {
        articleId: 'bookmark',
        bookmarked: true
      },
    };

    const store = mockStore(getState, expectedActions);
    return store.dispatch(addBookmarks('bookmark')).then(() => {
      expect(store.getActions()[0]).toEqual(expectedActions);
      expect(api.client.post).toHaveBeenCalled();
      expect(api.client.post).toHaveBeenCalledWith('/bookmarks', { article: 'bookmark' });
    });
  });

  it('addBookmarksFailed', () => {
    api.client.post = jest.fn(() => new Promise((resolve, reject) => reject(new Error())));

    const getState = {};
    const expectedAction = [
      {
        payload: { articleId: 'bookmark', bookmarked: true }, type: 'EDIT_BOOKMARKS_STARTED'
      },
      { payload: 'bookmark', type: 'EDIT_BOOKMARK_FAILED' }
    ];

    const store = mockStore(getState, expectedAction);
    return store.dispatch(addBookmarks('bookmark')).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
      expect(api.client.post).toHaveBeenCalled();
    });
  });
});

describe('removeBookmark', () => {
  it('removeBookmarksSucceeded', () => {
    api.client.delete = jest.fn(() => new Promise((resolve, reject) => resolve({
      data: { bookmarks: 'bookmark' }
    })));
    const getState = {};
    const expectedActions = {
      type: actions.EDIT_BOOKMARKS_STARTED,
      payload: {
        articleId: 'bookmark',
        bookmarked: false
      },
    };

    const store = mockStore(getState, expectedActions);
    return store.dispatch(removeBookmarks('bookmark')).then(() => {
      expect(store.getActions()[0]).toEqual(expectedActions);
      expect(api.client.delete).toHaveBeenCalled();
      expect(api.client.delete).toHaveBeenCalledWith('/bookmarks', { data: { article: 'bookmark' } });
    });
  });
});

describe('fetchBookmark', () => {
  api.client.get = jest.fn(() => new Promise((resolve, reject) => resolve({
    data: [
      {
        article: 'cd1fc24e-0a1d-4a55-8798-1a6251a7a53e'
      },
      {
        article: 'b52da1ce-c138-4494-8163-b56f78ff7a71'
      }
    ]
  })));
  const bookmarks = [
    {
      article: 'cd1fc24e-0a1d-4a55-8798-1a6251a7a53e'
    },
    {
      article: 'b52da1ce-c138-4494-8163-b56f78ff7a71'
    },

  ];

  it('fetchBookmarksSucceeded', () => {
    const expectedAction = {
      type: actions.FETCH_BOOKMARKS_SUCCEEDED,
      payload: {
        bookmarks
      },
    };
    expect(fetchBookmarksSucceeded(bookmarks)).toEqual(expectedAction);
  });

  it('fetchBookmarks', () => {
    const getState = { token: 'token' };
    api.getToken = jest.fn(() => 'token');
    const expectedActions = {
      type: actions.FETCH_BOOKMARKS_SUCCEEDED,
      payload: { bookmarks },
    };

    const store = mockStore(getState, expectedActions);
    return store.dispatch(fetchBookmarks({})).then(() => {
      expect(store.getActions()[0]).toEqual(expectedActions);
      expect(api.client.get).toHaveBeenCalled();
      expect(api.client.get).toHaveBeenCalledWith('/bookmarks');
    });
  });
});

describe('the bookmarks reducer', () => {
  const initialState = {
    bookmarks: [],
    error: false,
    target: false,
    bookmarked: null
  };

  it('should return the intial state', () => {
    expect(bookmarksReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle edit bookmarks started', () => {
    const action = {
      type: actions.EDIT_BOOKMARKS_STARTED,
      payload: {
        articleId: 'articleId',
        bookmarked: 'boolean'
      }
    };
    const expectedState = {
      ...initialState,
      target: action.payload.articleId,
      bookmarked: action.payload.bookmarked,
      error: false
    };

    expect(bookmarksReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle fetch bookmarks succeeded', () => {
    const action = {
      type: actions.FETCH_BOOKMARKS_SUCCEEDED,
      payload: {
        bookmarks: {
          status: 'http status code',
          bookmarks: ['bookmark items']
        }
      }
    };
    const expectedState = {
      ...initialState,
      bookmarks: action.payload.bookmarks.bookmarks
    };

    expect(bookmarksReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle add bookmarks succeeded', () => {
    const action = {
      type: actions.ADD_BOOKMARKS_SUCCEEDED,
      payload: {
        bookmarks: [
          { article: 'articleId' }
        ]
      }
    };
    const expectedState = {
      ...initialState,
      bookmarks: initialState.bookmarks.concat(action.payload.bookmarks),
      target: action.payload.bookmarks.article,
      bookmarked: null,
      error: false
    };

    expect(bookmarksReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle remove bookmarks succeeded', () => {
    const action = {
      type: actions.REMOVE_BOOKMARKS_SUCCEEDED,
      payload: {
        bookmarks: [
          { article: 'articleId' }
        ]
      }
    };
    const expectedState = {
      ...initialState,
      bookmarks: initialState.bookmarks
        .filter(bookmark => bookmark.article !== action.payload.bookmarks),
      target: action.payload.bookmarks,
      bookmarked: null,
      error: false
    };

    expect(bookmarksReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle edit bookmarks failed', () => {
    const action = {
      type: actions.EDIT_BOOKMARKS_FAILED,
      payload: {
        bookmarks: [
          { article: 'articleId' }
        ]
      }
    };
    const expectedState = {
      ...initialState,
      error: true,
      target: action.payload,
      bookmarked: null
    };

    expect(bookmarksReducer(initialState, action)).toEqual(expectedState);
  });
});

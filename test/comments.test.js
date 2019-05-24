import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { createStore } from 'redux';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import CommentInput from '../src/components/comments/CommentInput';
import commentReducer from '../src/reducers/comment';
import Comment from '../src/components/comments/Comment';
import CommentBox from '../src/components/comments/CommentBox';
import * as commentActions from '../src/actions/comment';
import * as articleActions from '../src/actions/articleActions';
import * as api from '../src/api';

const mockStore = configureStore([thunk]);
const mock = new MockAdapter(api.client);

describe('Comments Actions', () => {
  it('calls started and succeeded actions if the comment post was successful', () => {
    mock.onPost('/comments/53b37116-9617-4796-8655-9c4234f9445b').reply(201, {
      data: {}
    });
    const expectedActions = [
      'POST_COMMENT_STARTED',
      'POST_COMMENT_SUCCEEDED'
    ];
    const store = mockStore({});
    return store.dispatch(commentActions.postComment('53b37116-9617-4796-8655-9c4234f9445b', 'new comment'))
      .then(() => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
      });
  });

  it('calls started and failed actions if the comment post was unsuccessful', () => {
    mock.onPost('/comments/53b37116-9617-4796-8655-9c4234f9445b').reply(401, {
      error: new Error('An error occured')
    });
    const expectedActions = [
      'POST_COMMENT_STARTED',
      'POST_COMMENT_FAILED'
    ];
    const store = mockStore({});
    return store.dispatch(commentActions.postComment('53b37116-9617-4796-8655-9c4234f9445b', 'new comment'))
      .then(() => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
      });
  });
});

describe('Comment Reducer', () => {
  const initialCommentState = {
    comment: {},
    articleId: '',
    error: false,
    loading: false,
    comments: []
  };

  it('should return loading when passed POST_COMMENT_STARTED', () => {
    const action = commentActions.postCommentStarted();
    const newState = commentReducer(initialCommentState, action);
    expect(newState).toEqual({
      comment: {},
      articleId: '',
      error: false,
      loading: true,
      comments: []
    });
  });

  it('should return an array with one comment when passed POST_COMMENT_SUCCEEDED', () => {
    const comment = {
      body: 'new comment'
    };
    const action = commentActions.postCommentSucceeded(comment);
    const newState = commentReducer(initialCommentState, action);
    expect(newState).toEqual({
      loading: false, comment: {}, error: false, comments: [comment], articleId: ''
    });
  });

  it('should return an error when passed POST_COMMENT_FAILED', () => {
    const error = true;
    const action = commentActions.postCommentFailed(error);
    const newState = commentReducer(initialCommentState, action);
    expect(newState).toEqual({
      loading: false, comment: {}, error: true, comments: [], articleId: ''
    });
  });

  it('should return an array with comments when passed FETCH_COMMENTS_SUCCEEDED', () => {
    const data = {
      id: 'abc', comments: ['New comment', 'newer']
    };
    const action = articleActions.fetchCommentsSucceeded(data);
    const newState = commentReducer(initialCommentState, action);
    expect(newState).toEqual({
      loading: false, comment: {}, error: false, articleId: data.id, comments: data.comments
    });
  });

  it('should return the initial state when passed an undefined action type', () => {
    const newState = commentReducer(initialCommentState, 'action');
    expect(newState).toEqual({
      comment: {},
      articleId: '',
      error: false,
      loading: false,
      comments: []
    });
  });
});

describe('Test Store', () => {
  it('should handle posting a comment', () => {
    const initialCommentState = {
      comment: {},
      articleId: '',
      error: false,
      loading: false,
      comments: []
    };
    const comment = {
      body: 'new comment'
    };
    const store = createStore(commentReducer, initialCommentState);
    const action = commentActions.postCommentSucceeded(comment);
    store.dispatch(action);
    const updatedComments = store.getState().comments;
    expect(updatedComments[0]).toEqual(comment);
  });
});

describe('Test Comment Component', () => {
  it('should render component', () => {
    const props = {
      postCommentHandler: jest.fn(),
      articleId: 'abcdef',
      comments: [{
        body: 'New Comment',
        createdAt: '2019-05-21T07:51:04.162Z',
        id: 'abc',
        user: {
          firstname: 'Jude',
          lastname: 'Afam'
        }
      }],
      loading: false,
      error: false,
      isAuth: true,
      requestAuth: jest.fn()
    };

    const wrapper = shallow(<Comment {...props} />);
    expect(wrapper.find('.comment-container').length).toEqual(1);
    expect(wrapper.find('.comment-count-text').text()).toEqual('1 comments');
  });

  it('should display there are no comments if there are no comments', () => {
    const props = {
      postCommentHandler: jest.fn(),
      articleId: 'abcdef',
      comments: [],
      loading: false,
      error: false,
      isAuth: true,
      requestAuth: jest.fn()
    };

    const wrapper = shallow(<Comment {...props} />);
    expect(wrapper.find('.comment-count-text').text()).toEqual('There are no comments for this article yet. Be the first to comment');
  });
});

describe('Test CommentBox Component', () => {
  it('should render component', () => {
    const props = {
      comments: [
        {
          body: 'New Comment',
          createdAt: '2019-05-21T07:51:04.162Z',
          id: 'abc',
          user: {
            firstname: 'Jude',
            lastname: 'Afam'
          }
        },
        {
          body: 'New Comment',
          createdAt: '2019-05-21T07:51:04.162Z',
          id: 'abcd',
          user: {
            firstname: 'Jude',
            lastname: 'Afam'
          }
        },
        {
          body: 'New Comment',
          createdAt: '2019-05-21T07:51:04.162Z',
          id: 'abcde',
          user: {
            firstname: 'Jude',
            lastname: 'Afam'
          }
        },
        {
          body: 'New Comment',
          createdAt: '2019-05-21T07:51:04.162Z',
          id: 'abcdef',
          user: {
            firstname: 'Jude',
            lastname: 'Afam'
          }
        },
        {
          body: 'New Comment',
          createdAt: '2019-05-21T07:51:04.162Z',
          id: 'abcdefg',
          user: {
            firstname: 'Jude',
            lastname: 'Afam'
          }
        },
        {
          body: 'New Comment',
          createdAt: '2019-05-21T07:51:04.162Z',
          id: 'abcdefgh',
          user: {
            firstname: 'Jude',
            lastname: 'Afam'
          }
        },
        {
          body: 'New Comment',
          createdAt: '2019-05-21T07:51:04.162Z',
          id: 'abcdefghi',
          user: {
            firstname: 'Jude',
            lastname: 'Afam'
          }
        }
      ],
    };

    const wrapper = mount(<MemoryRouter>
      <CommentBox {...props} />
    </MemoryRouter>);
    expect(wrapper.find('.comment-details').length).toEqual(4);
    wrapper.find('.more-comments-btn').simulate('click');
    expect(wrapper.find('.comment-details').length).toEqual(7);
  });
});

describe('Test CommentInput Component', () => {
  it('should post a comment for an authenticated user', () => {
    const props = {
      postCommentHandler: jest.fn(),
      articleId: 'abcdef',
      loading: false,
      error: false,
      isAuth: true,
      requestAuth: jest.fn()
    };
    const wrapper = mount(<CommentInput {...props} />);
    expect(wrapper.find('.comment-input-container').length).toEqual(1);
    wrapper.find('.comment-input-main').simulate('input', { target: { body: 'i dey chow' } });
    wrapper.find('.comment-post-button').simulate('click');
  });

  it('should request for authorization for a non authenticated user', () => {
    const props = {
      postCommentHandler: jest.fn(),
      articleId: 'abcdef',
      loading: false,
      error: false,
      isAuth: false,
      requestAuth: jest.fn()
    };
    const wrapper = mount(<CommentInput {...props} />);
    expect(wrapper.find('.comment-input-container').length).toEqual(1);
    wrapper.find('.comment-input-main').simulate('input', { target: { body: 'i dey chow' } });
    wrapper.find('.comment-post-button').simulate('click');
    expect(props.requestAuth).toHaveBeenCalled();
  });
});

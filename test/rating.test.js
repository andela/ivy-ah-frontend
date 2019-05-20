import React from 'react';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Rating } from '../src/components/Ratings';
import singleArticleReducer from '../src/reducers/singleArticleReducer';
import Hype from '../src/components/Hype';
import * as api from '../src/api';
import {
  rateArticleSuccess,
  rateArticleFailure,
  rateAnArticle
} from '../src/actions/rating';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('<Ratings />', () => {
  it('it renders Ratings component', () => {
    const h = mount(<Rating
      userCurrentHype={3}
      updateHypeError={false}
      rateArticleHandler={() => 6}
      articleId={46455}
    />);
    h.find(Hype).first().simulate('mouseenter');
    h.find(Hype).first().simulate('mouseleave');
    h.find(Hype).first().simulate('click');
    expect(h.find(Hype).length).toEqual(5);
  });

  it('it renders the Hype component', () => {
    const h = shallow(<Hype
      resolveClass={() => 0}
      hovered={() => 0}
      mouseLeave={() => 0}
      position={1}
      clicked={() => 0}
    />);
    expect(h.find('svg').length).toEqual(1);
  });
});

describe('Rating actions', () => {
  const initialState = {
    article: {},
    error: false,
    loading: false,
    totalArticleHype: 0,
    userCurrentHype: 0,
    updateHypeError: false
  };

  it('rateArticle success', () => {
    const getState = {};
    const expectedActions = {
      type: 'RATE_ARTICLE_SUCCESS',
      rating: 3
    };
    const store = mockStore(getState, expectedActions);
    store.dispatch(rateArticleSuccess(3));
    expect(store.getActions()[0]).toEqual(expectedActions);
  });

  it('rateArticle', () => {
    const getState = {};
    const expectedActions = {
      type: 'RATE_ARTICLE_FAILURE',
    };
    const store = mockStore(getState, expectedActions);
    store.dispatch(rateArticleFailure());
    expect(store.getActions()[0]).toEqual(expectedActions);
  });

  it('should update article hype', () => {
    expect(singleArticleReducer(initialState, rateArticleSuccess(3))).toEqual({
      ...initialState,
      userCurrentHype: 3,
    });
  });

  it('should update article hype', () => {
    expect(singleArticleReducer(initialState, rateArticleFailure())).toEqual({
      ...initialState,
      updateHypeError: true,
    });
  });

  it('test article rating', () => {
    api.client.post = jest.fn().mockReturnValue(Promise.resolve({
      data: {
        rating: 3,
        articleId: '237494owhdjd'
      }
    }));

    const expectedActions = [
      'RATE_ARTICLE_SUCCESS'
    ];
    const store = mockStore({});
    return store.dispatch(rateAnArticle('237494owhdjd', 3))
      .then(() => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
      });
  });

  it('test article rating failure', () => {
    api.client.post = jest.fn().mockReturnValue(Promise.reject(new Error('An error occured')));
    const expectedActions = [
      'RATE_ARTICLE_FAILURE'
    ];
    const store = mockStore({});
    return store.dispatch(rateAnArticle('237494owhdjd', 3))
      .then(() => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
      });
  });
});

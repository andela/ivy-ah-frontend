import { combineReducers } from 'redux';
import AuthReducer from './auth';
import singleArticleReducer from './singleArticleReducer';
import bookmarkReducer from './bookmark';

const rootReducer = combineReducers({
  auth: AuthReducer,
  bookmarkReducer,
  article: singleArticleReducer
});

export default rootReducer;

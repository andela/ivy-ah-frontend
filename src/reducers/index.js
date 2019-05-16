import { combineReducers } from 'redux';
import AuthReducer from './auth';
import singleArticleReducer from './singleArticleReducer';
import bookmarkReducer from './bookmark';
import passwordReducer from './forgotpassword';
import resetReducer from './resetPassword';

const rootReducer = combineReducers({
  auth: AuthReducer,
  bookmarkReducer,
  article: singleArticleReducer,
  forgotPassword: passwordReducer,
  resetPassword: resetReducer

});

export default rootReducer;

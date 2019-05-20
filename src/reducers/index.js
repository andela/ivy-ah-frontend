import { combineReducers } from 'redux';
import reportArticleReducer from 'Reducers/reportArticleReducer';
import AuthReducer from './auth';
import singleArticleReducer from './singleArticleReducer';
import articleReducer from './article';
import bookmarkReducer from './bookmark';
import passwordReducer from './forgotpassword';
import resetReducer from './resetPassword';
import profileReducer from './profile';
import createArticleReducer from './articlesReducer';
import commentReducer from './comment';
import followUserReducer from './follow';


const rootReducer = combineReducers({
  auth: AuthReducer,
  bookmarkReducer,
  article: singleArticleReducer,
  forgotPassword: passwordReducer,
  resetPassword: resetReducer,
  profile: profileReducer,
  articleReducer,
  createArticleReducer,
  comment: commentReducer,
  reportArticleReducer,
  follow: followUserReducer,
});

export default rootReducer;

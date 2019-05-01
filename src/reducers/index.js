import { combineReducers } from 'redux';
import AuthReducer from './auth';
import singleArticleReducer from './singleArticleReducer';
import articleReducer from './article';
import bookmarkReducer from './bookmark';
import passwordReducer from './forgotpassword';
import resetReducer from './resetPassword';
import profileReducer from './profile';


const rootReducer = combineReducers({
  auth: AuthReducer,
  bookmarkReducer,
  article: singleArticleReducer,
  forgotPassword: passwordReducer,
  resetPassword: resetReducer,
  profile: profileReducer,
  articleReducer,
});

export default rootReducer;

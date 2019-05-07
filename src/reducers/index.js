import { combineReducers } from 'redux';
import AuthReducer from './auth';
import bookmarkReducer from './bookmark';

const rootReducer = combineReducers({
  auth: AuthReducer,
  bookmarkReducer
});

export default rootReducer;

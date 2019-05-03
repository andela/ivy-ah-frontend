import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
store.subscribe(() => {console.log(store.getState());});
export default store;

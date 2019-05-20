import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore } from 'redux-persist';
import rootReducer from '../reducers';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export const persistor = persistStore(store);

export default store;

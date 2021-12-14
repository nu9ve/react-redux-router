import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/root';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export type rootStore = ReturnType<typeof rootReducer>;

export default store;
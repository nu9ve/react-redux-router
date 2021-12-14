import { combineReducers } from 'redux';
import userReducer from './users';
import contentReducer from './content';


const rootReducer = combineReducers({
  user: userReducer,
  content: contentReducer,
});

export default rootReducer;

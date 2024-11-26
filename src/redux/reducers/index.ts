// redux/reducers/index.ts

import { combineReducers } from 'redux';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  auth: userReducer, // Update with your actual state name for auth
  // Add other reducers if needed
});

export default rootReducer;

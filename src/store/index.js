import { createStore, combineReducers } from 'redux';
import appReducer from './appReducer';
import projectReducer from './projectReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  app: appReducer,
  project: projectReducer,
  user: userReducer
})

const store = createStore(rootReducer)

export default store;

// ========================> CONCEPTS <===========================
// 1) combining reducers
// ===============================================================
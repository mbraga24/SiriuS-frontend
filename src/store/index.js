import { createStore, combineReducers } from 'redux';
import appReducer from './appReducer';
import projectReducer from './projectReducer';
import completeProject from './completeProjectReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  app: appReducer,
  project: projectReducer,
  user: userReducer,
  completeProject
})

const store = createStore(rootReducer)

export default store;

import { createStore, combineReducers } from 'redux';
import app from './App';
import project from './Project';
import document from './Document';
import completeProject from './CompleteProject';
import user from './User';

const rootReducer = combineReducers({
  app,
  project,
  document,
  user,
  completeProject
})

const store = createStore(rootReducer)

export default store;

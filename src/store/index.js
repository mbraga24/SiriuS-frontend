import { createStore, combineReducers } from 'redux';
import app from './App';
import project from './Project';
import completeProject from './CompleteProject';
import user from './User';

const rootReducer = combineReducers({
  app,
  project,
  user,
  completeProject
})

const store = createStore(rootReducer)

export default store;

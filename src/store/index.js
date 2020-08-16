import { createStore, combineReducers } from 'redux';
import appReducer from './appReducer';
import projectReducer from './projectReducer';
// import adminReducer from './adminReducer';

const rootReducer = combineReducers({
  app: appReducer,
  project: projectReducer
})

const store = createStore(rootReducer)

export default store;

// ========================> CONCEPTS <===========================
// 1) combining reducers
// ===============================================================
import { createStore, combineReducers } from 'redux';
import appReducer from './appReducer'; // => generic name until more state is added
// import adminReducer from './adminReducer';

const rootReducer = combineReducers({
  app: appReducer
})

const store = createStore(rootReducer)

export default store;

// ========================> CONCEPTS <===========================
// 1) combining reducers
// ===============================================================
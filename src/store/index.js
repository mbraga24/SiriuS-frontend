import { createStore, combineReducers } from 'redux';
import app from './App';
import project from './Project';
import activeProject from './ActiveProject';
import document from './Document';
import user from './User';
import invitation from './Invitation';
import archiveProject from './ArchiveProject';
import archDocument from './ArchiveDocuments';
import load from './Load';

const rootReducer = combineReducers({
  app,
  document,
  user,
  project,
  activeProject,
  invitation,
  archiveProject,
  archDocument,
  load
})

const store = createStore(rootReducer)

export default store;

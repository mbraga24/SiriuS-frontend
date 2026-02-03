import { configureStore } from '@reduxjs/toolkit';
import { siriusApi } from './api/siriusApi';
import userSlice from './slices/userSlice';
import projectSlice from './slices/projectSlice';
import documentSlice from './slices/documentSlice';
import invitationSlice from './slices/invitationSlice';
import archiveSlice from './slices/archiveSlice';
import app from './App';
import activeProject from './ActiveProject';
import load from './Load';

const store = configureStore({
  reducer: {
    [siriusApi.reducerPath]: siriusApi.reducer,
    app,
    user: userSlice,
    project: projectSlice,
    document: documentSlice,
    invitation: invitationSlice,
    archive: archiveSlice,
    activeProject,
    load
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(siriusApi.middleware),
})

export default store;

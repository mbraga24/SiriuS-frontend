import { createSlice } from '@reduxjs/toolkit';
import { fetchArchivedProjects, fetchArchivedDocuments } from '../thunks/asyncThunks';

const archiveSlice = createSlice({
  name: 'archive',
  initialState: {
    projects: [],
    documents: [],
    loading: false,
    error: null
  },
  reducers: {
    setArchivedProjects: (state, action) => {
      state.projects = action.payload;
    },
    addToProjectArchive: (state, action) => {
      state.projects.unshift(action.payload);
    },
    removeFromProjectArchive: (state, action) => {
      state.projects = state.projects.filter(project => project.id !== action.payload);
    },
    setArchivedDocuments: (state, action) => {
      state.documents = action.payload;
    },
    addToDocumentArchive: (state, action) => {
      state.documents.unshift(action.payload);
    },
    removeFromDocumentArchive: (state, action) => {
      state.documents = state.documents.filter(doc => doc.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArchivedProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArchivedProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchArchivedProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchArchivedDocuments.fulfilled, (state, action) => {
        state.documents = action.payload;
      });
  }
});

export const { 
  setArchivedProjects, 
  addToProjectArchive, 
  removeFromProjectArchive,
  setArchivedDocuments,
  addToDocumentArchive,
  removeFromDocumentArchive
} = archiveSlice.actions;

export default archiveSlice.reducer;
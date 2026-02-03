import { createSlice } from '@reduxjs/toolkit';
import { fetchDocuments } from '../thunks/asyncThunks';

const documentSlice = createSlice({
  name: 'document',
  initialState: {
    documents: [],
    loading: false,
    error: null
  },
  reducers: {
    setDocuments: (state, action) => {
      state.documents = action.payload;
    },
    addDocument: (state, action) => {
      state.documents.push(action.payload);
    },
    removeDocument: (state, action) => {
      state.documents = state.documents.filter(doc => doc.id !== action.payload.id);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDocuments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.loading = false;
        state.documents = action.payload;
      })
      .addCase(fetchDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setDocuments, addDocument, removeDocument } = documentSlice.actions;
export default documentSlice.reducer;
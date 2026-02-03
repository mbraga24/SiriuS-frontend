import { createSlice } from '@reduxjs/toolkit';
import { fetchInvitations } from '../thunks/asyncThunks';

const invitationSlice = createSlice({
  name: 'invitation',
  initialState: {
    invitations: [],
    loading: false,
    error: null
  },
  reducers: {
    setInvitations: (state, action) => {
      state.invitations = action.payload;
    },
    addInvitation: (state, action) => {
      state.invitations.unshift(action.payload);
    },
    removeInvitation: (state, action) => {
      state.invitations = state.invitations.filter(invite => invite.id !== action.payload.id);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvitations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInvitations.fulfilled, (state, action) => {
        state.loading = false;
        state.invitations = action.payload;
      })
      .addCase(fetchInvitations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setInvitations, addInvitation, removeInvitation } = invitationSlice.actions;
export default invitationSlice.reducer;
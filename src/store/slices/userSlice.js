import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers, createUserAsync, updateUserAsync, deleteUserAsync } from '../thunks/asyncThunks';

const onlyUsers = (payload) => {
  return payload.filter(user => user.id !== 1);
};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    loading: false,
    error: null
  },
  reducers: {
    setUsers: (state, action) => {
      const filteredUsers = onlyUsers(action.payload);
      state.users = filteredUsers;
    },
    addUser: (state, action) => {
      state.users.unshift(action.payload);
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    removeUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload.id);
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        const filteredUsers = onlyUsers(action.payload);
        state.users = filteredUsers;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create user
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.users.unshift(action.payload);
      })
      // Update user
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      // Delete user
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.id !== action.payload.id);
      });
  }
});

export const { setUsers, addUser, updateUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';
import { fetchProjects, createProjectAsync } from '../thunks/asyncThunks';

const projectSlice = createSlice({
  name: 'project',
  initialState: {
    projects: [],
    relaunchTitle: "",
    relaunchDescription: "",
    relaunchDateRange: "",
    relaunchAddUsersId: [],
    loading: false,
    error: null
  },
  reducers: {
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
    addProject: (state, action) => {
      state.projects.push(action.payload);
    },
    updateProject: (state, action) => {
      const index = state.projects.findIndex(project => project.id === action.payload.id);
      if (index !== -1) {
        state.projects[index] = action.payload;
      }
    },
    removeProject: (state, action) => {
      state.projects = state.projects.filter(project => project.id !== action.payload.id);
    },
    setRelaunchTitle: (state, action) => {
      state.relaunchTitle = action.payload;
    },
    setRelaunchDescription: (state, action) => {
      state.relaunchDescription = action.payload;
    },
    setRelaunchDateRange: (state, action) => {
      state.relaunchDateRange = action.payload;
    },
    setRelaunchUsersId: (state, action) => {
      state.relaunchAddUsersId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch projects
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create project
      .addCase(createProjectAsync.fulfilled, (state, action) => {
        state.projects.push(action.payload);
      });
  }
});

export const { 
  setProjects, 
  addProject, 
  updateProject, 
  removeProject,
  setRelaunchTitle,
  setRelaunchDescription,
  setRelaunchDateRange,
  setRelaunchUsersId
} = projectSlice.actions;

export default projectSlice.reducer;
import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api';

// User async thunks
export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getUsers();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.createUser(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async ({ userId, data }, { rejectWithValue }) => {
    try {
      const response = await api.updateAccount(userId, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteUserAsync = createAsyncThunk(
  'user/deleteUser',
  async (userId, { rejectWithValue }) => {
    try {
      await api.deleteUser(userId);
      return { id: userId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Project async thunks
export const fetchProjects = createAsyncThunk(
  'project/fetchProjects',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getProjects();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createProjectAsync = createAsyncThunk(
  'project/createProject',
  async (projectData, { rejectWithValue }) => {
    try {
      const response = await api.createProject(projectData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Document async thunks
export const fetchDocuments = createAsyncThunk(
  'document/fetchDocuments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getDocuments();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Invitation async thunks
export const fetchInvitations = createAsyncThunk(
  'invitation/fetchInvitations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getInvites();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Archive async thunks
export const fetchArchivedProjects = createAsyncThunk(
  'archive/fetchArchivedProjects',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getArchivedProjects();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchArchivedDocuments = createAsyncThunk(
  'archive/fetchArchivedDocuments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getArchiveDocuments();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
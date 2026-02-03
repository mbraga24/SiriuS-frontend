// Backward compatibility layer for existing action types
// This allows existing components to continue using old action types

import { 
  setUsers as setUsersSlice, 
  addUser as addUserSlice, 
  updateUser as updateUserSlice, 
  removeUser as removeUserSlice 
} from './slices/userSlice';

import { 
  setProjects as setProjectsSlice, 
  addProject as addProjectSlice, 
  updateProject as updateProjectSlice, 
  removeProject as removeProjectSlice,
  setRelaunchTitle as setRelaunchTitleSlice,
  setRelaunchDescription as setRelaunchDescriptionSlice,
  setRelaunchDateRange as setRelaunchDateRangeSlice,
  setRelaunchUsersId as setRelaunchUsersIdSlice
} from './slices/projectSlice';

import {
  setDocuments as setDocumentsSlice,
  addDocument as addDocumentSlice,
  removeDocument as removeDocumentSlice
} from './slices/documentSlice';

import {
  setInvitations as setInvitationsSlice,
  addInvitation as addInvitationSlice,
  removeInvitation as removeInvitationSlice
} from './slices/invitationSlice';

import {
  setArchivedProjects as setArchivedProjectsSlice,
  addToProjectArchive as addToProjectArchiveSlice,
  removeFromProjectArchive as removeFromProjectArchiveSlice,
  setArchivedDocuments as setArchivedDocumentsSlice,
  addToDocumentArchive as addToDocumentArchiveSlice
} from './slices/archiveSlice';

// User actions - maintain old action type names
export const SET_USERS = setUsersSlice.type;
export const ADD_USER = addUserSlice.type;
export const UPDATE_USER = updateUserSlice.type;
export const REMOVE_USER = removeUserSlice.type;

// Project actions - maintain old action type names
export const SET_PROJECTS = setProjectsSlice.type;
export const ADD_PROJECT = addProjectSlice.type;
export const UPDATE_PROJECT = updateProjectSlice.type;
export const REMOVE_PROJECT = removeProjectSlice.type;
export const RELAUNCH_TITLE = setRelaunchTitleSlice.type;
export const RELAUNCH_DESCRIPTION = setRelaunchDescriptionSlice.type;
export const RELAUNCH_DATERANGE = setRelaunchDateRangeSlice.type;
export const RELAUNCH_USERS_ID = setRelaunchUsersIdSlice.type;

// Document actions
export const SET_DOCUMENTS = setDocumentsSlice.type;
export const ADD_DOCUMENT = addDocumentSlice.type;
export const REMOVE_DOCUMENT = removeDocumentSlice.type;

// Invitation actions
export const SET_INVITATIONS = setInvitationsSlice.type;
export const ADD_INVITATION = addInvitationSlice.type;
export const REMOVE_INVITATION = removeInvitationSlice.type;

// Archive actions
export const SET_ARCHIVE = setArchivedProjectsSlice.type;
export const ADD_TO_ARCHIVE = addToProjectArchiveSlice.type;
export const REMOVE_FROM_ARCHIVE = removeFromProjectArchiveSlice.type;
export const SET_ARCH_DOCS = setArchivedDocumentsSlice.type;
export const ADD_ARCH_DOC = addToDocumentArchiveSlice.type;

// Export action creators with old names for compatibility
export const setUsers = setUsersSlice;
export const addUser = addUserSlice;
export const updateUser = updateUserSlice;
export const removeUser = removeUserSlice;

export const setProjects = setProjectsSlice;
export const addProject = addProjectSlice;
export const updateProject = updateProjectSlice;
export const removeProject = removeProjectSlice;
export const setRelaunchTitle = setRelaunchTitleSlice;
export const setRelaunchDescription = setRelaunchDescriptionSlice;
export const setRelaunchDateRange = setRelaunchDateRangeSlice;
export const setRelaunchUsersId = setRelaunchUsersIdSlice;

export const setDocuments = setDocumentsSlice;
export const addDocument = addDocumentSlice;
export const removeDocument = removeDocumentSlice;

export const setInvitations = setInvitationsSlice;
export const addInvitation = addInvitationSlice;
export const removeInvitation = removeInvitationSlice;

export const setArchivedProjects = setArchivedProjectsSlice;
export const addToProjectArchive = addToProjectArchiveSlice;
export const removeFromProjectArchive = removeFromProjectArchiveSlice;
export const setArchivedDocuments = setArchivedDocumentsSlice;
export const addToDocumentArchive = addToDocumentArchiveSlice;
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api/v1',
  prepareHeaders: (headers) => {
    if (localStorage.token) {
      headers.set('authorization', `Bearer ${localStorage.token}`);
    }
    headers.set('content-type', 'application/json');
    return headers;
  },
});

export const siriusApi = createApi({
  reducerPath: 'siriusApi',
  baseQuery,
  tagTypes: ['User', 'Project', 'Document', 'Invitation', 'Archive'],
  endpoints: (builder) => ({
    // Users
    getUsers: builder.query({
      query: () => '/users',
      providesTags: ['User'],
    }),
    createUser: builder.mutation({
      query: (data) => ({
        url: '/signup',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    updateUser: builder.mutation({
      query: ({ userId, data }) => ({
        url: `/users/${userId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
    // Projects
    getProjects: builder.query({
      query: () => '/projects',
      providesTags: ['Project'],
    }),
    createProject: builder.mutation({
      query: (data) => ({
        url: '/projects',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Project'],
    }),
    updateProject: builder.mutation({
      query: ({ projectId, data }) => ({
        url: `/projects/${projectId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Project'],
    }),
    deleteProject: builder.mutation({
      query: (projectId) => ({
        url: `/projects/${projectId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Project'],
    }),
    // Documents
    getDocuments: builder.query({
      query: () => '/documents',
      providesTags: ['Document'],
    }),
    createDocument: builder.mutation({
      query: (formData) => ({
        url: '/documents',
        method: 'POST',
        body: formData,
        formData: true,
      }),
      invalidatesTags: ['Document'],
    }),
    // Invitations
    getInvitations: builder.query({
      query: () => '/invites',
      providesTags: ['Invitation'],
    }),
    createInvitation: builder.mutation({
      query: (data) => ({
        url: '/invites',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Invitation'],
    }),
    deleteInvitation: builder.mutation({
      query: (inviteId) => ({
        url: `/invites/${inviteId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Invitation'],
    }),
    // Archives
    getArchivedProjects: builder.query({
      query: () => '/archive_projects',
      providesTags: ['Archive'],
    }),
    getArchiveDocuments: builder.query({
      query: () => '/archive_documents',
      providesTags: ['Archive'],
    }),
    // Auth
    autoLogin: builder.query({
      query: () => '/autologin',
    }),
    login: builder.mutation({
      query: (data) => ({
        url: '/login',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useGetDocumentsQuery,
  useCreateDocumentMutation,
  useGetInvitationsQuery,
  useCreateInvitationMutation,
  useDeleteInvitationMutation,
  useGetArchivedProjectsQuery,
  useGetArchiveDocumentsQuery,
  useAutoLoginQuery,
  useLoginMutation,
} = siriusApi;
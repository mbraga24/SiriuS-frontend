// API Configuration
const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api/v1';

// Environment helpers
export const isProduction = process.env.REACT_APP_ENVIRONMENT === 'production';
export const isDevelopment = process.env.REACT_APP_ENVIRONMENT === 'development';
export const isDebugEnabled = process.env.REACT_APP_DEBUG === 'true';

// Request interceptor
const apiRequest = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  
  // Don't set Content-Type for FormData (let browser set it with boundary)
  const isFormData = options.body instanceof FormData;
  
  const config = {
    headers: isFormData ? {} : {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  };

  // Add auth token if available
  if (localStorage.token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${localStorage.token}`;
  }

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return config.skipJson ? response : await response.json();
  } catch (error) {
    if (isDebugEnabled) {
      console.error('API Request failed:', error);
    }
    throw error;
  }
};

// ==============================================================================
//                                    USER
// ==============================================================================

// create new user
export const createUser = data => {
  return apiRequest('/signup', {
    method: 'POST',
    body: JSON.stringify(data)
  });
};

// update user
export const updateAccount = (userId, data) => {
  return apiRequest(`/users/${userId}`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  });
};

// login user
export const loginUser = data => {
  return apiRequest('/login', {
    method: 'POST',
    body: JSON.stringify(data)
  });
};

// user autologin 
export const autoLogin = () => {
  return apiRequest('/autologin');
};

// get all users
export const getUsers = () => {
  return apiRequest('/users');
};

// delete user
export const deleteUser = userId => {
  return apiRequest(`/users/${userId}`, {
    method: 'DELETE'
  });
};

// ==============================================================================
//                                    PROJECTS
// ==============================================================================

// remove project from user
export const removeProjectFromUser = (userId, projectId) => {
  return apiRequest(`/users/${userId}/remove-project/${projectId}`, {
    method: 'DELETE'
  });
};

// get all projects
export const getProjects = () => {
  return apiRequest('/projects');
};

// add user to project
export const addUserProject = updateProject => {
  return apiRequest('/add_user/project/', {
    method: 'PATCH',
    body: JSON.stringify(updateProject)
  });
};

// create new project
export const createProject = data => {
  return apiRequest('/projects', {
    method: 'POST',
    body: JSON.stringify(data)
  });
};

// edit project
export const editProject = (projectId, data) => {
  return apiRequest(`/projects/${projectId}`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  });
};

// destroy - complete project
export const completeProject = projectId => {
  return apiRequest(`/projects/${projectId}`, {
    method: 'DELETE'
  });
};

// ==============================================================================
//                               ARCHIVE PROJECTS
// ==============================================================================

// get archived projects
export const getArchivedProjects = () => {
  return apiRequest('/archive_projects');
};

// create - arquive project
export const archiveProject = arqProject => {
  return apiRequest('/archive_projects', {
    method: 'POST',
    body: JSON.stringify(arqProject)
  });
};

// delete from arquive
export const deleteFromArchive = projectId => {
  return apiRequest(`/archive_projects/${projectId}`, {
    method: 'DELETE'
  });
};

// ==============================================================================
//                               ARCHIVE DOCUMENTS
// ==============================================================================

// get archived documents
export const getArchiveDocuments = () => {
  return apiRequest('/archive_documents');
};

// create - arquive document
export const archiveDocuments = arqDocs => {
  return apiRequest('/archive_documents', {
    method: 'POST',
    body: JSON.stringify({ ...arqDocs })
  });
};

// ==============================================================================
//                                  DOCUMENTS
// ==============================================================================

// set documents
export const getDocuments = () => {
  return apiRequest('/documents');
};

// create documents
export const newDocument = formData => {
  return apiRequest('/documents', {
    method: 'POST',
    body: formData
  });
};

// ==============================================================================
//                                    INVITES
// ==============================================================================

export const inviteUser = data => {
  return apiRequest('/invites', {
    method: 'POST',
    body: JSON.stringify(data)
  });
};

// set invitations
export const getInvites = () => {
  return apiRequest('/invites');
};

// detele invitations
export const deleteInvites = inviteId => {
  return apiRequest(`/invites/${inviteId}`, {
    method: 'DELETE'
  });
};

// download archived project zip file
export const downloadZip = projectId => {
  return apiRequest(`/download/${projectId}`, {
    skipJson: true
  });
};
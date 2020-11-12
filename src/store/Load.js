import { LOAD_DOCUMENTS, LOAD_KEYHOLDER, LOAD_PROJECTS, LOAD_USERS, LOAD_INVITATIONS } from './type';

const defaultState = {
  loadKeyholder: true,
  loadProjects: true,
  loadUsers: true,
  loadDocuments: true,
  loadInvites: true
}

const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case LOAD_KEYHOLDER:
      return {
        ...state,
        loadKeyholder: action.payload
      }
    case LOAD_PROJECTS:
      return {
        ...state,
        loadProjects: action.payload
      }
    case LOAD_USERS:
      return {
        ...state,
        loadUsers: action.payload
      }
    case LOAD_DOCUMENTS:
      return {
        ...state,
        loadDocuments: action.payload
      }
    case LOAD_INVITATIONS:
      return {
        ...state,
        loadInvites: action.payload
      }
    default:
      return state
  }
}

export default reducer;
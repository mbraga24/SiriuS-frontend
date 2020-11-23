import { LOAD_DOCUMENTS, LOAD_KEYHOLDER, LOAD_PROJECTS, LOAD_USERS, LOAD_INVITATIONS, LOAD_ARCHIVES, API_SUCCESS, API_REQUEST } from './type';

const defaultState = {
  isLoadingRequestIds: [],
  loadKeyholder: true,
  loadProjects: true,
  loadUsers: true,
  loadDocuments: true,
  loadInvites: true,
  loadArchive: true
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
    case LOAD_ARCHIVES:
      return {
        ...state,
        loadArchive: action.payload
      }
    case API_REQUEST:
      console.log("API_REQUEST --->", action.type)
      return {
        ...state,
        isLoadingRequestIds: [...state.isLoadingRequestIds, action.requestId]
      }
    case API_SUCCESS:
      console.log("API SUCCESS -->", action.type)
      // const filterdIds = state.isLoadingRequestIds.filter(requestId => requestId !== action.requestId)
      return {
        ...state,
        // isLoadingRequestIds: state.isLoadingRequestIds.splice(state.isLoadingRequestIds.indexOf(action.requestId)).slice()
        // isLoadingRequestIds: [...filterdIds]
    }
    default:
      return state
  }
}

console.log("API OUTSIDE REDUCER SUCCESS -->", defaultState.isLoadingRequestIds)

export default reducer;
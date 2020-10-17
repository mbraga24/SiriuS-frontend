import { SET_DOCUMENTS, ADD_DOCUMENT, REMOVE_DOCUMENT } from '../store/type';

const defaultState = {
  documents: []
}

const store = (state = defaultState, action) => {
  switch(action.type) {
    case SET_DOCUMENTS:
      return {
        ...state,
        documents: action.payload
      }
    case ADD_DOCUMENT:
      return {
        ...state,
        documents: [...state.documents, action.payload]
      }
    case REMOVE_DOCUMENT:
      const filteredDocuments = state.documents.filter(doc => doc.id !== action.payload.id)
      return {
        ...state,
        documents: [...filteredDocuments]
      }
    default:
      return state
  }
}

export default store;
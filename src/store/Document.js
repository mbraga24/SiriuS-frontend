import { SET_DOCUMENTS, ADD_DOCUMENT } from '../store/type';

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
    default:
      return state
  }
}

export default store;
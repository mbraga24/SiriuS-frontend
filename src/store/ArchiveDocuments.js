import { SET_ARCH_DOCS, REMOVE_ARCH_DOC, ADD_ARCH_DOC } from './type';

const defaultState = {
  archDocuments: []
}

const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case SET_ARCH_DOCS:
      return {
        ...state,
        archDocuments: [...action.payload]
      }
    case ADD_ARCH_DOC:
      return {
        ...state,
        archDocuments: [action.payload, ...state.archDocuments]
      }
    case REMOVE_ARCH_DOC:
      const updatedDocList = state.archDocuments.filter(doc => doc.id !== action.payload)
      return {
        ...state,
        archDocuments: [...updatedDocList]
      }
    default:
      return state
  }
}

export default reducer;
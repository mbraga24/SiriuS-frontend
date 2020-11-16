import { SET_ARCH_DOCS, REMOVE_ARCH_DOC, ADD_ARCH_DOC } from './type';

const defaultState = {
  archDocuments: []
}

const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case SET_ARCH_DOCS:
      // all true value
      console.log("SET_ARCH_DOCS:", action.payload)
      return {
        ...state,
        archDocuments: [...action.payload]
      }
    case ADD_ARCH_DOC:
      console.log("ADD_ARCH_DOC -->", action.payload)
      return {
        ...state,
        archDocuments: [action.payload, ...state.archDocuments]
      }
    case REMOVE_ARCH_DOC:
      const updatedDocList = state.archDocuments.filter(doc => doc.id !== action.payload)
      console.log("REMOVE_ARCH_DOC -->", updatedDocList)
      return {
        ...state,
        archDocuments: [...updatedDocList]
      }
    default:
      return state
  }
}

export default reducer;
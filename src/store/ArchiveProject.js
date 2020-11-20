import { SET_ARCHIVE, ADD_TO_ARCHIVE, REMOVE_FROM_ARCHIVE } from './type'

const defaultState = {
  archive: []
}

const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case SET_ARCHIVE:
      return {
        ...state,
        archive: [...action.payload]
      }
    case ADD_TO_ARCHIVE:
      return {
        ...state,
        archive: [action.payload, ...state.archive]
      }
    case REMOVE_FROM_ARCHIVE:
      const updatedArchive = state.archive.filter(project => project.id !== action.payload)
      return {
        ...state,
        archive: [...updatedArchive]
      }
    default:
      return state
  }
}

export default reducer;
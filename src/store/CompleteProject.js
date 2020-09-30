import { SET_COMPLETE_PROJECTS, UPDATE_COMPLETE_LIST, ADD_COMPLETE_PROJECT } from './type';

const defaultState = {
  complete: []
}

const store = (state = defaultState, action) => {
  switch(action.type) {
    case SET_COMPLETE_PROJECTS:
      // all true values
      const filteredList =  action.payload.filter(project => project.done) 
      return {
        ...state,
        complete: [...filteredList]
      }
    case UPDATE_COMPLETE_LIST:
      const updatedList = state.complete.filter(project => project.id !== action.payload.id)
      return {
        ...state,
        complete: [...updatedList]
      }
    case ADD_COMPLETE_PROJECT:
      return {
        ...state,
        complete: [...state.complete, action.payload]
      }
    default:
      return state
  }
}

export default store;
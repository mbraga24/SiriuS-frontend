import { SET_COMPLETE_PROJECTS, ADD_COMPLETE_PROJECT } from './type';

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
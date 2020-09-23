import { SET_PROJECTS, ADD_NEW_PROJECT, ADD_USER_PROJECT, REMOVE_USER_PROJECT, REMOVE_PROJECT } from './type';

const defaultState = {
  projects: [],
  addUsersId: []
}

const reducer = (state = defaultState, action) => {
  // console.log("INSIDE PROJECT REDUCER:", action.payload)
  switch(action.type) {
    case SET_PROJECTS:
      const projectList = action.payload.filter(project => !project.done)
      return {
        ...state,
        projects: [...projectList]
      }
    case ADD_NEW_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload]
      }
    case ADD_USER_PROJECT:
    return {
      ...state,
      addUsersId: [...state.addUsersId, action.payload]
    }
    case REMOVE_USER_PROJECT:
    return {
      ...state,
      addUsersId: [...action.payload]
    }
    case REMOVE_PROJECT:
      const filteredList = state.projects.filter(project => project.id !== action.payload.id )
      return {
        ...state,
        projects: [...filteredList]
      }
    default:
      return state
  }
}

export default reducer;
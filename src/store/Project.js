import { SET_PROJECTS, ADD_NEW_PROJECT, REMOVE_PROJECT, UPDATE_PROJECT } from './type';

const defaultState = {
  projects: []
}

const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case SET_PROJECTS:
      // console.log("SET PROJECTS:", action.payload)
      return {
        ...state,
        projects: [...action.payload]
      }
    case ADD_NEW_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload]
      }
    case UPDATE_PROJECT:
      console.log("UPDATE PROJECT", action.payload)
      const updatedProject = state.projects.map(project => {
        if (project.id === action.payload.id) {
          return action.payload
        } else {
          return project
        }
      })
      return {
        ...state,
        projects: [...updatedProject]
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
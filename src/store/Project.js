import { SET_PROJECTS, ADD_PROJECT, REMOVE_PROJECT, UPDATE_PROJECT, RELAUNCH_USERS_ID, RELAUNCH_DATERANGE, RELAUNCH_TITLE, RELAUNCH_DESCRIPTION } from './type';

const defaultState = {
  projects: [],
  relaunchTitle: "",
  relaunchDescription: "",
  relaunchDateRange: "",
  relaunchAddUsersId: []
}

const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case SET_PROJECTS:
      return {
        ...state,
        projects: [...action.payload]
      }
    case ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload]
      }
    case UPDATE_PROJECT:
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
    case RELAUNCH_TITLE:
      return {
        ...state,
        relaunchTitle: action.payload
      }
    case RELAUNCH_DESCRIPTION:
      return {
        ...state,
        relaunchDescription: action.payload
      }
    case RELAUNCH_DATERANGE:
      return {
        ...state,
        relaunchDateRange: action.payload
      }
    case RELAUNCH_USERS_ID:
      return {
        ...state,
        relaunchAddUsersId: [...action.payload]
      }
    default:
      return state
  }
}

export default reducer;
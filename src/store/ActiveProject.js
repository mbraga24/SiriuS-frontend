import { SET_ACTIVE_PROJECTS, ADD_ACTIVE_PROJECT, UPDATE_ACTIVE_PROJECT, REMOVE_ACTIVE_PROJECT, REMOVE_USER_FROM_TEMP_PROJECT, ADD_USER_TO_TEMP_PROJECT } from './type';

const defaultState = {
  active: [],
  addUsersId: []
}

const reducer = (state = defaultState, action) => {
  // console.log("INSIDE ACTIVE PROJECT REDUCER:", activeProjectList)
  switch(action.type) {
    case SET_ACTIVE_PROJECTS:
      const activeProjectList = action.payload.filter(project => !project.done)
      // console.log("SET ACTIVE PROJECTS:", activeProjectList)
      return {
        ...state,
        active: [...activeProjectList]
      }
    case ADD_ACTIVE_PROJECT:
      return {
        ...state,
        active: [...state.active, action.payload]
      }
    case UPDATE_ACTIVE_PROJECT:
      console.log("UPDATE PROJECT", action.payload)
      const updatedProject = state.active.map(project => {
        if (project.id === action.payload.id) {
          return action.payload
        } else {
          return project
        }
      })
      return {
        ...state,
        active: [...updatedProject]
      }
    case REMOVE_ACTIVE_PROJECT:
      const filteredList = state.active.filter(project => project.id !== action.payload.id )
      return {
        ...state,
        active: [...filteredList]
      }
    case ADD_USER_TO_TEMP_PROJECT:
    return {
      ...state,
      addUsersId: [...state.addUsersId, action.payload]
    }
    case REMOVE_USER_FROM_TEMP_PROJECT:
    return {
      ...state,
      addUsersId: [...action.payload]
    }
    default:
      return state
  }
}

export default reducer;
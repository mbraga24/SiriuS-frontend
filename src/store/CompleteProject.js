import { SET_COMPLETE_PROJECTS, REMOVE_COMPLETE_PROJECT, ADD_COMPLETE_PROJECT } from './type';

const defaultState = {
  complete: []
}

const crescOrder = (projects) => {
  return projects.sort((a, b) => b - a)
}

const store = (state = defaultState, action) => {
  switch(action.type) {
    case SET_COMPLETE_PROJECTS:
      // all true values
      const projectDone =  action.payload.filter(project => project.done) 
      // console.log("SET COMPLETE PROJECTS:", projectDone)
      return {
        ...state,
        complete: [...crescOrder(projectDone)]
      }
    case ADD_COMPLETE_PROJECT:
      console.log("ADD COMPLETE PROJECT -->", action.payload)
      return {
        ...state,
        complete: [action.payload, ...state.complete]
      }
    case REMOVE_COMPLETE_PROJECT:
      const updatedList = state.complete.filter(project => project.id !== action.payload)
      return {
        ...state,
        complete: [...updatedList]
      }
    default:
      return state
  }
}

export default store;
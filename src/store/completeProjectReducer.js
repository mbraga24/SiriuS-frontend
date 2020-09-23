import { SET_COMPLETE_PROJECTS, ADD_COMPLETE_PROJECT } from './type';

const defaultState = {
  complete: []
}

const store = (state = defaultState, action) => {
  console.log("COMPLETE PROJECT STORE: (ACTION PAYLOAD)", action.payload)
  console.log("COMPLETE PROJECT STORE: (ACTION TYPE)", action.type)

  switch(action.type) {
    // =======================================================
    // NEW BUG -----
    // =======================================================
    case SET_COMPLETE_PROJECTS:
      console.log("SET_COMPLETE_PROJECTS (ACTION PAYLOAD):", action.payload)
      // all true values
      const filteredList =  action.payload.filter(project => project.done) 
      console.log("SET_COMPLETE_PROJECTS:", filteredList)
      return {
        ...state,
        complete: [...filteredList]
      }
    case ADD_COMPLETE_PROJECT:
      console.log("ADD_COMPLETE_PROJECT:", action.payload)
      return {
        ...state,
        complete: [...state.complete, action.payload]
      }
    default:
      return state
  }
}

export default store;
import { SET_PROJECTS, ADD_PROJECT, REMOVE_PROJECT, UPDATE_PROJECT, FILL_NEW_PROJECT_CONTENT } from './type';

const defaultState = {
  projects: [],
  projectContent: null
  // projectContent: {
  //   name: "",
  //   description: "",
  //   startDate: "",
  //   dueDate: "",
  //   assigned: []
  // }

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
    case FILL_NEW_PROJECT_CONTENT:
      return {
        ...state,
        projectContent: {
          name: action.payload.name,
          description: action.payload.description,
          startDate: action.payload.startDate,
          dueDate: action.payload.dueDate,
          assigned: [...action.payload.assigned]
        }
      }
    default:
      return state
  }
}

export default reducer;
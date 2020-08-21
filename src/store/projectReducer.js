const defaultState = {
  projects: [],
  addUsersId: []
}

const reducer = (state = defaultState, action) => {
  // console.log("INSIDE PROJECT REDUCER:", action.payload)
  switch(action.type) {
    case "SET PROJECTS":
      return {
        ...state,
        projects: [...action.payload]
      }
    case "ADD NEW PROJECT":
      return {
        ...state,
        projects: [...state.projects, action.payload]
      }
    case "ADD USER TO PROJECT":
    return {
      ...state,
      addUsersId: [...state.addUsersId, action.payload]
    }
    case "REMOVE USER FROM PROJECT":
    return {
      ...state,
      addUsersId: [...action.payload]
    }
    default:
      return state
  }
}

export default reducer;
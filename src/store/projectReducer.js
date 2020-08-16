const defaultState = {
  projects: []
}

const reducer = (state = defaultState, action) => {
  console.log("INSIDE PROJECT REDUCER:", action.payload)
  switch(action.type) {
    case "SET PROJECTS":
      return {
        projects: [...action.payload]
      }
    default:
      return state
  }
}

export default reducer;
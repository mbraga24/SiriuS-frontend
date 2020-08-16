const defaultState = {
  keyHolder: null,
  isLoading: false
}

const reducer = (state = defaultState, action) => {
  // console.log("APP REDUCER: ", state.isLoading)
  switch(action.type) {
    case "SET KEY HOLDER":
      return {
        ...state,
        keyHolder: action.payload
      }
    case "SET LOAD":
      return {
        ...state,
        isLoading: !state.isLoading
      }
    default:
      return state
  }
}

export default reducer;
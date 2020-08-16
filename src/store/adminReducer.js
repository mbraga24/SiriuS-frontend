const defaultState = {
  currentAdmin: null,
  isAdimLoggedIn: false
}

const reducer = (state = defaultState, action) => {
  // console.log("ADMIN REDUCER ACTION TYPE:", action)
  console.log("ADMIN REDUCER PAYLOAD:", action.payload)
  switch(action.type) {
    case "SET ADMIN":
      return {
        currentAdmin: action.payload
      }
    default:
      return state
  }
}

export default reducer;
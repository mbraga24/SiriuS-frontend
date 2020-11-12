import { SET_KEY_HOLDER } from './type';

const defaultState = {
  keyHolder: localStorage.token ? localStorage.token : null
}

const reducer = (state = defaultState, action) => {
  // console.log("APP REDUCER: ", state.keyholder)
  switch(action.type) {
    case SET_KEY_HOLDER:
      return {
        ...state,
        keyHolder: action.payload
      }
    default:
      return state
  }
}

export default reducer;
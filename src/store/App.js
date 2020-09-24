import { SET_KEY_HOLDER, SET_LOAD } from './type';

const defaultState = {
  keyHolder: localStorage.token ? localStorage.token : null,
  isLoading: false
}

const reducer = (state = defaultState, action) => {
  // console.log("APP REDUCER: ", state.keyholder)
  switch(action.type) {
    case SET_KEY_HOLDER:
      return {
        ...state,
        keyHolder: action.payload
      }
    case SET_LOAD:
      return {
        ...state,
        isLoading: !state.isLoading
      }
    default:
      return state
  }
}

export default reducer;
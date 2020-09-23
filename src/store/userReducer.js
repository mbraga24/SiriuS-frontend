import { SET_USERS } from './type';

const defaultState = {
  users: []
}

const reducer = (state = defaultState, action) => {
  // console.log("INSIDE USER REDUCER:", action.payload)
  switch(action.type) {
    case SET_USERS:
      return {
        ...state,
        users: [...action.payload]
      }
    default: 
      return state
  }
}

export default reducer;
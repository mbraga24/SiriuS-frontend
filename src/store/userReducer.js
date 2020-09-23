import { SET_USERS } from './type';

const defaultState = {
  users: []
}

const reducer = (state = defaultState, action) => {
  // console.log("INSIDE USER REDUCER:", action.payload)
  switch(action.type) {
    case SET_USERS:
      // filter out the first user (admin)
      const filteredUsers = action.payload.filter(user => user.id !== 1)
      return {  
        ...state,
        users: [...filteredUsers]
      }
    default: 
      return state
  }
}

export default reducer;